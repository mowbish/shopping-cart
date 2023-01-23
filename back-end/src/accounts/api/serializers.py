from rest_framework import serializers, exceptions
from accounts.models import Customer, Address
from django.contrib.auth.hashers import make_password

# Not Tested


class SignUpUserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ("username", "first_name", "last_name", "email", "password")

    def create(self, validated_data):
        customer = Customer.objects.create(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )
        customer.set_password(raw_password=validated_data["password"])
        customer.save()

        return customer

    def validate(self, attrs):

        if Customer.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError("This Username already taken")
        elif Customer.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError("This email already taken")
        return super().validate(attrs)

    def to_representation(self, instance):

        return {
            "username": instance.username,
            "first_name": instance.first_name,
            "last_name": instance.last_name,
            "email": instance.email,
        }

# Not Tested


class RetriveUserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ("is_active",)
    
# Not Tested


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

# Not Tested


class DestroyUserModelSerializer(serializers.ModelSerializer):
    """
        The user cannot delete his/her account completely
        user only can deactive himself/herself account.
    """
    class Meta:
        model = Customer
        fields = ("username", "password")

    def update(self, instance, validated_data):
        if instance.is_active != False:
            instance.is_active = False
            instance.save()
        return instance

    def validate(self, attrs):
        requested_user = self.context['request'].user
        password = make_password(attrs['password'])
        if requested_user.username != attrs["username"]:
            raise PermissionError("You dont have access to this account")
        elif not Customer.objects.filter(username=requested_user.username).exists():
            raise ProcessLookupError("user not found")
        elif Customer.objects.filter(username=requested_user.username).first().password != password:
            raise LookupError("username or password may wrong")
        return super().validate(attrs)

    def to_representation(self, instance):
        return {"status": "your account deleted successfully"}


# Not Tested
class CreateUserAddressModelSerializer(serializers.ModelSerializer):
    customer = serializers.StringRelatedField(many=False)

    class Meta:
        model = Address
        fields = (
            "customer", "address_name", "country", "state", "city", "address_detail", "postal_code"
        )

    def create(self, validated_data):
        address = Address.objects.create(
            customer=self.context['request'].user,
            address_name=validated_data["address_name"],
            country=validated_data["country"],
            state=validated_data["state"],
            city=validated_data["city"],
            address_detail=validated_data["address_detail"],
            postal_code=validated_data["postal_code"]
        )
        address.save()
        return address

# Not Tested
class UpdateUserAddressModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ("address_name", "country", "state",
                  "city", "address_detail", "postal_code",)



# Not Tested
class ListUserAddressModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ("address_name", "country", "state",
                  "city", "address_detail", "postal_code",)


# Not Tested
class RetrieveUserAddressModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ("address_name", "country", "state",
                  "city", "address_detail", "postal_code",)


# Not Tested
class DestroyUserAddressModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ()

