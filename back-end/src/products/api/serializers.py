from rest_framework import serializers
from products.models import Product, ProductImages


class ProductImagesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ("product", "images")


class AllProductsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("name", "color", "base_image",
                  "count_of_product", "price", "category")


class RetriveProductsModelSerializer(serializers.ModelSerializer):

    product_images = ProductImagesModelSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ("name", "description", "features", "color", "base_image",
                  "count_of_product", "price", "category", "is_active", "views", "product_images")
