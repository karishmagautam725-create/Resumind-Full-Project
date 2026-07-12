from django.urls import path

from apps.users.views import RegisterAPIView,LoginAPIView,MeAPIView

urlpatterns = [
  
    #API Path
    path("register/", RegisterAPIView.as_view(), name="register"),
    path('login/',LoginAPIView.as_view(),name="login"),
    path('me/',MeAPIView.as_view())
]