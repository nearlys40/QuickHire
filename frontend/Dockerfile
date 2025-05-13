# Step 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

# ติดตั้ง dependencies และ build ไฟล์ static
RUN npm ci && npm run build

# Step 2: Serve static files
FROM nginx:alpine AS production

# ลบ default config ของ nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config
COPY nginx.conf /etc/nginx/conf.d

# Copy static files จากขั้น build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
