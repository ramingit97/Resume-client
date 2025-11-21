import { useQuery } from "@tanstack/react-query";
import { useUserActions } from "@/store/userStore";
import userService from "@/api/services/userService";
import { toast } from "sonner";

export const useMe = () => {
  const { setUserInfo } = useUserActions();

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const res = await userService.getMe();
        setUserInfo(res); // сохраняем в zustand
        return res;
      } catch (err: any) {
        toast.error(err.message || "Ошибка при загрузке профиля", { position: "top-center" });
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5, // кеш 5 минут
  });
};
