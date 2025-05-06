from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from datetime import datetime

class MockRegisterView(APIView):
    # permission_classes = [AllowAny]
    fake_user_id = 99

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not all([username, email, password]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        MockRegisterView.fake_user_id += 1

        return Response({
            "id": MockRegisterView.fake_user_id,
            "username": username,
            "email": email,
            "role": request.data.get("role", "developer"),
            "created_at": datetime.utcnow().isoformat() + "Z"
        })