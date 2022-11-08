from rest_framework import serializers
from accounts.models import Customer


class CreateSignUpModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ("username", "first_name", "last_name", "email", "password")


class RetriveSignUpModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ("first_name", "last_name", "username", "email",
                  "date_joined", "last_login", "is_staff")
