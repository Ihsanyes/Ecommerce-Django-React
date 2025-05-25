from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import permission_classes
from Userapp.views import permission_classes,IsAuthenticated
from Userapp.models import CustomerUser
from Products.models import Product,Size
from . models import Cart,CartItem
from django.db.models import Prefetch
from .serializers import CartItemSerializers

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_cart(request):
    user = request.user

    try:
        custom_user = CustomerUser.objects.get(user=user)
    except CustomerUser.DoesNotExist:
        return Response({"message": "CustomerUser not found."}, status=404)

    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    size_id = request.data.get('sizeId')

    if not product_id or not quantity or not size_id:
        return Response({"message": "Fields are required."}, status=400)

    try:
        product = Product.objects.get(id=product_id)
        size = Size.objects.get(id=size_id)
    except Product.DoesNotExist:
        return Response({"message": "Product not found."}, status=404)
    except Size.DoesNotExist:
        return Response({"message": "Size not found."}, status=404)

    # Get or create the cart for the user
    cart, created = Cart.objects.get_or_create(user=custom_user)

    # Check if item already exists in the cart
    cart_item, item_created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        size=size,
        defaults={'quantity': quantity}
    )

    if not item_created:
        # If item exists, update the quantity
        cart_item.quantity += int(quantity)
        cart_item.save()

    return Response({"message": "Item added to cart successfully!"}, status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    user = request.user
    custom_user = CustomerUser.objects.get(user=user)
    cart_with_items = Cart.objects.filter(user=custom_user).prefetch_related(
    Prefetch(
        'items',
        queryset=CartItem.objects.select_related('product', 'size')
    )).first()  # or `.get()` if only one cart per user
    cart_items= []
    if cart_with_items:
        for item in cart_with_items.items.all():
            product = item.product
            size = item.size
            brands_name = product.product_brand.name if product.product_brand else None
            # print(product.id,product.name,size.size,item.quantity,product.price,product.image.url if product.image else None)
            cart_items.append({
                "id": item.id,
                "product_id": product.id,
                "brand": brands_name,
                "product_name": product.name,
                "discount_off": product.discount_off,
                "size": size.size,
                "quantity": item.quantity,
                "price": product.price,
                "image": product.image.url if product.image else None
            })
            print(brands_name)

    

    return Response({"cart_items": cart_items})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart(request,id):
    cart_item = CartItem.objects.get(id=id)
    cart_item.delete()
    print(cart_item)
    return Response('ok delete')


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def add_addres(request):
    
