from django.db import models
from django.utils.translation import gettext_lazy as _
from conf import settings
from accounts.models import Address
from products.models import Product
from djmoney.models.fields import MoneyField
from common.basemodels import BaseModel
from orders.choices import SENDING_STATUS, PAYMENT_STATUS


class Discount(BaseModel):

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="discounts",
    )
    expire_date = models.DateTimeField(_("Expire_date"))
    amount = models.PositiveSmallIntegerField(_("Amount"))
    code = models.CharField(_("Code"), max_length=50)

    class Meta:
        db_table = _("discounts")
        verbose_name = _("Discount")
        verbose_name_plural = _("Discounts")

    def __str__(self):
        return f"{self.customer} {self.amount}%"


class OrderItem(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.SmallIntegerField()

    class Meta:
        db_table = _("order_item")
        verbose_name = _("Order item")
        verbose_name_plural = _("Order items")

    def __str__(self):
        return f"{self.product_name}"


class Order(BaseModel):
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="orders",
    )
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    products = models.ManyToManyField(OrderItem)
    sendig_status = models.CharField(
        _("sendig_status"),
        max_length=15,
        choices=SENDING_STATUS,
        default="READY_TO_SHIP",
    )
    payment_status = models.CharField(
        _("Expipayment_statusre_date"),
        max_length=200,
        choices=PAYMENT_STATUS,
        default="ADDED_TO_CART",
    )
    delivery_method = models.CharField(_("delivery_method"), max_length=30)
    total_price = MoneyField(
        _("total_price"), max_digits=10, decimal_places=2, default_currency="USD"
    )
    discount = models.OneToOneField(
        Discount, on_delete=models.RESTRICT, null=True, blank=True
    )
    total_price_with_discount = MoneyField(
        _("total_price_with_discount"),
        max_digits=10,
        decimal_places=2,
        default_currency="USD",
        blank=True,
        null=True,
    )

    class Meta:
        db_table = _("orders")
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")

    def __str__(self):
        return f"{self.customer}"

    # def reduce_the_stock_counts(self):
    #     if self.payment_status == "SUCCESS":
    #         self.products.cou -= self
