from rest_framework import viewsets, mixins, status
from .permissions import IsOwner, IsAddressOwner
from .serializers import (SignUpUserModelSerializer,
                          RetriveUserModelSerializer, UpdateUserModelSerializer, DestroyUserModelSerializer,
                          CreateUserAddressModelSerializer, ListUserAddressModelSerializer,
                          RetrieveUserAddressModelSerializer, DestroyUserAddressModelSerializer,
                          UpdateUserAddressModelSerializer)
from accounts.models import Customer, Address
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response


class UserModelViewSet(mixins.UpdateModelMixin,
                       mixins.RetrieveModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    lookup_field = "username"
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Customer.objects.filter(username=self.request.user.username)

    def get_serializer_class(self):

        if self.action == "retrieve":
            self.serializer_class = RetriveUserModelSerializer
        elif self.action == "update":
            self.serializer_class = UpdateUserModelSerializer
        elif self.action == "destroy":
            self.serializer_class = DestroyUserModelSerializer
        return self.serializer_class

    @action(detail=False, methods=["POST"], permission_classes=[AllowAny])
    def sign_up_create(self, request):
        serializer = SignUpUserModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"data": serializer.data})

    @action(detail=False, methods=["GET"], permission_classes=[AllowAny])
    def is_exists_read(self, request, *args, **kwargs):
        target_customer = request.query_params['username']
        queryset = Customer.objects.filter(username=target_customer)
        if not queryset.exists():
            return Response({"is_active": False}, status=status.HTTP_404_NOT_FOUND)
        serializer = RetriveUserModelSerializer(queryset.first(), many=False, data={
                                                "username": target_customer})
        serializer.is_valid(raise_exception=True)

        return Response({"is_active": serializer.data["is_active"]})


class UserAddressModelViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin,
                              mixins.DestroyModelMixin, mixins.RetrieveModelMixin,
                              mixins.ListModelMixin, viewsets.GenericViewSet):
    lookup_field = "postal_code"
    permission_classes = (IsAddressOwner,)

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
