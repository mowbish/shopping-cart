from rest_framework import viewsets, mixins, status
from products.api.serializers import CategoryModelSerializer, AllProductsModelSerializer, RetriveProductsModelSerializer
from products.models import Product, Category
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response

class CategoryModelViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin, 
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet):
    
    permission_classes = (IsAdminUser,)
    serializer_class = CategoryModelSerializer

    def get_queryset(self):
        return Category.objects.all()

class ProductModelViewSet(
        mixins.RetrieveModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    def get_queryset(self):
        return Product.objects.exclude(Q(stock_count=None) | Q(stock_count=0) | Q(extant=False))

    def get_serializer_class(self):
        if self.action == "list":
            self.serializer_class = AllProductsModelSerializer
        elif self.action == "retrieve":
            self.serializer_class = RetriveProductsModelSerializer
        return self.serializer_class