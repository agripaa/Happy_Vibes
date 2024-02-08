import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export async function AuthProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await axios.get(
        `${import.meta.env.VITE_URL_DEV_V2}/auth/profile`,
        {
          withCredentials: true,
        }
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
