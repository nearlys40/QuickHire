from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from datetime import datetime

class MockNotificationTriggerView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request):
        user = request.user if request.user and request.user.is_authenticated else "anonymous"
        return Response({
            "status": "mock notification triggered",
            "by": str(user),
            "timestamp": datetime.utcnow().isoformat() + "Z"
        })