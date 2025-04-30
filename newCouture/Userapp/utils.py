import random
from django.core.mail import send_mail
from django.conf import settings

# Generate a 6-digit OTP
def generate_otp():
    return str(random.randint(1000, 9999))

# Send OTP via email
def send_otp_email(email, otp):
    subject = "Your Secure OTP Code"
    message = f"Your One-Time Password (OTP) is {otp}. Do not share it with anyone."
    email_from = settings.EMAIL_HOST_USER
    send_mail(subject, message, email_from, [email])
    return True