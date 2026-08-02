import logging

from django.shortcuts import render

from services.dashboard_services import get_dashboard_data
from .serializers import DashboardSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from django.core.cache import cache
# Create your views here.
logger = logging.getLogger(__name__)

@extend_schema(
    summary="Dashboard Statistics",
    tags=["Dashboard"],
)
class DashboardAPIView(APIView):
     permission_classes=[IsAuthenticated]
     def get(self,request):
          logger.info(f"Dashboard requested by user {request.user.id}.")
        #   dashboard=get_dashboard_data(request.user)
        #   logger.info(f"Dashboard data retrieved for user {request.user.id}.")
          cache_key = f"dashboard_{request.user.id}"
          dashboard = cache.get(cache_key)
          if dashboard:
            logger.info(f"Dashboard cache hit for user {request.user.id}.")
          else:
             logger.info(f"Dashboard cache miss for user {request.user.id}.")
             dashboard = get_dashboard_data(request.user)
             cache.set(cache_key, dashboard, timeout=300)
          serializer=DashboardSerializer(dashboard)
          return Response(serializer.data)

