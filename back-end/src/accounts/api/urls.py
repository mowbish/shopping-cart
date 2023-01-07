from rest_framework.routers import DefaultRouter
from .views import UserModelViewSet

router = DefaultRouter()

router.register(r'user', UserModelViewSet,
                basename='user')
