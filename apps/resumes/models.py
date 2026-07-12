from django.db import models
from django.conf import settings

# Create your models here.

class Resume(models.Model):
    STATUS_CHOICES=(
        ("uploaded","Uploaded"),
        ("processing","Processing"),
        ("completed","Completed"),
        ("failed","Failed"),
    )
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="resume")
    title=models.CharField(max_length=255)
    file=models.FileField(upload_to="resumes/")
    file_type=models.CharField(max_length=20)
    file_size=models.PositiveIntegerField(help_text="Stored in bytes")
    original_filename=models.CharField(max_length=255,default=True)
    extracted_text=models.TextField(blank=True)
    status=models.CharField(max_length=20,choices=STATUS_CHOICES,default="uploaded")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.title}"

