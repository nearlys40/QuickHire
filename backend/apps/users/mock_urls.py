from django.urls import path
from .mock_views import MockRegisterView

urlpatterns = [
    path('register/', MockRegisterView.as_view(), name='mock-register')
]