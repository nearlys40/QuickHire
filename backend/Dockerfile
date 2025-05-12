# Dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.prod.txt .
RUN pip install --upgrade pip && pip install -r requirements.prod.txt

COPY . .

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "quickhire.asgi:application"]