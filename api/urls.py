from django.urls import path
from .views import get_crew_members_data, create_crew_member, create_health_problem, create_health_report

urlpatterns = [
    path('crew-members/', get_crew_members_data, name='crew-members-data'),
    path('crew-members-create/', create_crew_member, name='crew-member-create'),
    path('health-problems-create/', create_health_problem, name='health-problem-create'),
    path('health-reports-create/', create_health_report, name='create_health_report'),
]
