FROM python:3.12-slim-bullseye
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "quickhire.wsgi:application", "--bind", "0.0.0.0:8000"]

# 🐳 docker-compose.yml (backend/docker/docker-compose.yml)
version: '3.9'
services:
  web:
    build: .
    container_name: quickhire_web
    command: gunicorn quickhire.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - ..:/app
    ports:
      - "8000:8000"
    env_file:
      - ../.env.dev
    depends_on:
      - db
      - rabbitmq

  db:
    image: postgres:13
    container_name: quickhire_db
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      POSTGRES_DB: quickhire
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres

  rabbitmq:
    image: rabbitmq:3-management
    container_name: quickhire_rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"

  celery:
    build: .
    container_name: quickhire_celery
    command: celery -A quickhire worker -l info
    volumes:
      - ..:/app
    env_file:
      - ../.env.dev
    depends_on:
      - web
      - rabbitmq

  celery-beat:
    build: .
    container_name: quickhire_beat
    command: celery -A quickhire beat -l info
    volumes:
      - ..:/app
    env_file:
      - ../.env.dev
    depends_on:
      - web
      - rabbitmq

volumes:
  postgres_data: