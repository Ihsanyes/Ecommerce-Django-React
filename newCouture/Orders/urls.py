from django.urls import path
from . import views

urlpatterns = [
    path('add_cart/', views.add_cart, name='add_cart'),
    path('get_cart/',views.get_cart),
    path('delete_cart/<int:id>/',views.delete_cart)
]