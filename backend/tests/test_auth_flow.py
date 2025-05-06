import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse


User = get_user_model()

@pytest.mark.django_db
def test_token_obtain_and_refresh():
    client = APIClient()

    user = User.objects.create_user(
        username="jam",
        email="jam@quickhire.com",
        password="Aotz0896498310#"
    )

    # Obtain token
    response = client.post(reverse("token_obtain_pair"), {
        "username": "jam",
        "password": "Aotz0896498310#"
    }, format="json")

    assert response.status_code == 200
    data = response.json()
    assert "access" in data and "refresh" in data

    # Refresh token
    refresh_token = data["refresh"]
    refresh_response = client.post(reverse("token_refresh"), {
        "refresh": refresh_token
    }, format="json")

    assert refresh_response.status_code == 200
    assert "access" in refresh_response.json()