from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.api import urls as accounts_router
from orders.api import urls as orders_router
from products.api import urls as products_router

router = DefaultRouter()

router.registry.extend(accounts_router.registry)
router.registry.extend(orders_router.registry)
router.registry.extend(products_router.registry)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
