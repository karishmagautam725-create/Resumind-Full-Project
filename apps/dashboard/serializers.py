from rest_framework import serializers

class DashboardSerializer(serializers.Serializer):
    total_resumes=serializers.IntegerField()
    total_job_description=serializers.IntegerField()
    total_analysis_report=serializers.IntegerField()
    average_ats_score=serializers.IntegerField()
    highest_ats_score=serializers.IntegerField()
    recent_reports=serializers.ListField()
