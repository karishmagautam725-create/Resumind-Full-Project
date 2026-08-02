from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.resumes.models import Resume
from apps.users.models import User


class ResumeUpdateAPIViewTestCase(APITestCase):
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
            title="Old Title",
            file=SimpleUploadedFile("user_resume.pdf", b"user content", content_type="application/pdf"),
            file_type="application/pdf",
            file_size=12,
            original_filename="user_resume.pdf",
            status="completed",
        )
    def test_updates_resume_title_for_authenticated_owner(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(
            reverse("update", kwargs={"pk": self.resume.pk}),
            {"title": "Updated Title"},
            format="json",
        )
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Updated Title")
        self.resume.refresh_from_db()
        self.assertEqual(self.resume.title, "Updated Title")

    def test_returns_not_found_for_other_users_resume(self):
        self.client.force_authenticate(user=self.other_user)

        response = self.client.patch(
            reverse("update", kwargs={"pk": self.resume.pk}),
            {"title": "Updated Title"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)