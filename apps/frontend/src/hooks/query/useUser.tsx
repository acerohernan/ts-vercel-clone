import { API } from "@/api";
import { IUser } from "@/api/user/types";
import { useQuery } from "@tanstack/react-query";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await API.user.getUser();
        return response.data.user as IUser;
      } catch (error) {
        throw error;
      }
    },
    retry: 1,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryOnMount: false,
  });
