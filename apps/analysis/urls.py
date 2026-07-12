from django.urls import path

from .views import ResumeAnalysisAPIView



urlpatterns = [
  
    #API Path
    path("analyze/", ResumeAnalysisAPIView.as_view(), name="analyze"),
]