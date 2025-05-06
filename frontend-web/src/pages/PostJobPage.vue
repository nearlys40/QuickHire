<template>
  <div class="max-w-xl mx-auto p-8">
    <h1 class="text-2xl font-bold mb-6">Post a New Job</h1>
    <form @submit.prevent="submit">
      <div class="space-y-4">
        <input
          v-model="title"
          type="text"
          placeholder="Job Title"
          class="w-full px-3 py-2 border border-gray-300 rounded text-base"
        />
        <textarea
          v-model="description"
          placeholder="Description"
          class="w-full px-3 py-2 border border-gray-300 rounded text-base"
        ></textarea>
        <input
          v-model="tech_stack"
          type="text"
          placeholder="Tech Stack"
          class="w-full px-3 py-2 border border-gray-300 rounded text-base"
        />
        <input
          v-model.number="salary"
          type="number"
          placeholder="Salary"
          class="w-full px-3 py-2 border border-gray-300 rounded text-base"
        />
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Post Job
        </button>
        <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePostJob } from "@/composables/usePostJob";
import { useToast } from "vue-toastification";

const title = ref("");
const description = ref("");
const tech_stack = ref("");
const salary = ref<number | null>(null);
const error = ref("");

const router = useRouter();
const { postJob } = usePostJob();
const toast = useToast();

const submit = async () => {
  error.value = "";
  if (
    !title.value ||
    !description.value ||
    !tech_stack.value ||
    salary.value === null
  ) {
    error.value = "All fields are required.";
    return;
  }
  const success = await postJob({
    title: title.value,
    description: description.value,
    tech_stack: tech_stack.value,
    salary: salary.value,
  });
  if (success) {
    toast.success("✅ Job posted successfully");
    router.push("/dashboard");
  } else {
    toast.error("❌ Failed to post job");
  }
};
</script>
