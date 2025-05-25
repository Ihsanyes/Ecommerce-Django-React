from django.urls import path
from Products import views

urlpatterns = [
    path('get-products/', views.get_products, name='get_products'),
    path('get_one_product/<int:id>',views.get_one_product)
]