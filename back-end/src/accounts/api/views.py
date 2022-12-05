from rest_framework import viewsets, mixins
from .serializers import (CreateSignUpModelSerializer, RetriveSignUpModelSerializer, UpdateSignUpModelSerializer)


class SignUpModelViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
        Provides the possibility of registration
    """
    serializer_class = CreateSignUpModelSerializer


class UserModelViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin,
                       mixins.RetrieveModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    def get_serializer(self):
        if self.action == "create":
            self.serializer_class = CreateSignUpModelSerializer
        elif self.action == "update":
            self.serializer_class = UpdateSignUpModelSerializer
        elif self.action == "retrieve":
            self.serializer_class = RetriveSignUpModelSerializer
