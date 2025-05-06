from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer

class MockPaymentView(generics.CreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')
        transaction = Transaction.objects.create(user=request.user, amount=amount, status='success')
        serializer = self.get_serializer(transaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
