from django.urls import path
from .views import get_crew_members_data

urlpatterns = [
    path('crew-members/', get_crew_members_data, name='crew-members-data'),
]
