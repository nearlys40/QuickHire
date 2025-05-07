from django.urls import path
from .views import (
    NotificationListView, 
    NotificationMarkReadView, 
    NotificationMarkSingleView, 
    NotificationTestBroadcastView
)

urlpatterns = [
    path('', NotificationListView.as_view(), name='notification-list'),
    path('mark-read/', NotificationMarkReadView.as_view(), name='notification-mark-read'),
    path('<int:pk>/mark-read/', NotificationMarkSingleView.as_view(), name='notification-mark-one'),
    path('test-broadcast/', NotificationTestBroadcastView.as_view(), name='notification-test'),
]