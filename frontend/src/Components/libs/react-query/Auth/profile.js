import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function AuthProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return axios.get(
        `${import.meta.env.VITE_URL_DEV_V2}/${
          import.meta.env.VITE_AUTH
        }/profile`,
        {
          withCredentials: true,
        }
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
