# 1. ใช้ base image
FROM python:3.12-slim

# 2. Set working directory
WORKDIR /app

# 3. Copy requirements และติดตั้ง package
COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy โค้ดทั้งหมดเข้ามา
COPY backend/ .

# 5. Expose port
EXPOSE 8000

# 6. Run ด้วย daphne สำหรับ ASGI
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "quickhire.asgi:application"]
