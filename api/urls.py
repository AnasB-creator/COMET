from django.urls import path
from .views import get_crew_members_data, create_crew_member, create_health_problem

urlpatterns = [
    path('crew-members/', get_crew_members_data, name='crew-members-data'),
    path('crew-members-create/', create_crew_member, name='crew-member-create'),
    path('health-problems-create/', create_health_problem, name='health-problem-create'),
]
