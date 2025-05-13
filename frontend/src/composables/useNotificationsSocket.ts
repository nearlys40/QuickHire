import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import type { Notification } from "@/types/Notification";
import { ensureValidAccessToken } from "@/composables/useJwtAuth";

const socket = ref<WebSocket | null>(null);
const notifications = ref<Notification[]>([]);
const unreadCount = ref(0);
const isConnecting = ref(false);

const toast = useToast();
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

export function useNotificationsSocket() {
  const connect = async () => {
    if (isConnecting.value || socket.value) return;

    isConnecting.value = true;

    const token = await ensureValidAccessToken();
    if (!token) {
      console.warn("[WebSocket] Cannot connect: No valid token");
      isConnecting.value = false;
      return;
    }

    const wsBaseUrl = import.meta.env.VITE_WS_URL || "ws://localhost:8000";
    const protocol = wsBaseUrl.startsWith("https") ? "wss" : "ws";
    const wsUrl = `${protocol}://${wsBaseUrl.replace(
      /^https?:\/\//,
      ""
    )}/ws/notifications/?token=${token}`;

    const ws = new WebSocket(wsUrl);
    socket.value = ws;

    ws.onopen = () => {
      console.log("[WebSocket] Connected");
      isConnecting.value = false;
    };

    ws.onmessage = (event) => {
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

    ws.onclose = () => {
      console.warn("[WebSocket] Disconnected. Reconnecting...");
      socket.value = null;
      isConnecting.value = false;

      if (!reconnectTimer) {
        reconnectTimer = setTimeout(() => {
          reconnectTimer = null;
          connect();
        }, 3000);
      }
    };

    ws.onerror = (err) => {
      console.error("[WebSocket] Error:", err);
      ws.close(); // force reconnect
    };
  };

  const disconnect = () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    socket.value?.close();
    socket.value = null;
    isConnecting.value = false;
  };

  onMounted(connect);
  onUnmounted(disconnect);

  return {
    notifications,
    unreadCount,
    socket,
    isConnecting,
    reconnect: connect,
    disconnect,
  };
}
