from common.basemodels import BaseManager


# class ProductManager(BaseManager):
#     def get_queryset(self):
#         queryset = super().get_queryset()
#         print(queryset)
#         qs = queryset.exclude(count_of_product=None)
#         print(qs)
#         return queryset