from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
# from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from django.db.models import Q
from typing import List, Dict
# from django.contrib.auth.models import User
from .models import CrewMember, HealthMetrics, HealthProblem, IndividualHealthReport
from django.db.models import Prefetch
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()
# Create your views here.


@api_view(['GET'])
def get_crew_members_data(request):
    # Using a default user (O'Neil) instead of authentication
    default_user = User.objects.get(username='Oneil')
    
    crew_members = CrewMember.objects.filter(
        user=default_user
    ).prefetch_related(
        'fleet__user',  # Add this to prefetch fleet's user (captain) data
        Prefetch('health_metrics', queryset=HealthMetrics.objects.order_by('-date')),
        Prefetch('health_problems', queryset=HealthProblem.objects.order_by('-date')),
        Prefetch('health_reports', queryset=IndividualHealthReport.objects.order_by('-date'))
    )

    response_data = []
    
    for crew_member in crew_members:
        # Get the latest health metrics
        latest_metrics = crew_member.health_metrics.first()
        metrics_data = None
        if latest_metrics:
            metrics_data = {
                'date': latest_metrics.date.isoformat(),
                'heartRate': latest_metrics.heart_rate,
                'sleepDuration': latest_metrics.sleep_duration,
                'respirationRate': latest_metrics.respiration_rate,
                'bloodOxygen': latest_metrics.blood_oxygen,
                'boneDensity': latest_metrics.bone_density,
                'radiation': latest_metrics.radiation,
                'exerciseLevel': latest_metrics.exercise_level,
                'outsideTime': latest_metrics.outside_time,
                'weight': latest_metrics.weight,
                'height': latest_metrics.height
            }

        # Get health problems
        problems = [{
            'id': f'P{problem.id:03d}',
            'date': problem.date.isoformat(),
            'description': problem.description,
            'severity': problem.severity,
            'status': problem.status
        } for problem in crew_member.health_problems.all()]

        # Get health reports
        reports = [{
            'id': f'R{report.id:03d}',
            'date': report.date.isoformat(),
            'title': report.title,
            'subtitle': report.subtitle,
            'content': report.content,
            'riskLevel': report.risk_level
        } for report in crew_member.health_reports.all()]

        # Add fleet and captain information
        fleet_data = {
            'id': f'F{crew_member.fleet.id:03d}',
            'name': crew_member.fleet.name,
            'companyName': crew_member.fleet.company_name,
            'captain': {
                'id': f'U{crew_member.fleet.user.id:03d}',
                'name': crew_member.fleet.user.username,
            }
        }

        # Construct crew member data
        crew_member_data = {
            'id': f'CM{crew_member.id:03d}',
            'firstName': crew_member.first_name,
            'lastName': crew_member.last_name,
            'role': crew_member.role,
            'status': crew_member.status,
            'sex': crew_member.sex,
            'dateOfBirth': crew_member.date_of_birth.isoformat(),
            'avatar': None,
            'fleet': fleet_data,  # Changed from just fleetId to full fleet object
            'userId': f'U{crew_member.user.id:03d}',
            'healthMetrics': metrics_data,
            'problems': problems,
            'reports': reports
        }
        
        response_data.append(crew_member_data)

    return Response(response_data)

