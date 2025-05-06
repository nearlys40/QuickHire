import pytest
from rest_framework.test import APIClient
from django.urls import reverse

@pytest.mark.django_db
def test_register_user_and_receive_token():
    client = APIClient()
    url = reverse("register")  # หรือใช้ path ตรงๆ: "/api/users/register/"
    payload = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "strongpassword123"
    }

    response = client.post(url, payload, format="json")

    assert response.status_code == 201
    data = response.json()

    assert "access" in data
    assert "refresh" in data
    assert data["user"]["username"] == "testuser"
    assert data["user"]["email"] == "test@example.com"
