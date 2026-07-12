from .models import ResumeAnalysis
from rest_framework import serializers

class AnalysisListSerializer(serializers.ModelSerializer):
      resume_title=serializers.CharField(source="resume.title",read_only=True)
      job_description_title=serializers.CharField(source="job_description.title",read_only=True)
      class Meta:
            model=ResumeAnalysis
            fields=["id","resume_title","job_description_title","ats_score","created_at"]

class AnalysisDetailSerializer(serializers.ModelSerializer):
      resume_title=serializers.CharField(source="resume.title",read_only=True)
      job_description_title=serializers.CharField(source="job_description.title",read_only=True)

      class Meta:
            model=ResumeAnalysis
            fields=["id","resume_title","job_description_title","ats_score","grammer_score","keyword_score","match_score","missing_keyword","strength","weaknesses","ai_suggestion","processing_time","created_at"]