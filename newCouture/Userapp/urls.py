from django.urls import path
from .views import send_otp, verify_otp
from Userapp import views

urlpatterns = [
    path("send-otp/", send_otp, name="send_otp"),
    path("verify-otp/", verify_otp, name="verify_otp"),
    path('login-otp/',views.login_otp),
    path('',views.home)
]