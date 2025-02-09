from django.db import models
from django.contrib.auth.models import User

class Fleet(models.Model):
    name = models.TextField()
    company_name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fleets')

    def __str__(self):
        return f"{self.name} - {self.company_name}"

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

class IndividualHealthReport(models.Model):
    crew_member = models.ForeignKey(CrewMember, on_delete=models.CASCADE, related_name='health_reports')
    date = models.DateTimeField()
    title = models.TextField()
    subtitle = models.TextField()
    content = models.JSONField()
    risk_level = models.TextField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} - {self.crew_member}"

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
