import datetime
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
from rest_framework_simplejwt.tokens import RefreshToken

class UserModelViewSet(mixins.UpdateModelMixin,
                       mixins.RetrieveModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    lookup_field = "username"
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Customer.objects.filter(username=self.request.user.username, is_active=True)

    def get_serializer_class(self):

        if self.action == "retrieve":
            self.serializer_class = RetriveUserModelSerializer
        elif self.action == "update":
            self.serializer_class = UpdateUserModelSerializer
        elif self.action == "destroy":
            self.serializer_class = DestroyUserModelSerializer
        return self.serializer_class

    @action(detail=False, methods=["POST"], permission_classes=[AllowAny], url_path="sign-up")
    def sign_up(self, request):
        serializer = SignUpUserModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"data": serializer.data})

    @action(detail=False, methods=["GET"], permission_classes=[AllowAny], url_path="is-exists")
    def is_exists(self, request, *args, **kwargs):
        target_customer = request.query_params['username']
        queryset = Customer.objects.filter(username=target_customer)
        if not queryset.exists():
            return Response({"is_active": False}, status=status.HTTP_404_NOT_FOUND)
        serializer = RetriveUserModelSerializer(queryset.first(), many=False, data={
                                                "username": target_customer})
        serializer.is_valid(raise_exception=True)

        return Response({"is_active": serializer.data["is_active"]})
    
    @action(detail=False, methods=["POST"], permission_classes=[IsOwner], url_path="logout")
    def logout(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(token=refresh_token)
                token.blacklist()
                # token.access_token.set_exp(datetime.timedelta(seconds=1))
                return Response({"data": "Logout succesfull"})
            else:
                return Response({"error": "Invalid token."}, status=400)
        except Exception:
            return Response({"error": "Invalid token."}, status=400)


class UserAddressModelViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin,
                              mixins.DestroyModelMixin, mixins.RetrieveModelMixin,
                              mixins.ListModelMixin, viewsets.GenericViewSet):
    lookup_field = "postal_code"
    permission_classes = (IsAddressOwner,)

    def get_queryset(self):
        if self.action == "list":
            return Address.objects.select_related("customer").filter(customer=self.request.user)
        else:
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
