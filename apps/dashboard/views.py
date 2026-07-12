from django.shortcuts import render

from services.dashboard_services import get_dashboard_data
from .serializers import DashboardSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# Create your views here.

class DashboardAPIView(APIView):
     permission_classes=[IsAuthenticated]
     def get(self,request):
          dashboard=get_dashboard_data(request.user)
          serializer=DashboardSerializer(dashboard)
          return Response(serializer.data)

