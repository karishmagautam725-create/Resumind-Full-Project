from rest_framework.test import APITestCase
from rest_framework import status
from apps.users.models import User
from apps.resumes.models import Resume
from apps.jobs.models import JobDescription
from django.urls import reverse
from apps.analysis.models import ResumeAnalysis
class ResumeAnalysisAPITestCase(APITestCase):
    def setUp(self):
        self.user=User.objects.create_user(
            email="john@example.com",
            password="Password123",
            full_name="John Doe"
        )
        self.resume=Resume.objects.create(
            user=self.user,
            title="Backend Resume",
            file_size=100,
            extracted_text="Django Postgres Python"
        )
        self.job=JobDescription.objects.create(
            user=self.user,
            title="Backend Developer",
            job_description="Looking for Django REST Framework developer"
        )
        self.url=reverse("analyze")

    def test_requires_authentication(self):
            response = self.client.post (
                self.url,
                {
                    "resume_id":self.resume.id,
                     "job_id": self.job.id
                },
                format="json",
            )
            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    def test_analyze_success_when_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post (
                        self.url,
                        {
                            "resume_id":self.resume.id,
                             "job_id": self.job.id
                        },
                        format="json",
                    )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        def test_analysis_created_successfully(self):
            self.client.force_authenticate(user=self.user)
            response=self.client.post(self.url,{"resume_id":self.resume.id,
                                          "job_id": self.job.id},format="json")

            self.assertEqual(
                response.status_code,
        status.HTTP_201_CREATED,
         )

            self.assertEqual(
        ResumeAnalysis.objects.count(),
        1,
    )

            self.assertIn(
        "ats_score",
        response.data,
    )
             
             


