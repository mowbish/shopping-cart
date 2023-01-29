from rest_framework import viewsets, mixins
from products.api.serializers import AllProductsModelSerializer, RetriveProductsModelSerializer
from products.models import Product
from django.db.models import Q

class ProductModelViewSet(
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    def get_queryset(self):
        return Product.objects.exclude(Q(stock_count=None) | Q(stock_count=0) | Q(extant=False))

    def get_serializer_class(self):
        if self.action == "list":
            self.serializer_class = AllProductsModelSerializer
        elif self.action == "retrieve":
            self.serializer_class = RetriveProductsModelSerializer
        return self.serializer_class