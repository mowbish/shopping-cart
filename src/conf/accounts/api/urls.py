from rest_framework.routers import DefaultRouter
from .views import SignUpModelViewSet

router = DefaultRouter()

router.register(r'accounts/signup', SignUpModelViewSet,
                basename='sign_up_account')