@api_view(['POST'])
def create_crew_member(request):
    try:
        # Using default user (O'Neil) as specified
        default_user = User.objects.get(username='Oneil')
        
        # Extract fleet ID from the format 'F001' to just '1'
        fleet_id = request.data.get('fleet', 'F001')
        if fleet_id.startswith('F'):
            fleet_id = int(fleet_id[1:])  # Remove 'F' and convert to integer
        
        # Parse the date string to a proper date object
        date_of_birth = timezone.datetime.strptime(
            request.data['dateOfBirth'], 
            '%Y-%m-%d'
        ).date()
        
        # Create crew member with request data
        crew_member = CrewMember.objects.create(
            user=default_user,
            first_name=request.data['firstName'],
            last_name=request.data['lastName'],
            sex=request.data['sex'],
            date_of_birth=date_of_birth,  # Use the parsed date
            role=request.data['role'],
            status=request.data['status'],
            fleet_id=fleet_id
        )

        # Create default health metrics with proper JSON structure
        default_metrics = HealthMetrics.objects.create(
            crew_member=crew_member,
            date=timezone.now(),
            heart_rate={'value': 72, 'unit': 'bpm', 'status': 'normal'},
            sleep_duration={'value': 7.5, 'unit': 'hours', 'status': 'normal'},
            respiration_rate={'value': 16, 'unit': 'rpm', 'status': 'normal'},
            blood_oxygen={'value': 98, 'unit': '%', 'status': 'normal'},
            bone_density={'value': 95, 'unit': '%', 'status': 'normal'},
            radiation={'value': 0.12, 'unit': 'mSv', 'status': 'normal'},
            exercise_level={'value': 85, 'unit': '%', 'status': 'normal'},
            outside_time={'value': 2.5, 'unit': 'hrs', 'status': 'normal'},
            weight={'value': 68, 'unit': 'kg', 'status': 'normal'},
            height={'value': 170, 'unit': 'cm', 'status': 'normal'}
        )

        # Format response following the same structure as get_crew_members_data
        response_data = {
            'id': f'CM{crew_member.id:03d}',
            'firstName': crew_member.first_name,
            'lastName': crew_member.last_name,
            'role': crew_member.role,
            'status': crew_member.status,
            'sex': crew_member.sex,
            'dateOfBirth': crew_member.date_of_birth.isoformat(),
            'avatar': None,
            'fleet': {
                'id': f'F{crew_member.fleet.id:03d}',
                'name': crew_member.fleet.name,
                'companyName': crew_member.fleet.company_name,
                'captain': {
                    'id': f'U{crew_member.fleet.user.id:03d}',
                    'name': crew_member.fleet.user.username,
                }
            },
            'userId': f'U{crew_member.user.id:03d}',
            'healthMetrics': {
                'date': default_metrics.date.isoformat(),
                'heartRate': default_metrics.heart_rate,
                'sleepDuration': default_metrics.sleep_duration,
                'respirationRate': default_metrics.respiration_rate,
                'bloodOxygen': default_metrics.blood_oxygen,
                'boneDensity': default_metrics.bone_density,
                'radiation': default_metrics.radiation,
                'exerciseLevel': default_metrics.exercise_level,
                'outsideTime': default_metrics.outside_time,
                'weight': default_metrics.weight,
                'height': default_metrics.height
            },
            'problems': [],
            'reports': []
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

    except KeyError as e:
        return Response(
            {'error': f'Missing required field: {str(e)}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def create_health_problem(request):
    try:
        # Extract crew member ID from the format 'CM001' to just '1'
        crew_member_id = request.data.get('crew_member')
        if crew_member_id.startswith('CM'):
            crew_member_id = int(crew_member_id[1:])

        # Parse the date string to a datetime object
        date = timezone.datetime.strptime(
            request.data.get('date'),
            '%Y-%m-%d'
        )

        # Create health problem
        health_problem = HealthProblem.objects.create(
            crew_member_id=crew_member_id,
            date=date,
            description=request.data.get('description'),
            severity=request.data.get('severity'),
            status=request.data.get('status')
        )

        # Format response data
        response_data = {
            'id': f'P{health_problem.id:03d}',
            'date': health_problem.date.isoformat(),
            'description': health_problem.description,
            'severity': health_problem.severity,
            'status': health_problem.status
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

    except KeyError as e:
        return Response(
            {'error': f'Missing required field: {str(e)}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def create_health_report(request):
    try:
        # Extract crew member ID from the format 'CM001' to just '1'
        crew_member_id = request.data.get('crew_member')
        if crew_member_id.startswith('CM'):
            crew_member_id = int(crew_member_id[2:])

        # Parse the date string to a datetime object
        date = timezone.datetime.strptime(
            request.data.get('date'),
            '%Y-%m-%d'
        )

        # Get risk_level from request data, using the correct field name
        risk_level = request.data.get('risk_level')  # Changed from riskLevel
        
        if not risk_level:
            return Response(
                {'error': 'risk_level is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create health report
        health_report = IndividualHealthReport.objects.create(
            crew_member_id=crew_member_id,
            date=date,
            title=request.data.get('title'),
            subtitle=request.data.get('subtitle'),
            content=request.data.get('content'),
            risk_level=risk_level  # Changed from riskLevel
        )

        # Format response data
        response_data = {
            'id': f'R{health_report.id:03d}',
            'date': health_report.date.isoformat(),
            'title': health_report.title,
            'subtitle': health_report.subtitle,
            'content': health_report.content,
            'riskLevel': health_report.risk_level  # Keep as riskLevel in response for frontend
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

    except KeyError as e:
        return Response(
            {'error': f'Missing required field: {str(e)}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
