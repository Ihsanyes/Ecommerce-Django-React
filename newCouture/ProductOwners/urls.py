from django.urls import path
from ProductOwners import views

urlpatterns = [
    path('so/',views.register_owner),
    path('lo/',views.owner_login),
    path('add_product/',views.add_product),
]