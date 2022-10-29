from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from common.utils import phone_number_regex


class Customer(AbstractUser):
    """
        Becouse we dont inherit from the base model,so
        we use the created, and updated fields in this class.
    """
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = _("customers")
        verbose_name = _('Customer')
        verbose_name_plural = _('Customers')

    def __str__(self):
        return f'{self.first_name}{self.last_name}'
