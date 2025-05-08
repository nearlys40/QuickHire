export function isJwtExpired(token: string): boolean {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (e) {
    return true;
  }
}

export async function ensureValidAccessToken(): Promise<string | null> {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!accessToken || !refreshToken) return null;

  const isExpired = isJwtExpired(accessToken);
  if (!isExpired) return accessToken;

  try {
    const res = await fetch("http://localhost:8000/api/users/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await res.json();
    if (data.access) {
      localStorage.setItem("access_token", data.access);
      return data.access;
    }
  } catch (err) {
    console.error("🔒 Token refresh failed", err);
  }

  return null;
}
