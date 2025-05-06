from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.notifications.tasks import send_notification

class NotificationTriggerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = request.data.get("message", "Hello")
        send_notification.delay(request.user.id, message)
        return Response({"status": "notification triggered"})