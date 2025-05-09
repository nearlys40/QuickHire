<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <form
      @submit.prevent="handleLogin"
      class="bg-white p-6 rounded shadow w-80"
    >
      <h2 class="text-xl font-semibold mb-4">Login</h2>
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="border rounded px-3 py-2 w-full mb-3"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border rounded px-3 py-2 w-full mb-4"
      />
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
      <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from "@/composables/useLogin";
const { username, password, error, handleLogin } = useLogin();
</script>
