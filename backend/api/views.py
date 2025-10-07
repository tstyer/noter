from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] #You cannot call the class unless you have a valid jwt token. 

    def get_queryset(self):
        user = self.request.user         # Select the right user. 
        return Note.objects.filter(author=user) # Filter method to get the right user, not all posts. 

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)



# Chosen the generic view built into django that will handle creating a new user object. 
# The below will look at all the users to as to not duplicate,
# Sepcify we want a user object, 
# And allow anyone - even if not authenticated, to use the view. 
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]