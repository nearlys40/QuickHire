<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Available Jobs</h1>
        <router-link
          to="/jobs/new"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Post Job
        </router-link>
      </div>

      <div v-if="loading" class="text-gray-500">Loading jobs...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useJobs } from "@/composables/useJobs";
import Sidebar from "@/components/Sidebar.vue";
import JobCard from "@/components/JobCard.vue";

const { jobs, loading, fetchJobs } = useJobs();

onMounted(fetchJobs);
</script>
