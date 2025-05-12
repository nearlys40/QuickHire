import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from "vue-router";
import { apiClient } from "@/utils/constants";

// 👇 dummy component สำหรับ route ที่ไม่มีหน้าแสดงจริง
const DummyComponent = { template: "<div></div>" };

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/pages/DashboardPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/jobs/new",
    name: "PostJob",
    component: () => import("@/pages/PostJobPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("@/pages/NotificationsPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/logout",
    name: "Logout",
    component: DummyComponent, // 🔧 ต้องมี component
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      next("/login");
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Navigation Guard พร้อม refresh token support
router.beforeEach(async (to, _from, next) => {
  const token = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");

  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else if (refresh) {
      try {
        const res = await apiClient.post("/users/token/refresh/", { refresh });
        const newAccess = res.data.access;
        localStorage.setItem("access_token", newAccess);
        next();
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        next("/login");
      }
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
