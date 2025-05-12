# Dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.prod.txt .
RUN pip install --no-cache-dir -r requirements.prod.txt

COPY . .

ENV DJANGO_SETTINGS_MODULE=quickhire.settings.prod

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "quickhire.asgi:application"]