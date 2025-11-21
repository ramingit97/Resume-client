import { GLOBAL_CONFIG } from "@/global-config";
import { t } from "@/locales/i18n";
import userStore from "@/store/userStore";
import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";
import type { Result } from "#/api";
import { ResultStatus } from "#/enum";

// --- Utility function to retrieve token from the persisted store ---
// Reads the token stored by Zustand's persist middleware from localStorage.
function getAccessTokenFromStorage(): string | undefined {
  try {
    const rawState = localStorage.getItem('userStore');
    if (!rawState) return undefined;
    
    const parsedState = JSON.parse(rawState);
    // Нам нужен accessToken, который хранится внутри state.userToken
    const accessToken = parsedState?.state?.userToken?.accessToken;

    if (typeof accessToken === 'string' && accessToken) {
        return accessToken;
    }
    return undefined;

  } catch (e) {
    console.error("Failed to parse userStore from localStorage:", e);
    return undefined;
  }
}

const axiosInstance = axios.create({
  baseURL: "http://16.171.6.163:5004/",
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 1. ДИНАМИЧЕСКОЕ ЧТЕНИЕ ТОКЕНА ИЗ localStorage
    const token = getAccessTokenFromStorage();

    if (token) {
        // Устанавливаем заголовок Authorization с токеном
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Если токена нет (например, при логине), удаляем заголовок
        delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result<any>>) => {
    if (!res.data) throw new Error(t("sys.api.apiRequestFailed"));
    return res.data;
  },
  (error: AxiosError<Result>) => {
    const { response, message } = error || {};
    const errMsg = response?.data?.message || message || t("sys.api.errorMessage");
    toast.error(errMsg, { position: "top-center" });
    if (response?.status === 401) {
      userStore.getState().actions.clearUserInfoAndToken();
    }
    return Promise.reject(error);
  },
);

class APIClient {
  get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
  delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return axiosInstance.request<any, T>(config);
  }
}

export default new APIClient();
