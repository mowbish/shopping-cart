from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):

        if view.action == "create" or request.method in SAFE_METHODS:
            return True

        return bool(request.user and request.user.is_authenticated)
        

    def has_object_permission(self, request, view, obj):

        if view.action == "create" or request.method in SAFE_METHODS:
            return True

        return bool(obj.username == request.user.username)

class IsAddressOwner(BasePermission):
    """
    Custom permission to only allow owners of an address to edit it.
    """

    def has_permission(self, request, view):

        if view.action == "create":
            return True

        return bool(request.user and request.user.is_authenticated)
        

    def has_object_permission(self, request, view, obj):

        if view.action == "create":
            return True

        return bool(obj.customer.username == request.user.username)
