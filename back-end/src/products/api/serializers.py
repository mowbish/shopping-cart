from rest_framework import serializers
from products.models import Category, Product, ProductImages

class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "parent")



class AllProductsModelSerializer(serializers.ModelSerializer):
    category = CategoryModelSerializer(read_only=True)
    class Meta:
        model = Product
        fields = ("name", "color", "base_image",
                  "stock_count", "price", "category")

class ProductImagesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ("product", "images")

class RetriveProductsModelSerializer(serializers.ModelSerializer):

    product_images = ProductImagesModelSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ("name", "description", "features", "color", "base_image",
                  "stock_count", "price", "category", "extant", "views", "product_images")

