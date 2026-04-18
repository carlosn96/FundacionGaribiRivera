import { http } from '@/core/http/ApiHttpClient';
import { ApiResponse } from '@/core/http/ApiResponse';

/**
 * Clase base para la capa de infraestructura (Repositores).
 * Proporciona métodos estandarizados para peticiones HTTP y manejo de errores.
 */
export abstract class BaseRepository {
  /**
   * Prefijo de ruta base para el recurso.
   */
  protected abstract readonly prefix: string;

  /**
   * Ejecuta una petición GET.
   */
  protected async doGet<T>(path: string = '', params?: any): Promise<T> {
    const url = this.buildUrl(path);
    const response = await http.get<T>(url, params);
    return this.handleResponse(response);
  }

  /**
   * Ejecuta una petición POST.
   */
  protected async doPost<T>(path: string = '', data?: any): Promise<T> {
    const url = this.buildUrl(path);
    const response = await http.post<T>(url, data);
    return this.handleResponse(response);
  }

  /**
   * Ejecuta una petición PUT.
   */
  protected async doPut<T>(path: string = '', data?: any): Promise<T> {
    const url = this.buildUrl(path);
    const response = await http.put<T>(url, data);
    return this.handleResponse(response);
  }

  /**
   * Ejecuta una petición DELETE.
   */
  protected async doDelete<T>(path: string = ''): Promise<T> {
    const url = this.buildUrl(path);
    const response = await http.delete<T>(url);
    return this.handleResponse(response);
  }

  /**
   * Construye la URL completa uniendo el prefijo y el path opcional.
   * Resuelve el problema de barras dobles o faltantes.
   */
  private buildUrl(path: string): string {
    const cleanPrefix = this.prefix.replace(/^\/+|\/+$/g, '');
    const cleanPath = path.replace(/^\/+|\/+$/g, '');
    
    // Si no hay path, retornamos solo el prefijo
    if (!cleanPath) return cleanPrefix;
    
    // Si no hay prefijo (repositorio raíz), retornamos solo el path
    if (!cleanPrefix) return cleanPath;

    return `${cleanPrefix}/${cleanPath}`;
  }

  /**
   * Despaqueta la respuesta y lanza error si la operación falló.
   */
  private handleResponse<T>(response: ApiResponse<T>): T {
    if (!response.ok) {
      // Lanzamos el error para que sea capturado por los hooks (useOperation o try/catch)
      throw new Error(response.message || 'Error en la comunicación con el servidor');
    }

    // Aplanamos el objeto eliminando la metadata de BaseResponse para el consumidor
    const { ok, success, message, status, details, ...data } = response as any;
    
    // Si el payload original era un array, 'data' contendrá las propiedades del array
    // pero ApiResponse lo trata de forma especial en ApiHttpClient.
    // Retornamos el payload tal cual, el tipado se encarga del resto.
    return response as unknown as T;
  }
}
