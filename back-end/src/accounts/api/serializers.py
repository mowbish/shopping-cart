from rest_framework import serializers
from accounts.models import Customer


class SignUpUserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ("username", "first_name", "last_name", "email", "password")

    def to_representation(self, instance):
        # dont return password
        pass


class RetriveUserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ("first_name", "last_name", "username", "email",
                  "date_joined", "last_login", "is_staff")


class UpdateUserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ("first_name", "last_name", "username", "email")

    def validate(self, attrs):

        if attrs["username"] in Customer.objects.all().exists():
            raise serializers.ValidationError("This Username already taken")
        elif attrs["email"] in Customer.objects.all().exists():
            raise serializers.ValidationError("This email already taken")
        return super().validate(attrs)

class DestroyUserModelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = ("first_name", "last_name", "username", "email")