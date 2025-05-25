from rest_framework import serializers
from .models import Cart,CartItem

class CartItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        field = '__all__'