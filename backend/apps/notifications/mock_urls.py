from django.urls import path
from .mock_views import MockNotificationTriggerView

urlpatterns = [
    path('trigger/', MockNotificationTriggerView.as_view(), name='mock-notification')
]
