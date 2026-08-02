from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.users.models import User
class  ResumeUploadAPIViewTestCase(APITestCase):
    def setUp(self):
        self.user=User.objects.create_user(
            email="john@example.com",
            password="Password123",
            full_name="John Doe"
        )
        self.url=reverse("upload")
    def test_requires_authentication(self):
        file = SimpleUploadedFile("resume.pdf", b"resume content", content_type="application/pdf")
        response=self.client.post(self.url,{"title": "My Resume", "file": file},format="multipart"
        )
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)
    def test_uploads_resume_for_authenticated_user(self):
        self.client.force_authenticate(user=self.user)
        file = SimpleUploadedFile("resume.pdf", b"resume content", content_type="application/pdf")
        with patch("apps.resumes.views.extract_text", return_value="Parsed resume text") as mock_extract:
            response = self.client.post(
                self.url,
                {"title": "My Resume", "file": file},
                format="multipart",
            )
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "My Resume")
        self.assertEqual(response.data["status"],"completed")
        self.assertEqual(response.data["extracted_text"], "Parsed resume text")
        self.assertTrue(self.user.resume.filter(title="My Resume").exists())
