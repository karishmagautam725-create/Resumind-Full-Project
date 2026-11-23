from rest_framework import serializers
from .models import JobDescription
class JobDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model=JobDescription
        fields=["id","title","company_name","job_description"]

# class JobListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=JobDescription
#         fields=["id","title","company_name","job_description"]
