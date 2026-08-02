from django.urls import path

from .views import ResumeUploadAPIView,ResumeListAPIView,ResumeDetailAPIView,ResumeUpdateAPIView,ResumeDeleteAPIView



urlpatterns = [
  
    #API Path
    path("upload/", ResumeUploadAPIView.as_view(), name="upload"),
    path("list/", ResumeListAPIView.as_view(), name="list"),
     path("<int:pk>/", ResumeDetailAPIView.as_view(),name="detail"),
     path("<int:pk>/update/", ResumeUpdateAPIView.as_view(),name="update"),

    path("<int:pk>/delete/", ResumeDeleteAPIView.as_view(),name="delete"),
]