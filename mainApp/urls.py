from django.urls import path, re_path
from .views import reactApp
from django.views.decorators.cache import never_cache
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    re_path(r'^(?!static/).*$', never_cache(reactApp), name='home'),
]
