# from rest_framework import viewsets, mixins
# from products.api.serializers import AllProductsModelSerializer
# from products.models import Product

# class ProductModelViewSet(
#         mixins.ListModelMixin,
#         # mixins.UpdateModelMixin,
#         # mixins.RetrieveModelMixin,
#         # mixins.DestroyModelMixin,
#         viewsets.GenericViewSet):
#     def get_queryset(self):
#         return Product.objects.all()
#     pagination_class = 