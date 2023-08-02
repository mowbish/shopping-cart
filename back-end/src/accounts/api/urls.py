from rest_framework.routers import DefaultRouter
from .views import UserModelViewSet, UserAddressModelViewSet

router = DefaultRouter()

router.register(r"users", UserModelViewSet, basename="users")
router.register(r"user-addresses", UserAddressModelViewSet, basename="user-addresses")
