from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import JobDescriptionSerializer
import logging
logger = logging.getLogger(__name__)
# Create your views here.
class JobDescriptionCreateAPIVIEW(CreateAPIView):
    serializer_class=JobDescriptionSerializer
    permission_classes=[IsAuthenticated]
    def perform_create(self, serializer):
        logger.info(f"Job description created by user {self.request.user.id}.")
        serializer.save(user=self.request.user)

