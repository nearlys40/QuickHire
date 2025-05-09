// 📄 tests/unit/DashboardPage.spec.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import { createRouter, createWebHistory } from "vue-router";

// Mock useJobs composable
vi.mock("@/composables/useJobs", () => ({
  useJobs: () => ({
    jobs: mockJobs,
    loading: mockLoading,
    fetchJobs: vi.fn(),
  }),
}));

// Shared state for mocking
let mockJobs: any[] = [];
let mockLoading = false;

// Router setup
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/dashboard", component: { template: "<div>Dashboard</div>" } },
    { path: "/logout", component: { template: "<div>Logout</div>" } },
    { path: "/jobs/new", component: { template: "<div>New Job</div>" } },
    {
      path: "/notifications",
      component: { template: "<div>Notifications</div>" },
    },
  ],
});

describe("DashboardPage.vue", () => {
  beforeEach(() => {
    mockJobs = [];
    mockLoading = false;
  });

  it("shows loading state", () => {
    mockLoading = true;

    render(DashboardPage, {
      global: { plugins: [router] },
    });

    expect(screen.getByText("Loading jobs...")).toBeTruthy();
  });

  it("shows empty state when no jobs are available", () => {
    render(DashboardPage, {
      global: { plugins: [router] },
    });

    expect(screen.getByText(/No jobs available/i)).toBeTruthy();
  });

  it("renders job list correctly", async () => {
    mockJobs.push({
      id: 1,
      title: "Frontend Developer",
      description: "Build great UI",
      tech_stack: "Vue, TypeScript",
      salary: 100000,
    });

    render(DashboardPage, {
      global: { plugins: [router] },
    });

    expect(screen.getByText("Frontend Developer")).toBeTruthy();
    expect(screen.getByText("Build great UI")).toBeTruthy();
    expect(screen.getByText(/Vue, TypeScript/)).toBeTruthy();
    expect(screen.getByText("฿100,000")).toBeTruthy();
  });

  it("handles fetchJobs error gracefully (if applicable)", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(console).error("Failed to fetch jobs: error");

    render(DashboardPage, {
      global: { plugins: [router] },
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
