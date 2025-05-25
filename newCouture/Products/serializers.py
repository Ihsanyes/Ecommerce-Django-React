from rest_framework import serializers
from .models import Product,Size,ProductBrand,Category

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['id','size', 'stock']

class ProductBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductBrand  # Use the through model for the many-to-many relationship
        fields = ['id','name']

class ProductSerializer(serializers.ModelSerializer):
    product_sizes = SizeSerializer(many=True, read_only=True)
    product_brand = ProductBrandSerializer( read_only=True)  # Assuming you want to show brand details

    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id','name','categoryGroup']


class ProductOneSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    product_brand = ProductBrandSerializer()
    product_sizes = SizeSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'discount_off', 'image', 'created_at','category','product_brand','product_sizes']