import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/vue";
import LoginPage from "@/pages/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router";

// Mock AuthService
const mockAuth = {
  login: vi.fn(() => Promise.resolve()),
};

// Mock Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/dashboard", component: { template: "<div>Dashboard</div>" } },
  ],
});

describe("LoginPage.vue", () => {
  it("renders login form and handles login", async () => {
    render(LoginPage, {
      global: {
        provide: {
          auth: mockAuth,
        },
        plugins: [router],
      },
    });

    const credentials = {
      username: "jam",
      password: "12345678#",
    };

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /login/i });

    await fireEvent.update(usernameInput, credentials.username);
    await fireEvent.update(passwordInput, credentials.password);
    await fireEvent.click(submitButton);

    expect(mockAuth.login).toHaveBeenCalledWith(
      credentials.username,
      credentials.password
    );
  });

  it("shows error message when login fails", async () => {
    // mock login ให้ throw error
    const failingAuth = {
      login: vi.fn(() => Promise.reject(new Error("Invalid credentials"))),
    };

    render(LoginPage, {
      global: {
        provide: { auth: failingAuth },
        plugins: [router],
      },
    });

    await fireEvent.update(screen.getByPlaceholderText(/username/i), "jam");
    await fireEvent.update(
      screen.getByPlaceholderText(/password/i),
      "wrongpassword"
    );
    await fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // รอ DOM render error
    const error = await screen.findByText("Login failed");
    expect(error).toBeTruthy();
  });
});
