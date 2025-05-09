import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import LoginPage from "@/pages/LoginPage.vue";

describe("LoginPage.vue", () => {
  it("renders login form with fields", () => {
    render(LoginPage);

    expect(screen.getByText("Login")).toBeTruthy();
    expect(screen.getByPlaceholderText(/username/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/password/i)).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();
  });
});
