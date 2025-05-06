from django.urls import path
from .mock_views import MockPaymentView

urlpatterns = [
    path('charge/', MockPaymentView.as_view(), name='mock-charge')
]