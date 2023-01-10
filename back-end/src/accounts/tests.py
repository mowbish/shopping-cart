from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import Customer
from django.contrib.auth.hashers import make_password

class AccountTests(APITestCase):
    
    def test_create_valid_account(self):
        """
        Ensure we can create a new account object.
        """
        url = "http://localhost:8000/api/user/"
        data = {"username": "test_username", "first_name": "test_first_name",
                "last_name": "test_las_name", "email": "test_email@email.com", "password": "test"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 1)
        self.assertEqual(Customer.objects.get().username, 'test_username')
        self.assertEqual(Customer.objects.get().first_name, 'test_first_name')
        self.assertEqual(Customer.objects.get().last_name, 'test_las_name')
        self.assertEqual(Customer.objects.get().email, 'test_email@email.com')
        # self.assertEqual(Customer.objects.get().password, make_password('test'))
