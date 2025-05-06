from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

class MockPaymentView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        amount = request.data.get("amount")

        if not amount or float(amount) <= 0:
            return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "status": "success",
            "amount": float(amount),
            "transaction_id": "MOCK-202504301234"
        })