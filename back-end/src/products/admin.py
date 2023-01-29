from django.contrib import admin
from products.models import Product, ProductImages, Category


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "color", "base_image",
                    "count_of_product", "price", "category")
    search_fields = ("color", "category", "price", "count_of_product")
    empty_value_display = '-empty-'
    ordering = ('created_at',)
    list_filter = ("color", "category", "price", "count_of_product")


@admin.register(ProductImages)
class ProductImagesAdmin(admin.ModelAdmin):
    list_display = ("product", "images")
    search_fields = ("product__name",)
    empty_value_display = '-empty-'
    ordering = ('product__created_at',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "parent")
    search_fields = ("name",)
    empty_value_display = '-empty-'
    ordering = ('created_at',)
