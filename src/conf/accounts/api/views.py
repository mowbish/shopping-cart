from rest_framework import viewsets, mixins, filters
from rest_framework.permissions import IsAuthenticated
from .serializers import (SignUpSerializer, ChangePasswordSerializer, )
from accounts.models import Customer
from rest_framework import status
from rest_framework.response import Response


class SignUpModelViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
        Provides the possibility of registration
    """
    serializer_class = SignUpSerializer