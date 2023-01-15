import json
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import Customer


class AccountTests(APITestCase):

    def test_create_valid_account(self):
        """
        Ensure we can create a new account object.
        """
        url = "http://localhost:8000/api/user/"
        data = {"username": "test_username", "first_name": "test_first_name",
                "last_name": "test_last_name", "email": "test_email@email.com", "password": "test"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 1)
        self.assertEqual(Customer.objects.get().username,
                         data['username'])
        self.assertEqual(Customer.objects.get().first_name,
                         data['first_name'])
        self.assertEqual(Customer.objects.get().last_name,
                         data['last_name'])
        self.assertEqual(Customer.objects.get().email,
                         data['email'])
    
    # def test_create_invalid_account(self):
    #     """
    #     Ensure we can create a new account object.
    #     """
    #     url = "http://localhost:8000/api/user/"
    #     data = {"username": "test_username", "first_name": "test_first_name",
    #             "last_name": "test_last_name", "email": "test_email@email.com", "password": "test"}
    #     data2 = {"username": "test_username", "first_name": "test_first_name",
    #             "last_name": "test_last_name", "email": "test_email@email.com", "password": "test"}
    #     self.client.post(url, data, format='json')
    #     response2 = self.client.post(url, data2, format='json')
    #     self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(response2.data['username'], 'asdf')
    #     self.assertEqual(Customer.objects.get().first_name,
    #                      data['first_name'])
    #     self.assertEqual(Customer.objects.get().last_name,
    #                      data['last_name'])
    #     self.assertEqual(Customer.objects.get().email,
    #                      data['email'])

