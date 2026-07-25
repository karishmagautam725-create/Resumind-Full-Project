from django.urls import reverse
from rest_framework.test import APITestCase
from  rest_framework import  status

from apps.users.models import User

class DashboardAPIViewTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('dashboard')  
    def test_dashboard_requires_authentication(self):
        response = self.client.get(self.url)
        print(response.status_code)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_dashboard_authenticated_user(self):
        user = User.objects.create_user(
            email="Jane@example.com",
            password="StrongPassword123",
            full_name="Jane Doe"
        )
        self.client.force_authenticate(user=user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)