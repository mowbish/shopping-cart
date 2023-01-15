from rest_framework.routers import DefaultRouter
from .views import UserModelViewSet, UserAddressModelViewSet

router = DefaultRouter()

router.register(r'user', UserModelViewSet,
                basename='user')
router.register(r'user-address', UserAddressModelViewSet,
                basename='user-address')
