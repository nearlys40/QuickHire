from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('employer', 'Employer'),
        ('developer', 'Developer'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='developer')
    bio = models.TextField(blank=True)
