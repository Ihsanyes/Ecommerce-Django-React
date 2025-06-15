from rest_framework import serializers
from .models import DeliveryAddress

class DeliveryAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = [ 'full_name', 'country', 'phone_number', 'pin_code', 'house_address', 'street_address', 'landmark', 'city', 'state']