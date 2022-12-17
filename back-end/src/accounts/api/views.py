from rest_framework import viewsets, mixins
from .serializers import (SignUpUserModelSerializer, RetriveUserModelSerializer, UpdateUserModelSerializer)


class UserModelViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin,
                       mixins.RetrieveModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    def get_serializer_class(self):

        if self.action == "create":
            self.serializer_class = SignUpUserModelSerializer
        elif self.action == "retrieve":
            self.serializer_class = RetriveUserModelSerializer
        elif self.action == "update":
            self.serializer_class = UpdateUserModelSerializer

        return super().get_serializer_class()