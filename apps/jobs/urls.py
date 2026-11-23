from django.urls import path

from .views import JobDescriptionCreateAPIVIEW,JobDescriptionListAPIVIEW



urlpatterns = [
  
    #API Path
    path("create/", JobDescriptionCreateAPIVIEW.as_view(), name="job"),
    path("list/", JobDescriptionListAPIVIEW.as_view(), name="list"),

]