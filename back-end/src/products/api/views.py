from rest_framework import viewsets, mixins
from products.api.serializers import AllProductsModelSerializer, RetriveProductsModelSerializer
from products.models import Product

class ProductModelViewSet(
        mixins.ListModelMixin,
        # mixins.UpdateModelMixin,
        mixins.RetrieveModelMixin,
        # mixins.DestroyModelMixin,
        viewsets.GenericViewSet):
    def get_queryset(self):
        return Product.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            self.serializer_class = AllProductsModelSerializer
        elif self.action == "retrieve":
            self.serializer_class = RetriveProductsModelSerializer
        return self.serializer_class