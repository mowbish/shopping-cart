from rest_framework import serializers
from products.models import Category, Product, ProductImages

class AllCategoriessModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "parent")



class AllProductsModelSerializer(serializers.ModelSerializer):
    category = AllCategoriessModelSerializer(read_only=True)
    class Meta:
        model = Product
        fields = ("name", "color", "base_image",
                  "count_of_product", "price", "category")

class ProductImagesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ("product", "images")

class RetriveProductsModelSerializer(serializers.ModelSerializer):

    product_images = ProductImagesModelSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ("name", "description", "features", "color", "base_image",
                  "count_of_product", "price", "category", "is_active", "views", "product_images")

