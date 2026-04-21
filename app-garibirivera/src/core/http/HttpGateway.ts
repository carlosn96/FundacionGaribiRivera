import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/core/constants';

type ObjectLike = Record<string, unknown>;
type RequestData = ObjectLike | FormData | string | null | undefined;
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

/**
 * Contrato mínimo para dependencias HTTP en infraestructura.
 */
export interface HttpGateway {
  get<T = any>(url: string, params?: RequestData, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T>;
  request<T = any>(
    method: HttpMethod,
    url: string,
    data?: RequestData,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

interface ApiEnvelope<T = any> {
  ok: boolean;
  data: T;
  message: string;
  status: number;
  details?: any;
}

function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toFieldErrors(value: unknown): Record<string, string[]> | null {
  if (!isObjectLike(value)) return null;

  const normalized: Record<string, string[]> = {};

  for (const [key, item] of Object.entries(value)) {
    if (typeof item === 'string') {
      normalized[key] = [item];
      continue;
    }

    if (Array.isArray(item)) {
      const messages = item.filter((entry): entry is string => typeof entry === 'string');
      if (messages.length > 0) {
        normalized[key] = messages;
      }
    }
  }

  return Object.keys(normalized).length > 0 ? normalized : null;
}

function firstFieldErrorMessage(fieldErrors: Record<string, string[]> | null): string | null {
  if (!fieldErrors) return null;
  const key = Object.keys(fieldErrors)[0];
  if (!key) return null;
  return fieldErrors[key]?.[0] ?? null;
}

const transport = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

transport.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Backend invalido sesion
    }
    return Promise.reject(error);
  }
);

function toApiEnvelope<T>(response: any): ApiEnvelope<T> {
  const resData = response.data || {};
  const unpackedData = resData.data !== undefined ? resData.data : resData;

  return {
    ok: true,
    data: unpackedData as T,
    message: resData.message || resData.mensaje || 'Operación exitosa',
    status: response.status,
    details: resData.details || resData.errors || null,
  };
}

function toApiErrorEnvelope<T>(error: AxiosError<any>): ApiEnvelope<T> {
  const resData = error.response?.data || {};
  const fieldErrors = toFieldErrors(resData);
  const fallbackMessage = firstFieldErrorMessage(fieldErrors);

  return {
    ok: false,
    data: (resData.data || {}) as T,
    message: resData.message || resData.mensaje || fallbackMessage || error.message || 'Error de conexion',
    status: error.response?.status || 500,
    details: resData.details || resData.errors || fieldErrors || null,
  };
}

function unwrap<T>(envelope: ApiEnvelope<T>): T {
  if (!envelope.ok) {
    const appError = new Error(envelope.message || 'Error en la peticion');
    (appError as any).status = envelope.status;
    (appError as any).details = envelope.details;
    throw appError;
  }

  const data = envelope.data;

  if (data && typeof data === 'object') {
    Object.defineProperty(data, 'message', {
      value: envelope.message,
      enumerable: false, 
      writable: true
    });
    return data as T;
  }

  if (data === null || data === undefined) {
    return { message: envelope.message } as unknown as T;
  }

  return data;
}

async function requestEnvelope<T = any>(
  method: HttpMethod,
  url: string,
  data?: RequestData,
  config: AxiosRequestConfig = {}
): Promise<ApiEnvelope<T>> {
  try {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method,
      url,
      ...(method === 'get' || method === 'delete' ? { params: data } : { data }),
    };

    const response = await transport.request(requestConfig);
    return toApiEnvelope<T>(response);
  } catch (error: any) {
    return toApiErrorEnvelope<T>(error as AxiosError<any>);
  }
}

export const httpGateway: HttpGateway = {
  async get<T = any>(url: string, params?: RequestData, config?: AxiosRequestConfig): Promise<T> {
    return unwrap(await requestEnvelope<T>('get', url, params, config));
  },

  async post<T = any>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T> {
    return unwrap(await requestEnvelope<T>('post', url, data, config));
  },

  async put<T = any>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T> {
    return unwrap(await requestEnvelope<T>('put', url, data, config));
  },

  async delete<T = any>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T> {
    return unwrap(await requestEnvelope<T>('delete', url, data, config));
  },

  async request<T = any>(
    method: HttpMethod,
    url: string,
    data?: RequestData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return unwrap(await requestEnvelope<T>(method, url, data, config));
  },
};
