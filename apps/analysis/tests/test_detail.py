from rest_framework.test import APITestCase
from rest_framework import status
from apps.users.models import User
from apps.resumes.models import Resume
from apps.jobs.models import JobDescription
from django.urls import reverse
from apps.analysis.models import ResumeAnalysis
class AnalysisDetailAPIViewTestCase(APITestCase):
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
            ats_score=90,
            match_score=88,
            missing_keyword=["Docker"],
            strength=["Django"],
            weaknesses=["Testing"],
            ai_suggestion=["Add more test coverage"],
        )
    
        self.other_analysis=ResumeAnalysis.objects.create(
            resume=self.other_resume,
            job_description=self.other_job,
            ats_score=70,
            match_score=65,
        )
        

    def test_requires_authenticate(self):
        response=self.client.get(reverse("analysis-detail", args=[self.analysis.id]))
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    def test_detail_returns_analysis_for_the_owner(self):
        self.client.force_authenticate(user=self.user)
        response=self.client.get(reverse("analysis-detail", args=[self.analysis.id]))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data["id"],self.analysis.id)
        self.assertEqual(response.data["resume_title"],self.resume.title)
        self.assertEqual(response.data["job_description_title"],self.job.title)
        self.assertEqual(response.data["ats_score"],self.analysis.ats_score)
        self.assertEqual(response.data["match_score"],self.analysis.match_score)

    def test_detail_returns_not_found_for_another_users_analysis(self):
        self.client.force_authenticate(user=self.user)
        response=self.client.get(reverse("analysis-detail", args=[self.other_analysis.id]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
