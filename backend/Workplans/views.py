import datetime
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.db.utils import IntegrityError
from django.core.mail import send_mail
from django.conf import settings
from Workplans.models import Workplans, Activity
import sys
from django.utils.crypto import get_random_string
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from Workplans.serialisers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.name
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    verify_secret = get_random_string(length=32)
    if 'password' in request.data and 'email' in request.data and 'name' in request.data:
        try:
            user = User.objects.create_user(
                email=request.data['email'],
                name=request.data['name'],
                password=request.data['password'],
                is_active=False,
                is_staff=False,
                verification_secret=verify_secret,
            )
        except IntegrityError:
            return Response({'message': 'User alredy registered'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'User could not be registered'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            # send_mail(
            #     f'Verifica tu cuenta de usuario para {settings.WEB_SITE_NAME}',
            #     f'Para verificar tu cuenta en {
            #         settings.WEB_SITE_NAME}, ve a settings.VERIFICATION_URL}{verify_secret}',
            #     settings.SENDER_EMAIL,
            #     [request.data['email']],
            #     fail_silently=False,
            #     html_message=f'Porfavor ve a <a href="{
            #         settings.VERIFICATION_URL}/{verify_secret}">este email</a> para verificar tu cuenta.',
            # )
            user.sent_verification_email = True
            user.save()
        except:
            print("send mail exceptioin:", sys.exc_info())
            return Response({"message": "Cannot send email"}, status=status.HTTP_400_BAD_REQUEST)
        print(settings.VERIFICATION_URL)
        return Response({'html': f'Porfavor ve a <a href="{
            settings.VERIFICATION_URL}/{verify_secret}">este link</a> para verificar tu cuenta.'
        }, status=status.HTTP_200_OK)
    return Response({'message': 'Missing info'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def verifyUser(request, verification_secret):
    try:
        user = User.objects.get(verification_secret=verification_secret)
        user.verificated = True
        user.is_active = True
        user.save()
        return Response({'message': 'user_registered'}, status=status.HTTP_200_OK)
    except:
        return Response({'message': 'Unable to verify email'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def handleEmail(request):
    password_secret = get_random_string(length=32)
    try:
        user = User.objects.get(email=request.data['email'])
        user.password_secret = password_secret
        user.save()
        print(f"Porfavor ve a <a href='http://localhost:5173/password/{
              password_secret}'>este link</a> para verificar tu cuenta.")
        return Response(status=status.HTTP_200_OK)
    except:
        return Response({'message': "Mail doesnt exist"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updatePassword(request, password_secret):
    try:
        user = User.objects.get(password_secret=password_secret)
        user.password = make_password(request.data['password'])
        user.save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response({'message': "Password cant be changed"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userInfo(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateInfo(request):
    flag = False
    user = User.objects.get(email=request.user)
    if "name" in request.data:
        user.name = request.data['name']
        flag = True
    if "password" in request.data:
        user.password = make_password(request.data["password"])
        flag = True
    if flag:
        user.save()
    access_token = RefreshToken.for_user(user)
    access_token['name'] = user.name
    return Response({'access': str(access_token.access_token),
                     'refresh': str(access_token)}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createWorkplan(request):
    user = request.user
    date = datetime.date(
        int(request.data["year"]), int(request.data["month"]), 1)
    work = Workplans(date)
    work.save()
    work.custom_user.add(user)
    user.save()
    return Response(status=status.HTTP_200_OK)
