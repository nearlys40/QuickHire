import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quickhire.settings.dev')

app = Celery('quickhire')
app.conf.broker_url = os.getenv("REDIS_URL")
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()