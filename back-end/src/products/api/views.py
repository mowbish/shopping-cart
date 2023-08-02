from rest_framework import viewsets
from products.api.serializers import (
    CategoryModelSerializer,
    CreateProductsModelSerializer,
    RetriveProductsModelSerializer,
    UpdateProductsModelSerializer,
    DestroyProductsModelSerializer,
    AllProductsModelSerializer,
)
from ..models import Product, Category
from django.db.models import Q
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.decorators import action


class CategoryModelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    serializer_class = CategoryModelSerializer

    def get_queryset(self):
        return Category.objects.all()


class ProductModelViewSet(viewsets.ModelViewSet):
    
    lookup_field = "id"

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            permissions_class = (AllowAny,)
        else:
            permissions_class = (IsAdminUser,)
        return [permission() for permission in permissions_class]


    def get_queryset(self):
        
        return (
            Product.objects.all()
            .select_related("category")
            .exclude(Q(stock_count=None) | Q(stock_count=0) | Q(extant=False))
        )

    def get_serializer_class(self):
        
        if self.action == "create":
            self.serializer_class = CreateProductsModelSerializer
        elif self.action == "retrieve":
            self.serializer_class = RetriveProductsModelSerializer
        elif self.action == "update":
            self.serializer_class = UpdateProductsModelSerializer
        elif self.action == "destroy":
            self.serializer_class = DestroyProductsModelSerializer
        elif self.action == "list":
            self.serializer_class = AllProductsModelSerializer
        return self.serializer_class
    

    