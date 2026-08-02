from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.resumes.models import Resume
from apps.users.models import User


class ResumeDetailAPIViewTestCase(APITestCase):
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
        self.resume = Resume.objects.create(
            user=self.user,
            title="User Resume",
            file=SimpleUploadedFile("user_resume.pdf", b"user content", content_type="application/pdf"),
            file_type="application/pdf",
            file_size=12,
            original_filename="user_resume.pdf",
            extracted_text="Parsed text",
            status="completed",
        )

    def test_retrieves_resume_for_authenticated_owner(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse("detail", kwargs={"pk": self.resume.pk}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.resume.id)
        self.assertEqual(response.data["title"], self.resume.title)
        self.assertEqual(response.data["extracted_text"], self.resume.extracted_text)

    def test_returns_not_found_for_other_users_resume(self):
        self.client.force_authenticate(user=self.other_user)

        response = self.client.get(reverse("detail", kwargs={"pk": self.resume.pk}))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)