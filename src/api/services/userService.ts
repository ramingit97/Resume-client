import apiClient from "../apiClient";

import type { UserInfo, UserToken } from "#/entity";

// DTO обновлен: используем email для входа
export interface SignInReq {
  email: string; // Изменено с 'username' на 'email'
  password: string;
}

export interface SignUpReq extends SignInReq {
  name: string; // Добавляем обратно username, если нужен для регистрации
  email: string;
}
// Тип ответа соответствует вашему бэкенду: токены + объект пользователя
export type SignInRes = UserToken & { user: UserInfo };

export enum UserApi {
  // Обновлен endpoint для логина
  SignIn = "/user/login", 
  SignUp = "/user/register",
  Logout = "/auth/logout",
  Refresh = "/auth/refresh",
  User = "/user",
  Me = "/user/me",
  Update = "/user/profile"
}

const signin = (data: SignInReq) => apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
const signup = (data: SignUpReq) => apiClient.post<SignInRes>({ url: UserApi.SignUp, data });
const logout = () => apiClient.get({ url: UserApi.Logout });
const findById = (id: string) => apiClient.get<UserInfo[]>({ url: `${UserApi.User}/${id}` });


const getMe = () => apiClient.get<any>({ url: UserApi.Me });
const update = (data: any) => apiClient.put<any>({ url: UserApi.Update, data });


export default {
  signin,
  signup,
  findById,
  logout,
  getMe,
  update
};
