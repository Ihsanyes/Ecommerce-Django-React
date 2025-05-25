from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Product,Category, CategoryGroup,Size,ProductBrand
from .serializers import ProductSerializer,ProductOneSerializer
from django.db.models import Prefetch


# Create your views here.
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_products(request):
#     if request.method == "GET":
#         # Assuming you have a Product model and you want to return all products
#         products = Product.objects.all()
#         serializer = ProductSerializer(products, many=True)
#         print(serializer.data)
#         return Response(serializer.data)




# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_products(request):
#     products = Product.objects.filter(category__name="T Shirts").select_related(
#         'category', 'product_brand'  # Use select_related for ForeignKey
#     ).prefetch_related(
#         Prefetch('product_sizes', queryset=Size.objects.all())
#     )

#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)




@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
        category_groups = CategoryGroup.objects.all()
        final_result =[]

        for category_group in category_groups:
            # Get all categories for this category group
            categories = Category.objects.filter(categoryGroup=category_group)
            
            result = []
            
            for category in categories:
                # Get all products for this category
                products = Product.objects.filter(category=category)
                
                category_products = []
                
                for product in products:
                    # Get sizes for this product
                    sizes_with_stock = [
                        {
                            "size": size.size,
                            "stock": size.stock
                        } 
                        for size in product.product_sizes.all()
                    ] or [{"size": "Out of stock", "stock": 0}]  # Default if no sizes
                                    
                    discount_price = product.price - (product.price * product.discount_off / 100) if product.discount_off else product.price
                    # Get brand name
                    brand_name = product.product_brand.name if product.product_brand else None

                    # Build product dictionary
                    product_data = {
                        "id": product.id,
                        "brand": brand_name,
                        "name": product.name,
                        "originalPrice": int(product.price),
                        "discount": product.discount_off if product.discount_off else 0,
                        "discountPrice": int(discount_price),
                        "size": sizes_with_stock,
                        "image": product.image.url if product.image else "",
                        "category": category.name
                    }
                    category_products.append(product_data)
                
                # Only add category if it has products
                if category_products:
                    result.append({
                        "id": category.id,
                        "category": category.name,
                        "products": category_products
                    })
            if result:
                 final_result.append({
                      "id":category_group.id,
                      "group name":category_group.name,
                      "category":result
                 })
                 
        return Response(final_result)



@api_view(['GET'])
@permission_classes([AllowAny])
def get_one_product(request, id):
    try:
        product = Product.objects.get(id=id)
        serializer = ProductOneSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
     