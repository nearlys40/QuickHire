import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import type { AuthService } from "@/services/auth.service";

export function useLogin() {
  const auth = inject<AuthService>("auth");
  const router = useRouter();

  const username = ref("");
  const password = ref("");
  const error = ref("");

  const handleLogin = async () => {
    if (!auth) return;
    try {
      await auth.login(username.value, password.value);
      router.push("/dashboard");
    } catch (e) {
      error.value = "Login failed";
    }
  };

  return {
    username,
    password,
    error,
    handleLogin,
  };
}
