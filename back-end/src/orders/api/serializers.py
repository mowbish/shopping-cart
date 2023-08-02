# from rest_framework import serializers
# from ..models import Discount, OrderItem
# from accounts.models import Customer


# class CreateDiscountModelSerializer(serializers.ModelSerializer):
#     username = serializers.StringRelatedField(many=False)
    
#     class Meta:
#         model = Discount
#         fields = ("product", "quantity")
    
#     def create(self, validated_data):
#         customer = Customer.objects.filter(username=validated_data["username"])
#         if not customer.exists():
#             raise ProcessLookupError("user not found")
        
#         discount = Discount.objects.create(
            
#         )
#         customer = Customer.objects.create(
#             username=validated_data["username"],
#             first_name=validated_data["first_name"],
#             last_name=validated_data["last_name"],
#             email=validated_data["email"],
#             is_staff=validated_data["is_staff"],
#             is_active=validated_data["is_active"],
#         )
#         customer.set_password(raw_password=validated_data["password"])
#         customer.save()

#         return customer


# class CreateOrderItemModelSerializer(serializers.ModelSerializer):
#     product = serializers.StringRelatedField(many=False)
    
#     class Meta:
#         model = OrderItem
#         fields = ("product", "quantity")