import { apiClient } from "@/utils/constants";

export interface AuthService {
  login(username: string, password: string): Promise<void>;
  logout(): void;
  getToken(): string | null;
}

export function createAuthService(): AuthService {
  return {
    async login(username: string, password: string) {
      const response = await apiClient.post("/users/token/", {
        username,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    getToken() {
      return localStorage.getItem("access_token");
    },
  };
}
