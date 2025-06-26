from django.contrib import admin

from Userapp.models import CustomerUser,DeliveryAddress

# Register your models here.
admin.site.register(CustomerUser)
admin.site.register(DeliveryAddress)