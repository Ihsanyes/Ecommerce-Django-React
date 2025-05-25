from django.db import models
from Userapp.models import CustomerUser
from Products.models import Product,Size

# Create your models here.

class Cart(models.Model):
    user = models.ForeignKey(CustomerUser, on_delete=models.CASCADE,related_name='carts' )
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'cart'

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE,related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True)
    class Meta:
        db_table = 'cart_item'

class Order(models.Model):
    user = models.ForeignKey(CustomerUser, on_delete=models.CASCADE, related_name='orders')
    total_price = models.DecimalField(max_digits=10,  decimal_places=2)
    status = models.CharField(max_length=20,
                              choices=[('Pending','Pending'),('Processing','processing'),('Shipped', 'Shipped'), ('Delivered', 'Delivered')],
                              default='Pending'
                              )
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'order'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        db_table = 'order_item'

class Address(models.Model):
    full_name = models.CharField(max_length=100)
    