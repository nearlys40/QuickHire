import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import UntypedToken
from jwt import decode as jwt_decode
from django.conf import settings
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async

User = get_user_model()

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # raise Exception("☠️ FORCE ERROR: connect() ถูกเรียกแล้ว")

        print("📞 WS connecting...")
        token = self.scope["query_string"].decode().split('=')[-1]

        try:
            UntypedToken(token)
            payload = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            self.scope["user"] = await self.get_user(payload["user_id"])
        except Exception as e:
            print("❌ Token validation failed:", e)
            await self.close()
            return

        await self.channel_layer.group_add("notifications", self.channel_name)
        print("🎯 Joined group: notifications")
        await self.accept()
        print("✅ WebSocket connected:", self.scope['user'])  # <— ต้องเห็น

    async def disconnect(self, code):
        await self.channel_layer.group_discard("notifications", self.channel_name)

    async def send_notification(self, event):
        print("📨 Sending WebSocket:", event["content"])  # ✅ debug log
        await self.send(text_data=json.dumps(event["content"]))

    @sync_to_async
    def get_user(self, user_id):
        return User.objects.get(id=user_id)
