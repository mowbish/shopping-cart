from django.contrib import admin
from accounts.models import Customer, Address, IPaddress


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("username", "first_name", "last_name",
                    "email", "date_joined")
    search_fields = ('username', "first_name",
                     "last_name", "email",)
    empty_value_display = '-empty-'
    ordering = ('date_joined',)


@admin.register(Address)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("customer", "address_name", "country", "state",
                    "city", "address_detail", "postal_code",)
    search_fields = ("customer__username", "address_name", "country", "state",
                    "city", "address_detail",)
    empty_value_display = '-empty-'
    ordering = ('created_at',)

@admin.register(IPaddress)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("ip_address",)
    search_fields = ("ip_address",)
    empty_value_display = '-empty-'
    ordering = ('created_at',)

