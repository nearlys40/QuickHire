import type { App } from "vue";
import { createAuthService } from "@/services/auth.service";

export function installPlugins(app: App) {
  const authService = createAuthService();
  app.provide("auth", authService);
}
