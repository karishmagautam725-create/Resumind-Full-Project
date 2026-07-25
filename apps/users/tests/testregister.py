from django.urls import reverse
from rest_framework.test import APITestCase
from  rest_framework import  status
from apps.users.models import User
class RegisterAPIViewTestCase(APITestCase):
    def setUp(self):
        self.url=reverse('register')
        self.user_data = {
            "email": "john@example.com",
            "password": "StrongPassword123",
            "confirm_password": "StrongPassword123",
            "full_name": "John Doe",
            
        }
    def test_register_user(self):
        response=self.client.post(
            self.url,
            self.user_data,
            format='json'
        )
        self.assertEqual(response.status_code,  status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(),1)
        self.assertEqual(User.objects.get().email, self.user_data['email'])
    