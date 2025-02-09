from django.contrib import admin
from .models import (
    Fleet,
    CrewMember,
    HealthMetrics,
    HealthProblem,
    IndividualHealthReport,
    FleetHealthReport
)

@admin.register(Fleet)
class FleetAdmin(admin.ModelAdmin):
    list_display = ('name', 'company_name', 'user')
    search_fields = ('name', 'company_name')
    list_filter = ('company_name',)

@admin.register(CrewMember)
class CrewMemberAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'role', 'status', 'fleet')
    search_fields = ('first_name', 'last_name', 'role')
    list_filter = ('status', 'role', 'fleet', 'sex')
    date_hierarchy = 'date_of_birth'

@admin.register(HealthMetrics)
class HealthMetricsAdmin(admin.ModelAdmin):
    list_display = ('crew_member', 'date')
    search_fields = ('crew_member__first_name', 'crew_member__last_name')
    list_filter = ('date',)
    date_hierarchy = 'date'

@admin.register(HealthProblem)
class HealthProblemAdmin(admin.ModelAdmin):
    list_display = ('crew_member', 'date', 'description', 'severity', 'status')
    search_fields = ('crew_member__first_name', 'crew_member__last_name', 'description')
    list_filter = ('severity', 'status', 'date')
    date_hierarchy = 'date'

@admin.register(IndividualHealthReport)
class IndividualHealthReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'crew_member', 'date', 'risk_level')
    search_fields = ('title', 'crew_member__first_name', 'crew_member__last_name')
    list_filter = ('risk_level', 'date')
    date_hierarchy = 'date'

@admin.register(FleetHealthReport)
class FleetHealthReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'fleet', 'date', 'risk_level')
    search_fields = ('title', 'fleet__name')
    list_filter = ('risk_level', 'date', 'fleet')
    date_hierarchy = 'date'
