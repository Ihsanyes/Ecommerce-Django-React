from django.urls import path
from .views import send_otp, verify_otp
from Userapp import views

urlpatterns = [
    path("send-otp/", send_otp, name="send_otp"),
    path("verify-otp/", verify_otp, name="verify_otp"),
    path('login-otp/',views.login_otp),
    path('current_user/',views.current_user),
    path('update_user/',views.update_user),
    path('',views.home),
    path('delivery_address/',views.add_delivery_address),
    path('get_address/',views.get_delivery_address),
    path('delete_delivery_address/<int:id>', views.delete_delivery_address),
]