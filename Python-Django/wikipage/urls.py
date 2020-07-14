"""wikipage URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from wikipage.quickstart.views import Task1ViewSet,Task2ViewSet

router = routers.DefaultRouter()
router.register(r'task1', Task1ViewSet,basename='task1')
router.register(r'task2', Task2ViewSet,basename='task2')
# router.register(r'^tasks/{task_id}/$', Task1ViewSet,basename='task1')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
