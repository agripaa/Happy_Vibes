import { useMutation } from "@tanstack/react-query";
export function AuthLogout(callback) {
  return useMutation({
    mutationFn: () => {
      return axios.delete(
        `${import.meta.env.VITE_URL_DEV_V2}/${
          import.meta.env.VITE_AUTH
        }/logOut`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      callback({
        navigate: true,
      });
    },
  });
}
