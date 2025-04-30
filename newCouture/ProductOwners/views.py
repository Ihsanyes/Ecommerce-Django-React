from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from ProductOwners.models import OwnerUser
# Create your views here.
from Products import models
from Products.models import CategoryGroup, Category, ProductBrand,Size


@api_view(['POST'])
@permission_classes([AllowAny])
def register_owner(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    re_password = request.data.get('re_password')

    if password!=re_password :
        return Response({'error':'Password is not Same'})
    if not username or not email or not password or not re_password:
        return Response('Fields are Required')

    if User.objects.filter(username=username,email=email).exists():
        return Response({'error': 'User account already exists'}, status=400)

    user = User.objects.create_user(username=username,email=email,password=password)
    if user :
        return Response({'message': 'User registered successfully!'}, status=201)

@api_view(['POST'])
@permission_classes([AllowAny])
def owner_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=400)
    user = authenticate(username=username, password=password)
    print(user)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=400)
    refresh = RefreshToken.for_user(user)
    print(refresh)
    return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_product(request):
    category_group = CategoryGroup.objects.all()
    category = Category.objects.all()
    product_brand = ProductBrand.objects.all()
    size = Size.objects.all()
    return Response(category_group,category,product_brand,size)