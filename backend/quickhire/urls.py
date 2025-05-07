from django.contrib import admin
from django.urls import path, include
from quickhire import schema

from django.http import JsonResponse

def asgi_debug_view(request):
    return JsonResponse({
        "scope_type": getattr(request, 'scope', {}).get('type', 'UNKNOWN'),
        "asgi_application": getattr(request, 'asgi_version', 'Not ASGI'),
    })

urlpatterns = [
    path('admin/', admin.site.urls),

    # Swagger UI
    *schema.urlpatterns,  # 👈 เพิ่มเข้า urlpatterns

    # Mock API for testing purposes
    path('api/jobs/mock/', include('apps.jobs.mock_urls')),
    path('api/users/mock/', include('apps.users.mock_urls')),
    path('api/payments/mock/', include('apps.payments.mock_urls')),
    path('api/notifications/mock/', include('apps.notifications.mock_urls')),

    path('api/users/', include('apps.users.urls')),
    path('api/jobs/', include('apps.jobs.urls')),
    path('api/payments/', include('apps.payments.urls')),
    path('api/notifications/', include('apps.notifications.urls')),

    path("asgi-test/", asgi_debug_view),
]