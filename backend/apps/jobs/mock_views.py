from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class MockJobListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response([
            {
                "id": 1,
                "title": "Senior Backend Developer",
                "description": "Build scalable backend systems",
                "tech_stack": "Django, PostgreSQL",
                "salary": 120000,
                "posted_by": 1
            }
        ])
