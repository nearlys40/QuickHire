from django.urls import path
from .views import MockPaymentView

urlpatterns = [
    path('charge/', MockPaymentView.as_view(), name='mock-payment'),
]