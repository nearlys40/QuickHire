from django.urls import path
from .views import NotificationListView, NotificationMarkReadView, NotificationMarkSingleView

urlpatterns = [
    path('', NotificationListView.as_view(), name='notification-list'),
    path('mark-read/', NotificationMarkReadView.as_view(), name='notification-mark-read'),
    path('<int:pk>/mark-read/', NotificationMarkSingleView.as_view(), name='notification-mark-one'),
]