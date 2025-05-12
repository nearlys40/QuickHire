<template>
  <div class="p-6 bg-white border rounded shadow hover:shadow-md transition">
    <h2 class="text-lg font-semibold text-gray-800">{{ job.title }}</h2>
    <p class="mt-1 text-sm text-gray-600">{{ job.description }}</p>
    <p class="mt-2 text-sm">
      <strong>Tech Stack:</strong> {{ job.tech_stack }}
    </p>
    <p class="text-sm">
      <strong>Salary:</strong> ฿{{ job.salary?.toLocaleString() }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Job } from "@/types/Job";
defineProps<{ job: Job }>();
</script>
