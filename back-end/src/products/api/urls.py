from rest_framework.routers import DefaultRouter
from .views import ProductModelViewSet

router = DefaultRouter()

router.register(r'product', ProductModelViewSet,
                basename='product')
