from rest_framework import viewsets
from products.api.serializers import (
    CategoryModelSerializer,
    AllProductsModelSerializer,
    RetriveProductsModelSerializer,
)
from products.models import Product, Category, ProductImages
from django.db.models import Q
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action


class CategoryModelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    serializer_class = CategoryModelSerializer

    def get_queryset(self):
        return Category.objects.all()


class ProductModelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    lookup_field = "id"

    def get_permissions(self):
        return super().get_permissions()

    def get_queryset(self):
        if self.action == "list":
            return (
                Product.objects.all()
                .select_related("category")
                .exclude(Q(stock_count=None) | Q(stock_count=0) | Q(extant=False))
            )
        else:
            return (
                ProductImages.objects.select_related("product")
                .filter(product__id=self.lookup_field)
                .exclude(Q(stock_count=None) | Q(stock_count=0) | Q(extant=False))
            )

    def get_serializer_class(self):
        if self.action == "list":
            self.serializer_class = AllProductsModelSerializer
        elif self.action == "retrieve":
            self.serializer_class = RetriveProductsModelSerializer
        return self.serializer_class

    # @action(methods=["POST"], detail=False, url_path="create",)
    # def create_product(self):
    #     ...
