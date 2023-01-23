from django.db import models
from djmoney.models.fields import MoneyField
from django.utils.translation import gettext_lazy as _
from common.basemodels import BaseModel
from products.managers import ProductManager
from products.choices import COLOR_CHOICES

class Category(BaseModel):
    name = models.CharField(_('name'), max_length=100)
    parent = models.ForeignKey(
        "self", null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        db_table = _('categories')
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')

    def __str__(self):
        return f'{self.name}'

    def save(self, *args, **kwargs):
        # Raise on circular reference
        parent = self.parent
        while parent is not None:
            if parent == self:
                raise RuntimeError("Circular references not allowed")
            parent = parent.parent

        super(Category, self).save(*args, **kwargs)


class IPaddress(BaseModel):
    ip_address = models.GenericIPAddressField(_('ip_address'))

    class Meta:
        db_table = _('ip_addresses')
        verbose_name = _('ip_address')
        verbose_name_plural = _('IPaddress')

    def __str__(self):
        return f'{self.ip_address}'


class Product(BaseModel):
    name = models.CharField(_('name'), max_length=150)
    description = models.TextField(_('description'), )
    features = models.JSONField(_("features"),)
    color = models.CharField(_("color"), null=True,
                             blank=True, choices=COLOR_CHOICES, max_length=50)
    base_image = models.ImageField(
        _('image'), upload_to=f'{BaseModel.id}-{name}/product_base_image')
    count_of_product = models.PositiveSmallIntegerField(_('number_of_product'),
                                                        blank=True, null=True)
    price = MoneyField(_('price'), max_digits=10, decimal_places=2,
                       default_currency='USD')
    category = models.ForeignKey(
        "Category", on_delete=models.CASCADE, related_name='products')
    is_active = models.BooleanField(default=True)

    views = models.ManyToManyField(IPaddress, blank=True)
    objects = ProductManager()

    class Meta:
        db_table = _('products')
        verbose_name = _('Product')
        verbose_name_plural = _('Products')

    def __str__(self):
        return f'{self.name}'


class ProductImages(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    images = models.ImageField(
        _("images"), upload_to="f'{BaseModel.id}-{name}/product_images")

    def __str__(self):
        return self.product.name

    class Meta:
        db_table = _('product_images')
        verbose_name = _('ProductImage')
        verbose_name_plural = _('ProductImages')
