from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):

        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):

        return bool(obj.username == request.user.username)


class IsAddressOwner(BasePermission):
    """
    Custom permission to only allow owners of an address to edit it.
    """

    def has_permission(self, request, view):

        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):

        return bool(obj.customer.username == request.user.username)
