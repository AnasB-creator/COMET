from django.urls import path
from .views import get_crew_members_data, create_crew_member

urlpatterns = [
    path('crew-members/', get_crew_members_data, name='crew-members-data'),
    path('crew-members-create/', create_crew_member, name='crew-member-create'),
]
