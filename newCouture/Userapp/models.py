from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class CustomerUser(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=100,blank=True,null=True)
    email = models.EmailField(max_length=100,unique=True,blank=True,null=True)
    phone_number = models.CharField(max_length=15,blank=True,null=True)
    profile_image = models.ImageField(upload_to='users/',blank=True,null=True)
    class Meta:
        db_table = 'custom_user'

class DeliveryAddress(models.Model):
    user = models.ForeignKey(CustomerUser, on_delete=models.CASCADE, related_name="delivery_addresses")
    full_name = models.CharField(max_length=100,blank=True,null=True)
    country = models.CharField(max_length=100,blank=True,null=True)
    phone_number = models.CharField(max_length=100,blank=True,null=True)
    pin_code = models.IntegerField(blank=True,null=True)
    house_address = models.TextField(blank=True,null=True)
    street_address = models.TextField(blank=True,null=True)
    landmark = models.TextField(blank=True,null=True)
    city = models.CharField(max_length=100,blank=True,null=True)
    state = models.CharField(max_length=100,blank=True,null=True)

    class Meta:
        db_table = 'user_address'