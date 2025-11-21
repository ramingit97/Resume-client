import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import userService, { type SignInReq } from "@/api/services/userService";

import { toast } from "sonner";
import type { UserInfo, UserToken } from "#/entity";
import { StorageEnum } from "#/enum";

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;

  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: {},
      userToken: {},
      actions: {
        setUserInfo: (userInfo) => {
          set({ userInfo });
        },
        setUserToken: (userToken) => {
          set({ userToken });
        },
        clearUserInfoAndToken() {
          set({ userInfo: {}, userToken: {} });
        },
      },
    }),
    {
      name: "userStore", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        [StorageEnum.UserInfo]: state.userInfo,
        [StorageEnum.UserToken]: state.userToken,
      }),
    },
  ),
);

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermissions = () => useUserStore((state) => state.userInfo.permissions || []);
export const useUserRoles = () => useUserStore((state) => state.userInfo.roles || []);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: userService.signin,
  });

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);

      // ДЕСТРУКТУРИРУЕМ ПОЛЯ ИЗ БЭКЕНДА (snake_case)
      const { user, access_token, refresh_token } = res as any; 
      
      // Сохраняем в хранилище (store ожидает camelCase)
      setUserToken({ accessToken: access_token, refreshToken: refresh_token });
      setUserInfo(user);
      
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-center",
      });
      throw err;
    }
  };

  return signIn;
};


export const useSignUp = () => {
  const { setUserToken, setUserInfo } = useUserActions();

  const signUpMutation = useMutation({
    mutationFn: userService.signup, // ожидаем payload {name,email,password}
  });

  const signUp = async (data: { name: string; email: string; password: string }) => {
    try {
      const res = await signUpMutation.mutateAsync(data);

      // Если бэк возвращает токены, можем сразу залогинить
      const { user, access_token, refresh_token } = res as any;

      if (access_token && refresh_token && user) {
        setUserToken({ accessToken: access_token, refreshToken: refresh_token });
        setUserInfo(user);
      }

      toast.success("Регистрация прошла успешно!", { position: "top-center" });
      return res;
    } catch (err: any) {
      toast.error(err.message || "Ошибка при регистрации", { position: "top-center" });
      throw err;
    }
  };

  return signUp;
};

export default useUserStore;
