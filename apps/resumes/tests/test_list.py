from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.resumes.models import Resume
from apps.users.models import User


class ResumeListAPIViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="john@example.com",
            password="Password123",
            full_name="John Doe",
        )
        self.other_user = User.objects.create_user(
            email="jane@example.com",
            password="Password123",
            full_name="Jane Doe",
        )
        self.user_resume = Resume.objects.create(
            user=self.user,
            title="User Resume",
            file=SimpleUploadedFile("user_resume.pdf", b"user content", content_type="application/pdf"),
            file_type="application/pdf",
            file_size=12,
            original_filename="user_resume.pdf",
            status="completed",
        )
        self.other_user_resume=Resume.objects.create(
            user=self.other_user,
            title="Other Resume",
            file=SimpleUploadedFile("other_resume.pdf", b"other content", content_type="application/pdf"),
            file_type="application/pdf",
            file_size=12,
            original_filename="other_resume.pdf",
            status="completed",
        )
    def test_lists_only_current_user_resumes(self):
            self.client.force_authenticate(user=self.user)
            response=self.client.get(reverse("list"))
            self.assertEqual(response.status_code,status.HTTP_200_OK)
            self.assertEqual(response.data["count"], 1)
            self.assertEqual(len(response.data["results"]), 1)
            self.assertEqual(response.data["results"][0]["title"], self.user_resume.title)
            self.assertEqual(response.data["results"][0]["status"], self.user_resume.status)
