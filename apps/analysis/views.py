

import logging

from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.analysis.models import ResumeAnalysis
from apps.jobs.models import JobDescription
from core.pagination import StandardResultPagination
from .models import Resume
from services.ats_service import analyze_resume
from .serializers import AnalysisListSerializer,AnalysisDetailSerializer
from rest_framework import generics
from core.cache import clear_dashboard_cache
from drf_spectacular.utils import extend_schema
from rest_framework import status
from .tasks import process_analysis
logger = logging.getLogger(__name__)
# Create your views here.
@extend_schema(
    summary="Analyze Resume",
    tags=["Analysis"],
)
class ResumeAnalysisAPIView(APIView):
      permission_classes=[IsAuthenticated]

      def post (self,request):
         
        resume_id = request.data.get("resume_id")
        job_id = request.data.get("job_id")

        try:

            resume = Resume.objects.get(id=resume_id,user=request.user)
            job = JobDescription.objects.get(id=job_id,user=request.user)

        except Resume.DoesNotExist:

            logger.warning(f"Resume {resume_id} not found.")

            return Response(
                {
                    "error": "Resume not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        except JobDescription.DoesNotExist:

            logger.warning(f"Job {job_id} not found.")

            return Response(
                {
                    "error": "Job Description not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if resume.status != "completed":

            return Response(
                {
                    "error": "Resume is still processing."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        process_analysis.delay(
            resume.id,
            job.id,
        )

        logger.info(f"Analysis task queued for resume {resume.id}")

        return Response(
            {
                "message": "Analysis started successfully.",
                "resume_id": resume.id,
                "status": "processing",
            },
            status=status.HTTP_202_ACCEPTED,
        )


class AnalysisListAPIView(generics.ListAPIView):
      permission_classes=[IsAuthenticated]
      serializer_class=AnalysisListSerializer
      filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
      search_fields = ["resume__title", "job_description__title"]
      ordering_fields = ["ats_score", "match_score", "created_at"]
      filterset_fields = ["ats_score", "match_score"]
      ordering = ["-created_at"]


      pagination_class=StandardResultPagination
      def get_queryset(self):
            return ResumeAnalysis.objects.filter(resume__user=self.request.user).select_related("resume", "job_description").order_by("-created_at")

class AnalysisDetailAPIView(generics.RetrieveAPIView):
        permission_classes=[IsAuthenticated]
        serializer_class=AnalysisDetailSerializer
        def get_queryset(self):
              return ResumeAnalysis.objects.filter(resume__user=self.request.user).select_related("resume", "job_description")

