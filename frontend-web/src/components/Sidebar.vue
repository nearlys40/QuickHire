<template>
  <aside class="w-64 bg-white shadow p-6">
    <h2 class="text-xl font-semibold mb-6">QuickHire</h2>
    <nav class="space-y-4">
      <router-link
        to="/dashboard"
        class="block text-gray-700 hover:text-blue-600"
        >Dashboard</router-link
      >
      <router-link
        to="/logout"
        class="block text-sm text-red-600 hover:underline"
        >Logout</router-link
      >
    </nav>
  </aside>
</template>
