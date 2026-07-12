from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.analysis.models import ResumeAnalysis
from apps.jobs.models import JobDescription
from .models import Resume
from services.ats_service import analyze_resume

# Create your views here.
class ResumeAnalysisAPIView(APIView):
      permission_classes=[IsAuthenticated]

      def post (self,request):
            resume_id=request.data.get("resume_id")
            job_id=request.data.get("job_id")
            try:
                  resume=Resume.objects.get(id = resume_id,user=request.user)
                  job=JobDescription.objects.get(id=job_id,user=request.user)
            except Resume.DoesNotExist:
                  return Response(
                        {
                              "error":"Resume Not found"
                        }
                  )
            except JobDescription.DoesNotExist:
                  return Response(
                        {
                              "error":"Job Description Not found"
                        }
                  )
            
            analysis_result=analyze_resume(resume.extracted_text,job.job_description)
            report=ResumeAnalysis.objects.create(
                resume=resume,
                job_description=job,
                ats_score=analysis_result["ats_score"],
                match_score=analysis_result["match_score"],
                missing_keyword=analysis_result["missing_keywords"],
                ai_suggestion=analysis_result["feedback"]


            )
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
                  

