from django.db import models
from django.utils.translation import gettext_lazy as _
from conf import settings
from accounts.models import Address
from products.models import Product
from djmoney.models.fields import MoneyField
from common.basemodels import BaseModel
from orders.choices import ORDER_STATUS


class Discount(BaseModel):

    """
        Here we dont inherit from BaseModel, 
        because we should have create time and expire time for
        each discount. in BaseModel we have Craeted time field
        and also in Discount we have created field.
        because of this created fields have diffrent way to use.
    """

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
                                 related_name='discounts')
    expire_date = models.DateTimeField(_("Expire_date"))
    amount = models.PositiveSmallIntegerField(_("Amount"))
    code = models.CharField(_("Code"), max_length=50)

    class Meta:
        db_table = _('discounts')
        verbose_name = _('Discount')
        verbose_name_plural = _('Discounts')

    def __str__(self):
        return f'{self.customer} {self.amount}%'


class OrderItem(BaseModel):
    product_name = models.CharField(max_length=150)
    quantity = models.SmallIntegerField()

    class Meta:
        db_table = _('order_item ')
        verbose_name = _('Order item')
        verbose_name_plural = _('Order items')

    def __str__(self):
        return f'{self.product_name}'


class Order(BaseModel):

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='orders')
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    products = models.ManyToManyField(OrderItem)
    status = models.CharField(
        max_length=15,
        choices=ORDER_STATUS,
        default="READY_TO_SHIP",
    )
    delivery_method = models.CharField(max_length=30)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    total_price = MoneyField(
        max_digits=10, decimal_places=2, default_currency='USD')
    discount = models.OneToOneField(
        Discount, on_delete=models.RESTRICT, null=True, blank=True)
    total_price_with_discount = MoneyField(max_digits=10, decimal_places=2, default_currency='USD', blank=True,
                                           null=True)

    class Meta:
        db_table = _('orders')
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')

    def __str__(self):
        return f'{self.customer}'
