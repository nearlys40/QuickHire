from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'message', 'read', 'timestamp')
    list_filter = ('read', 'timestamp')
    search_fields = ('message', 'recipient__username')
