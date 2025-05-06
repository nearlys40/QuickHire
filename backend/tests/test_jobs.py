import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_job_mock_list():
    user = User.objects.create_user(
        username="jam",
        email="jam@quickhire.com",
        password="Aotz0896498310#"
    )
    client = APIClient()
    client.force_authenticate(user=user)

    response = client.get("/api/jobs/mock/")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
