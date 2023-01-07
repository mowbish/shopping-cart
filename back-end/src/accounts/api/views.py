from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from .serializers import (SignUpUserModelSerializer,
                          RetriveUserModelSerializer, UpdateUserModelSerializer, DestroyUserModelSerializer)
from accounts.models import Customer


class UserModelViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin,
                       mixins.RetrieveModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):


    def get_queryset(self):
        return Customer.objects.filter(id=self.request.user.id).first()

    def get_permissions(self):
        if self.action == "create":
            self.permission_classes = None
        else:
            self.permission_classes = [IsAuthenticated]
        return self.permission_classes

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
