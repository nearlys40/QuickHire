import logging
from django.http import JsonResponse
from django.core.exceptions import PermissionDenied
from django.http import Http404
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class CustomErrorMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        if isinstance(exception, PermissionDenied):
            return JsonResponse({
                "detail": "You do not have permission to perform this action."
            }, status=403)

        if isinstance(exception, Http404):
            return JsonResponse({
                "detail": "The resource was not found."
            }, status=404)

        # Handle 500 or unexpected
        logger.exception("Unhandled exception: %s", exception)
        return JsonResponse({
            "detail": "An unexpected error occurred. Please try again later."
        }, status=500)
