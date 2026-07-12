from rest_framework import serializers
from .models import Resume
from pathlib import Path
class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model=Resume
        fields=["id","title","file"]
    def validate_file(self, file):
         allowed_extensions=[".pdf",".docx"]
         extension=Path(file.name).suffix.lower()

         if extension  not in allowed_extensions:
             raise serializers.ValidationError("Onlu Pdf and docs file are allowed")
         
         max_size=5*1024*1024
         if file.size > max_size:
             raise serializers.ValidationError("File Size Must be less than 5MB")
         return file

class ResumeListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Resume
        fields= ["id","title","original_filename","status","created_at"]

class ResumeDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resume
        exclude = ("user",)

class ResumeUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resume
        fields = (
            "title",
        )
