from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.db.utils import IntegrityError

User = get_user_model()


@api_view(['POST'])
def registerUser(request):
    message = {'message': 'User could not be registered'}
    if 'password' in request.data and 'email' in request.data and 'name' in request.data:
        try:
            user = User.objects.create_user(
                email=request.data['email'],
                name=request.data['name'],
                password=make_password(request.data['password']),
                is_active=False,
                is_staff=False,
            )
            return Response(status=status.HTTP_200_OK)
        except IntegrityError:
            message = {'message': 'User alredy registered'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        message = {'message': 'Missing info'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
