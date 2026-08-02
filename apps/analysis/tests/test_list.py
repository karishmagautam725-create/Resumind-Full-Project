from rest_framework.test import APITestCase
from rest_framework import status
from apps.users.models import User
from apps.resumes.models import Resume
from apps.jobs.models import JobDescription
from django.urls import reverse
from apps.analysis.models import ResumeAnalysis
class AnalysisListAPIViewTestCase(APITestCase):
    def setUp(self):
        self.user=User.objects.create_user(
            email="john@example.com",
            password="Password123",
            full_name="John Doe"
        )
        self.other_user=User.objects.create_user(
            email="otheruser@example.com",
            password="StrongPassword123",
            full_name="Other User",
        )

        self.resume = Resume.objects.create(
            user=self.user,
            title="This is the backend title",
            file_size=100,
            extracted_text="Django Postgres Python"

        )
        self.other_resume = Resume.objects.create(
            user=self.other_user,
            title="Other Resume",
            file_size=120,
            extracted_text="Java Spring Boot",
        )
        self.job=JobDescription.objects.create(
            user=self.user,
            title="Backend Developer",
            job_description="Looking for Django REST Framework developer"
        )
        self.other_job = JobDescription.objects.create(
            user=self.other_user,
            title="Frontend Developer",
            company_name="Example Corp",
            job_description="Looking for a frontend developer",
        )
        self.analysis = ResumeAnalysis.objects.create(
            resume=self.resume,
            job_description=self.job,
            ats_score=80,
            match_score=85,
        )
        self.other_analysis=ResumeAnalysis.objects.create(
            resume=self.other_resume,
            job_description=self.other_job,
            ats_score=70,
            match_score=65,
        )
        self.url=reverse("analysis-list")

    def test_list_requires_authentication(self):
        response=self.client.get(self.url)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    def test_list_returns_only_current_user_analyses(self):
        self.client.force_authenticate(user=self.user)

        response=self.client.get(self.url)

        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data["count"],1)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["resume_title"],self.resume.title)
        self.assertEqual(response.data["results"][0]["job_description_title"], self.job.title)
