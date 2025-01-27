"""
URL configuration for django_course_site project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic.base import RedirectView

urlpatterns = [
    # This is for the admin panel built in
    path('admin/', admin.site.urls),
    # Redirect!! from '' to '/meetups'
    path('', RedirectView.as_view(url='/meetups')),
    # This will go /meetups/, it is a beginning for any urls in meetups urls.py folder
    path('meetups/', include('meetups.urls') ),  # this is a prefix for a whole module. Like a folder in Next.js
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# The static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) above is so you can show your uploaded files on the admin part