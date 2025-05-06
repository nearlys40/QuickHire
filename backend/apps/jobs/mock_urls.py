from django.urls import path
from .mock_views import MockJobListView

urlpatterns = [
    path('', MockJobListView.as_view(), name='mock-jobs')
]
