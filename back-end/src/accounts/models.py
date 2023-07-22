from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from conf import settings
from common.basemodels import BaseModel


class Customer(AbstractUser):
    avatar = models.ImageField(
        _("avatar"),
        upload_to="avatars",
        blank=True,
        null=True,
    )

    class Meta:
        db_table = _("customers")
        verbose_name = _("Customer")
        verbose_name_plural = _("Customers")

    def __str__(self):
        if self.is_superuser:
            return self.username
        return self.user_id


class Address(BaseModel):
    # Users can have one or many addresses
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address_name = models.CharField(
        _("address_name"), max_length=30, help_text="Home, Office, ..."
    )
    country = models.CharField(_("country"), max_length=30, null=True, blank=True)
    state = models.CharField(
        _("state"),
        max_length=150,
    )
    city = models.CharField(
        _("city"),
        max_length=150,
    )
    address_detail = models.TextField(_("address_detail"))
    postal_code = models.CharField(_("postal_code"), max_length=35, unique=True)

    class Meta:
        db_table = _("addresses")
        verbose_name = _("Address")
        verbose_name_plural = _("Addresses")

    def __str__(self):
        return f"{self.address_name}"
