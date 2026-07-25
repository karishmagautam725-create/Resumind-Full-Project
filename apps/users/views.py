import logging

from django.shortcuts import render
from rest_framework.generics import CreateAPIView,GenericAPIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from apps.users.serializers import LoginSerializer, RegisterSerializers
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema
User = get_user_model()
logger = logging.getLogger(__name__)

@extend_schema(
    summary="Register User",
    tags=["Authentication"],
)
class RegisterAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializers
    permission_classes = []
    authentication_classes=[]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": {
                    "id": user.id,
                    "full_name": user.full_name,
                    "email": user.email,
                },
                "refresh": str(refresh),
                "access": str(refresh.access_token),

            
            },
            status=status.HTTP_201_CREATED,
            
        )
    logger.info(f"User {User.id} registered successfully.")
@extend_schema(
    summary="Login User",
    tags=["Authentication"],
)
class LoginAPIView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class=LoginSerializer
    permission_classes = [AllowAny]

    def post(self,request):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user=serializer.validated_data["user"]
        refresh=RefreshToken.for_user(user)
        return Response(
            {
                "user": {
                    "id": user.id,
                    "email": user.email,
                },
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
              status=status.HTTP_200_OK
        )
    logger.info(f"User {User.id} logged in.")

class MeAPIView(APIView):

    permission_classes=[IsAuthenticated]

    def get(self,request):
        user=request.user
        return Response(
            {
                "id":user.id,
                "full_name":user.full_name,
                "email":user.email
            }
        )
    


