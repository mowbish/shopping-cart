from rest_framework import viewsets, mixins
from .serializers import (SignUpSerializer, )


class SignUpModelViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
        Provides the possibility of registration
    """
    serializer_class = SignUpSerializer