from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.api.urls import router as accounts_router
#from orders.urls import router as orders_router
#from products.urls import router as products_router
from rest_framework_simplejwt import views as jwt_views
router = DefaultRouter()

router.registry.extend(accounts_router.registry)
#router.registry.extend(orders_router.registry)
#router.registry.extend(products_router.registry)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

]
