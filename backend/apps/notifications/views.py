from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

from .models import Notification
from .serializers import NotificationSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


class NotificationListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(
            recipient=request.user
        ).order_by('-timestamp')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)


class NotificationMarkReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        Notification.objects.filter(
            recipient=request.user, read=False
        ).update(read=True)
        return Response({"status": "all marked as read"})


class NotificationMarkSingleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            notification = Notification.objects.get(pk=pk, recipient=request.user)
            notification.read = True
            notification.save()
            return Response({"status": "marked as read"})
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found"}, status=status.HTTP_404_NOT_FOUND)


class NotificationTestBroadcastView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        n = Notification.objects.create(
            recipient=request.user,
            message="🔔 ทดสอบการแจ้งเตือนแบบ real-time",
            read=False,
        )
        broadcast_notification(n)
        return Response({"status": "test notification sent"})


# ✅ Shared utility
def broadcast_notification(notification):
    print("📡 Calling broadcast_notification()")  # เพิ่มตรงนี้
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notifications",
        {
            "type": "send_notification",
            "content": {
                "id": notification.id,
                "message": notification.message,
                "read": notification.read,
                "timestamp": str(notification.timestamp),
            },
        },
    )
    print("📤 group_send called")
