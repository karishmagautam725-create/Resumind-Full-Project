from django.db import models

from apps.jobs.models import JobDescription
from apps.resumes.models import Resume

# Create your models here.
class ResumeAnalysis(models.Model):
    resume=models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="analysis"
        )
    job_description=models.ForeignKey(
        JobDescription,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="analysis"
        )
    ats_score=models.PositiveBigIntegerField(default=0)
    grammer_score=models.PositiveIntegerField(default=0)
    keyword_score=models.PositiveIntegerField(default=0)
    match_score=models.PositiveIntegerField(default=0)
    missing_keyword=models.JSONField(default=list)
    strength=models.JSONField(default=list)
    weaknesses=models.JSONField(default=list)
    ai_suggestion=models.JSONField(default=list)
    processing_time=models.FloatField(
        null=True,
        blank=True,
        help_text="Processing time in second"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"Analysis # {self.id} -ATS {self.ats_score}"