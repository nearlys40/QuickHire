from .base import *
import os
import dj_database_url

DEBUG = False

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

DATABASES = {
    "default": dj_database_url.parse(
        os.environ.get("POSTGRES_URL"),
        conn_max_age=600,
        ssl_require=True
    )
}

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [REDIS_URL],
        },
    },
}

CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:8081", 
    "https://quickhire-frontend-production.up.railway.app:8080",
]