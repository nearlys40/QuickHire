<template>
  <div class="max-w-2xl mx-auto p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Notifications</h1>
      <button
        @click="markAllAsRead"
        class="text-sm text-blue-600 hover:underline"
      >
        Mark all as read
      </button>
    </div>
    <ul class="space-y-4">
      <li
        v-for="n in notifications"
        :key="n.id"
        class="p-4 bg-white border rounded shadow cursor-pointer"
        @click="markOneAsRead(n)"
      >
        <div class="flex justify-between items-center">
          <p class="text-base font-medium">{{ n.message }}</p>
          <span
            v-if="!n.read"
            class="text-xs bg-red-500 text-white px-2 py-0.5 rounded"
          >
            NEW
          </span>
        </div>
        <p class="text-sm text-gray-500 mt-1">{{ formatDate(n.timestamp) }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { apiClient } from "@/utils/constants";
import { useNotificationsSocket } from "@/composables/useNotificationsSocket";
import type { Notification } from "@/types/Notification";

const { notifications } = useNotificationsSocket();

const fetchNotifications = async () => {
  try {
    const res = await apiClient.get("/notifications/");
    notifications.value = res.data;
  } catch (err) {
    console.error("Failed to load notifications:", err);
  }
};

const markAllAsRead = async () => {
  try {
    await apiClient.post("/notifications/mark-read/");
    notifications.value.forEach((n) => (n.read = true));
  } catch (err) {
    console.error("Failed to mark notifications as read:", err);
  }
};

const markOneAsRead = async (notification: Notification) => {
  try {
    if (notification.read) return;
    await apiClient.post(`/notifications/${notification.id}/mark-read/`);
    notification.read = true;
  } catch (err) {
    console.error(
      `Failed to mark notification ${notification.id} as read`,
      err
    );
  }
};

onMounted(() => {
  fetchNotifications();
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString();
}
</script>
