from django.urls import reverse
from rest_framework.test import APITestCase
from  rest_framework import  status
from apps.users.models import User

class LoginAPIViewTestCase(APITestCase):
    def setUp(self):
        self.url=reverse('login')
        self.user=User.objects.create_user(
            email="John@example.com",
            password="StrongPassword123",
            full_name="John Doe"
        )

    def test_login_user(self):
        response=self.client.post(
            self.url,
            {
                "email": "John@example.com",
                "password": "StrongPassword123"
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(response.data["user"]["email"], self.user.email)