from django.urls import path

from .views import JobDescriptionCreateAPIVIEW



urlpatterns = [
  
    #API Path
    path("create/", JobDescriptionCreateAPIVIEW.as_view(), name="job"),
]