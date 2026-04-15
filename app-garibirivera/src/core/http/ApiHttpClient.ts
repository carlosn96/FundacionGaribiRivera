import axios from 'axios';
import { API_BASE_URL } from '@/core/constants';
import { ApiResponse } from './ApiResponse';

/**
 * Cliente Axios base con configuración por defecto e interceptores fundamentales.
 */
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Backend invalidó sesión
    }
    return Promise.reject(error);
  }
);

type ObjectLike = Record<string, unknown>;
type RequestData = ObjectLike | FormData | string | null | undefined;

/**
 * Helper genérico para realizar peticiones y aplanar la respuesta del servidor (ApiResponse de Lumen)
 */
async function apiRequest<T = unknown>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: RequestData
): Promise<ApiResponse<T>> {
  try {
    let response;

    // Tratamos GET y DELETE diferente (usan params en config)
    if (method === 'get' || method === 'delete') {
      response = await httpClient[method](url, {
        params: data
      });
    } else {
      // POST y PUT usan el segundo argumento como body
      response = await httpClient[method](url, data ?? undefined);
    }

    const resData = response.data || {};

    const payload = resData.data ? resData.data : resData;

    if (Array.isArray(payload)) {
      return Object.assign(payload, {
        message: resData.message,
        status: resData.status || response.status,
        success: true,
        ok: true
      }) as unknown as ApiResponse<T>;
    }

    return {
      ...payload,
      message: resData.message,
      status: resData.status || response.status,
      success: true,
      ok: true
    } as ApiResponse<T>;
  } catch (error: unknown) {
    const axiosError = error as {
      response?: {
        data?: ObjectLike & { message?: string; status?: number; data?: ObjectLike };
        status?: number;
      };
    };

    if (axiosError.response && axiosError.response.data) {
      const errData = axiosError.response.data;
      const payload = errData.data ? errData.data : {};
      return {
        ...payload,
        message: errData.message || 'Error del servidor',
        status: errData.status || axiosError.response.status,
        success: false,
        ok: false
      } as ApiResponse<T>;
    }
    return {
      ok: false,
      success: false,
      message: 'Error de conexión con el servidor.'
    } as ApiResponse<T>;
  }
}

/**
 * Interface estandarizada para consumo de API (Micro-framework HTTP).
 */
export const http = {
  get: <T = unknown>(url: string, params?: RequestData) => apiRequest<T>('get', url, params),
  post: <T = unknown>(url: string, data?: RequestData) => apiRequest<T>('post', url, data),
  put: <T = unknown>(url: string, data?: RequestData) => apiRequest<T>('put', url, data),
  delete: <T = unknown>(url: string, data?: RequestData) => apiRequest<T>('delete', url, data),
};
