from rest_framework import viewsets, mixins
from .permissions import IsOwner, IsAddressOwner
from .serializers import (SignUpUserModelSerializer,
                          RetriveUserModelSerializer, UpdateUserModelSerializer, DestroyUserModelSerializer,
                          CreateUserAddressModelSerializer, ListUserAddressModelSerializer,
                          RetrieveUserAddressModelSerializer, DestroyUserAddressModelSerializer, 
                          UpdateUserAddressModelSerializer)
from accounts.models import Customer, Address
from rest_framework.permissions import IsAuthenticated


class UserModelViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin,
                       mixins.RetrieveModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    lookup_field = "id"
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Customer.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            self.serializer_class = SignUpUserModelSerializer
        elif self.action == "retrieve":
            self.serializer_class = RetriveUserModelSerializer
        elif self.action == "update":
            self.serializer_class = UpdateUserModelSerializer
        elif self.action == "destroy":
            self.serializer_class = DestroyUserModelSerializer
        return self.serializer_class


class UserAddressModelViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin,
                              mixins.DestroyModelMixin, mixins.RetrieveModelMixin,
                              mixins.ListModelMixin, viewsets.GenericViewSet):
    lookup_field = "id"
    permission_classes = (IsAuthenticated, IsAddressOwner)

    def get_queryset(self):
        return Address.objects.filter(customer=self.request.user)

    def get_serializer_class(self):
        if self.action == "create":
            self.serializer_class = CreateUserAddressModelSerializer
        elif self.action == "update":
            self.serializer_class = UpdateUserAddressModelSerializer
        elif self.action == "list":
            self.serializer_class = ListUserAddressModelSerializer
        elif self.action == "retrieve":
            self.serializer_class = RetrieveUserAddressModelSerializer
        elif self.action == "destroy":
            self.serializer_class = DestroyUserAddressModelSerializer
        return self.serializer_class
