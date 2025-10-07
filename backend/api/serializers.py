# The serializers will taske python objects and convert them into JSON data. 

from django.contrib.auth.models import User
from rest_framework import serializers

# This serializer class takes the id, pass and username from the user model, and converts it to JSON
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}