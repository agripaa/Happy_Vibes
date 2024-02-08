import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";

export function AuthLogin(callback) {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (email, password) => {
      return axios.post(
        `${import.meta.env.VITE_URL_DEV_V2}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      callback({
        data,
        isLogged: false,
        navigate: true,
        isErrorLogin: false,
        message: "",
      });
    },
    onError: (err) => {
      callback({
        data: undefined,
        message: err.message,
        isLogged: false,
        navigate: false,
        isErrorLogin: true,
      });
    },
  });
}
