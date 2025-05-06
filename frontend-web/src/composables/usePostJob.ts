import { apiClient } from "@/utils/constants";

interface JobInput {
  title: string;
  description: string;
  tech_stack: string;
  salary: number | null;
}

export function usePostJob() {
  const postJob = async (job: JobInput): Promise<boolean> => {
    try {
      await apiClient.post("/jobs/", job);
      return true;
    } catch (err) {
      console.error("Failed to post job:", err);
      return false;
    }
  };
  return { postJob };
}
