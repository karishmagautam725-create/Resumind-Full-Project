from django.db import models
from django.conf import settings

# Create your models here.

class JobDescription(models.Model):
    user=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,related_name="job_description"
        )
    title=models.CharField(max_length=255)
    company_name=models.CharField(max_length=255)
    job_description=models.TextField()
    source_url=models.URLField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.company_name} - {self.title}"