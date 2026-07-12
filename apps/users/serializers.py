from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model

User = get_user_model()


class RegisterSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "full_name", "password", "confirm_password"]

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match"}
            )

        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            full_name=validated_data["full_name"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user
    
class LoginSerializer(serializers.Serializer):
     email=serializers.EmailField()
     password=serializers.CharField(write_only=True)
     def validate(self,data):
         email=data.get("email")
         password=data.get("password")

         user=authenticate(username=email,password=password)

         if not user:
             raise serializers.ValidationError(
                "Invalid credentials"
            )
         data["user"]=user
         return data 
