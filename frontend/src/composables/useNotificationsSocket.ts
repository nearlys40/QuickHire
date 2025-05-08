import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import type { Notification } from "@/types/Notification";
import { ensureValidAccessToken } from "@/composables/useJwtAuth";

const socket = ref<WebSocket | null>(null);
const notifications = ref<Notification[]>([]);
const unreadCount = ref(0);

const toast = useToast();

export function useNotificationsSocket() {
  const connect = async () => {
    const token = await ensureValidAccessToken();
    if (!token) {
      console.warn("[WebSocket] Cannot connect: No valid token");
      return;
    }

    const wsUrl = `ws://localhost:8000/ws/notifications/?token=${token}`;
    socket.value = new WebSocket(wsUrl);

    socket.value.onopen = () => {
      console.log("[WebSocket] Connected");
    };

    socket.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.message) {
          notifications.value.unshift(data);
          unreadCount.value += 1;
          toast.info(`🔔 ${data.message}`);
        }
      } catch (err) {
        console.error("[WebSocket] Parse error:", err);
      }
    };

    socket.value.onclose = () => {
      setTimeout(connect, 3000);
    };
  };

  const disconnect = () => {
    socket.value?.close();
    socket.value = null;
  };

  onMounted(connect);
  onUnmounted(disconnect);

  return {
    notifications,
    unreadCount,
    socket,
  };
}
