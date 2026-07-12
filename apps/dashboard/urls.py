from django.urls import path

from .views import DashboardAPIView



urlpatterns = [
  
    #API Path
    path("", DashboardAPIView.as_view(), name="dashboard"),
]