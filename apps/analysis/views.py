

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
logger = logging.getLogger(__name__)
# Create your views here.
@extend_schema(
    summary="Analyze Resume",
    tags=["Analysis"],
)
class ResumeAnalysisAPIView(APIView):
      permission_classes=[IsAuthenticated]

      def post (self,request):
            resume_id=request.data.get("resume_id")
            job_id=request.data.get("job_id")
            try: 
                  logger.info("Resume analysis started.")
                  resume=Resume.objects.get(id = resume_id,user=request.user)
                  job=JobDescription.objects.get(id=job_id,user=request.user)
            except Resume.DoesNotExist:
                  logger.warning("Resume not found.")
                  return Response(
                        {
                              "error":"Resume Not found"
                        }
                  )
            except JobDescription.DoesNotExist:
                  logger.warning("Job Description not found.")
                  return Response(
                        {
                              "error":"Job Description Not found"
                        }
                  )
            logger.info("Resume and Job Description found.")
            analysis_result=analyze_resume(resume.extracted_text,job.job_description)
            report=ResumeAnalysis.objects.create(
                resume=resume,
                job_description=job,
                ats_score=analysis_result["ats_score"],
                match_score=analysis_result["match_score"],
                missing_keyword=analysis_result["missing_keywords"],
                ai_suggestion=analysis_result["feedback"]


            )
            clear_dashboard_cache(request.user)
            logger.info(f"Analysis completed for report {report.id}.")
            return Response(
                  {
                        "message":"Analysis Completed",
                        "report_id":report.id,
                        "ats_score":report.ats_score,
                        "matched_score":report.match_score,
                        "missing_keyword":report.missing_keyword,
                        "ai_suggestion":report.ai_suggestion
                  }
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

