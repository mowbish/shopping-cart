from rest_framework import serializers
from accounts.models import Customer


class SignUpSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = ("username", "first_name", "last_name", "email", "password")
