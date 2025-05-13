function decodePayload(token: string) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(decodeURIComponent(escape(atob(payload))));
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string): boolean {
  const payload = decodePayload(token);
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

let isRefreshing = false;

export async function ensureValidAccessToken(): Promise<string | null> {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!accessToken || !refreshToken) return null;
  if (!isJwtExpired(accessToken)) return accessToken;

  if (isRefreshing) return null;
  isRefreshing = true;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/token/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (!response.ok) throw new Error("Token refresh failed");

    const data = await response.json();
    if (data.access) {
      localStorage.setItem("access_token", data.access);
      return data.access;
    }
  } catch (err) {
    console.error("🔒 Token refresh failed", err);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  } finally {
    isRefreshing = false;
  }

  return null;
}
