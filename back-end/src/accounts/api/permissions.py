from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):

        if view.action == "create":
            return True

        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):

        if view.action == "create":
            return True

        return obj.username == request.user.username
