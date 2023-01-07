from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from conf import settings
from common.basemodels import BaseModel


class Customer(AbstractUser):

    class Meta:
        db_table = _("customers")
        verbose_name = _('Customer')
        verbose_name_plural = _('Customers')

    def get_username(self):
        return self.email

    def __str__(self):
        if self.is_staff or self.is_superuser:
            return self.username
        return self.email or '<anonymous>'

    def get_full_name(self):
        full_name = super(Customer, self).get_full_name()
        if full_name:
            return full_name
        return self.get_short_name()

    def get_short_name(self):
        short_name = super(Customer, self).get_short_name()
        if short_name:
            return short_name
        return self.email


class Address(BaseModel):
    HOME = 'home'
    OFFICE = 'office'
    OTHER = 'other'
    ADDRESS_TYPE = [(HOME, _('Home')), (OFFICE, _('Office')),
                    (OTHER, _('Other')), ]

    # Users can have one or many addresses
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address = models.TextField(_("Address"))
    country = models.CharField(_("Country"), max_length=30, )
    state = models.CharField(_("State"), max_length=150, )
    city = models.CharField(_("City"), max_length=150, )
    post_code = models.CharField(_("Post_code"), max_length=12, )
    address_type = models.CharField(
        _("Address_type"), max_length=6, choices=ADDRESS_TYPE, default=HOME)

    class Meta:
        db_table = _("addresses")
        verbose_name = _("Address")
        verbose_name_plural = _("Addresses")

    def __str__(self):
        return f'{self.address}'
