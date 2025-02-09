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
