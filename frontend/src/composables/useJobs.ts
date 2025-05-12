import { ref } from "vue";
import axios from "axios";
import type { Job } from "@/types/Job";
import { API_BASE_URL } from "@/utils/constants";

export function useJobs() {
  const jobs = ref<Job[]>([]);
  const loading = ref(true);

  const fetchJobs = async () => {
    loading.value = true;
    try {
      const res = await axios.get(`${API_BASE_URL}/jobs/`);
      const data = res.data;
      jobs.value = Array.isArray(data) ? data : data.jobs || [];
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      loading.value = false;
    }
  };

  return { jobs, loading, fetchJobs };
}
