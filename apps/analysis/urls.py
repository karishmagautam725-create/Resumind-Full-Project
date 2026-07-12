from django.urls import path

from .views import ResumeAnalysisAPIView,AnalysisListAPIView,AnalysisDetailAPIView



urlpatterns = [
  
    #API Path
    path("analyze/", ResumeAnalysisAPIView.as_view(), name="analyze"),
    path("", AnalysisListAPIView.as_view(), name="analysis-list"),
    path("<int:pk>/", AnalysisDetailAPIView.as_view(), name="analysis-detail"),
]