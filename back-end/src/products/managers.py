from common.basemodels import BaseManager


class ProductManager(BaseManager):
    def get_queryset(self):
        queryset = super().get_queryset()
        queryset.filter(count_of_product_gte=0)
        
        return queryset
