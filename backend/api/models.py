from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    #Auto populate the time when updated. 
    created_at = models.DateTimeField(auto_now_add=True)
    #Foreign key links a user with data that belongs to the user. One user, many notes (one to many): self-learn note.
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title