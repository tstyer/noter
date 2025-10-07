from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

# Chosen the generic view built into django that will handle creating a new user object. 
# The below will look at all the users to as to not duplicate,
# Sepcify we want a user object, 
# And allow anyone - even if not authenticated, to use the view. 
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]