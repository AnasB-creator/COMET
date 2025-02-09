from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Fleet(models.Model):
    name = models.TextField()
    company_name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fleets')

    def __str__(self):
        return f"{self.name} - {self.company_name}"

class IndividualHealthReport(models.Model):
    crew_member = models.ForeignKey('CrewMember', on_delete=models.CASCADE, related_name='health_reports')
    date = models.DateTimeField()
    title = models.TextField()
    subtitle = models.TextField()
    content = models.JSONField()
    risk_level = models.TextField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} - {self.crew_member}"

class CrewMember(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    sex = models.TextField()
    date_of_birth = models.DateField()
    role = models.TextField()
    status = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='crew_members')
    fleet = models.ForeignKey(Fleet, on_delete=models.CASCADE, related_name='crew_members')

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.role}"

    def generate_ai_health_report(self) -> 'IndividualHealthReport':
        """Generates an AI health report based on crew member's latest health data."""
        # Get latest health metrics
        latest_metrics = self.health_metrics.first()
        recent_problems = self.health_problems.filter(status='active')
        
        # Initialize report components
        risk_factors = []
        recommendations = []
        overall_risk = "low"
        
        if latest_metrics:
            # Check vital signs
            metrics_checks = {
                'Heart Rate': latest_metrics.heart_rate.get('status'),
                'Blood Oxygen': latest_metrics.blood_oxygen.get('status'),
                'Sleep Duration': latest_metrics.sleep_duration.get('status'),
                'Exercise Level': latest_metrics.exercise_level.get('status'),
                'Radiation': latest_metrics.radiation.get('status'),
            }
            
            # Analyze metrics
            for metric, status in metrics_checks.items():
                if status != 'normal':
                    risk_factors.append(f"Abnormal {metric}")
                    recommendations.append(f"Monitor {metric} closely")
        
        # Factor in active health problems
        if recent_problems.exists():
            for problem in recent_problems:
                risk_factors.append(f"Active {problem.severity} condition: {problem.description}")
                if problem.severity in ['high', 'critical']:
                    overall_risk = "high"
                elif problem.severity == 'medium' and overall_risk != "high":
                    overall_risk = "medium"
        
        # Generate report content
        content = {
            "summary": f"Health assessment for {self.first_name} {self.last_name}",
            "riskFactors": risk_factors,
            "recommendations": recommendations,
            "metrics": latest_metrics.id if latest_metrics else None,
            "activeProblems": [p.id for p in recent_problems]
        }
        
        # Create and return the report
        return IndividualHealthReport.objects.create(
            crew_member=self,
            date=timezone.now(),
            title=f"Health Assessment - {self.first_name} {self.last_name}",
            subtitle=f"Generated Report - Risk Level: {overall_risk.upper()}",
            content=content,
            risk_level=overall_risk
        )

class HealthMetrics(models.Model):
    crew_member = models.ForeignKey(CrewMember, on_delete=models.CASCADE, related_name='health_metrics')
    date = models.DateTimeField()
    heart_rate = models.JSONField()
    sleep_duration = models.JSONField()
    respiration_rate = models.JSONField()
    blood_oxygen = models.JSONField()
    bone_density = models.JSONField()
    height = models.JSONField()
    weight = models.JSONField()
    exercise_level = models.JSONField()
    radiation = models.JSONField()
    outside_time = models.JSONField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"Health Metrics for {self.crew_member} on {self.date}"

class HealthProblem(models.Model):
    crew_member = models.ForeignKey(CrewMember, on_delete=models.CASCADE, related_name='health_problems')
    date = models.DateTimeField()
    description = models.TextField()
    severity = models.TextField()
    status = models.TextField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.crew_member} - {self.description[:50]}"

class FleetHealthReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fleet_reports')
    fleet = models.ForeignKey(Fleet, on_delete=models.CASCADE, related_name='health_reports')
    date = models.DateTimeField()
    title = models.TextField()
    subtitle = models.TextField()
    content = models.JSONField()
    risk_level = models.TextField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} - {self.fleet}"
