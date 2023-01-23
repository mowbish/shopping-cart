from rest_framework import serializers
from products.models import Product


class AllProductsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("name", "color", "base_image",
                  "count_of_product", "price", "category")
