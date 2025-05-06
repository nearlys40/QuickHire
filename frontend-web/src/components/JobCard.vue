<template>
  <div class="bg-white rounded shadow p-4">
    <h2 class="text-lg font-semibold">{{ job.title }}</h2>
    <p class="text-sm text-gray-600">{{ job.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Job } from "@/types/job";
const props = defineProps<{ job: Job }>();
</script>
