from rest_framework import status
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from Userapp.models import CustomerUser
from Userapp.utils import generate_otp,send_otp_email


# Create your views here.

login_otp_storage = {}  # Temporary dictionary to store OTPs (Use DB in production)
register_otp_storage = {}  # Temporary dictionary to store OTPs (Use DB in production)

@api_view(['POST'])
@permission_classes([AllowAny])
def send_otp(request):
    if request.method == "POST":
        # data = json.loads(request.body)
        # global email
        email = request.data.get("email")
        phone_number = request.data.get("phone")

        if not phone_number:
            return Response({"error": "Phone number is required"}, status=400)

        if not email:
            return Response({"error": "Email is required"}, status=400)

        if CustomerUser.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)
        if CustomerUser.objects.filter(phone_number=phone_number).exists():
            return JsonResponse({"error": "Phone number already exists"}, status=400)

        otp = generate_otp()
        register_otp_storage[email] = {
            'otp': otp,
            'phone': phone_number
        }  # Store OTP temporarily

        if send_otp_email(email, otp):

            print(email,otp,phone_number)
            print(register_otp_storage)
            return JsonResponse({"message": f"OTP sent successfully for {email}"})
        register_otp_storage.pop(email, None)
        return JsonResponse({"message":"OTP sent error"})

@api_view(['POST'])
@permission_classes([AllowAny])
def login_otp(request):
    email = request.data.get("email")
    
    if not email:
        return Response({"error": "Email is required"}, status=400)

    if CustomerUser.objects.filter(email=email).exists():
        otp = generate_otp()

        if login_otp_storage.get(email) is not None:
            login_otp_storage.pop(email, None)
        else:
            customer_user = CustomerUser.objects.get(email=email)
            login_otp_storage[email] = {
                'otp': otp,
                'phone': customer_user.phone_number
            }

        if send_otp_email(email, otp):
            print(email,otp)
            print(login_otp_storage)
            return Response({"message": f"OTP sent successfully for {email}"})
        else:
            return Response({"error": "Failed to send OTP email"}, status=500)
    else:   
        return Response({"error": "Email not registered"}, status=400)



@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    email = request.data.get("email")
    otp = request.data.get("otp")

    if CustomerUser.objects.filter(email=email).exists():
        login_stored_data = login_otp_storage.get(email)

        if not login_stored_data:
            return Response({"error": "OTP expired or not generated"}, status=status.HTTP_400_BAD_REQUEST)
        
        if login_stored_data['otp'] != otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
        
        login_user = CustomerUser.objects.get(email=email)
        refresh = RefreshToken.for_user(login_user.user)
        print("refresh",refresh)
        print("access",refresh.access_token)

        # Optionally clear OTP
        login_otp_storage.pop(email, None)

        return Response({
            "message": "OTP verified successfully",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
    else:
        register_stored_data = register_otp_storage.get(email)
        if not register_stored_data:
            return Response({"error": "OTP expired or not geenerated"}, status=status.HTTP_400_BAD_REQUEST)
        
        if register_stored_data['otp'] != otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
        
        phone_number = register_stored_data['phone']
        
        print(email,phone_number,otp)
        user_obj, _ = User.objects.get_or_create(
            username=email,
            defaults={"email": email}  # ✅ Set the email field properly
)    
        customer_user, created = CustomerUser.objects.get_or_create(
            email=email,
            defaults={"phone_number": phone_number, "user": user_obj}
        )

        refresh = RefreshToken.for_user(user_obj)
        # refresh
        print("refresh",refresh)
        print("access",refresh.access_token)

        # Optionally clear OTP
        register_otp_storage.pop(email, None)

        return Response({
            "message": "OTP verified successfully",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    # Assuming you have a one-to-one relation between User and CustomerUser
    customer_user = CustomerUser.objects.get(user=user)
    print(customer_user.email,customer_user.phone_number,customer_user.name)
    return Response({
        "email": customer_user.email,
        "phone": customer_user.phone_number,
        "name": customer_user.name
        # add more fields if needed
    })

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    customer_user = CustomerUser.objects.get(user=user)
    print(customer_user.email,customer_user.phone_number,customer_user.name)
    name = request.data.get("name")
    phone_number = request.data.get("phone")
    print(name,phone_number)

    if name:
        customer_user.name = name
    if phone_number:
        customer_user.phone_number = phone_number

    customer_user.save()
    print(customer_user.email,customer_user.phone_number,customer_user.name)
    return Response({
        "message": "User updated successfully",
        "email": customer_user.email,
        "phone": customer_user.phone_number,
        "name": customer_user.name
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    user = request.user
    print(user)
    msg = 'hellow world'
    return Response(msg)
