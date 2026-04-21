import { HttpGateway, httpGateway } from '@/core/http/HttpGateway';
import { AxiosRequestConfig } from 'axios';

/**
 * Clase base para la capa de infraestructura (Repositorios).
 * Implementa el patrón Repository bajo principios SOLID.
 * 
 * Se comporta como una capa delgada que orquestra rutas y delega
 * la comunicacion al gateway HTTP compartido.
 */
export abstract class BaseRepository {
  protected readonly client: HttpGateway = httpGateway;

  /**
   * Prefijo de ruta base para el recurso (definido en subclases).
   */
  protected abstract readonly prefix: string;

  /**
   * Realiza una petición GET relativa al prefijo.
   */
  protected async get<T>(path: string = '', params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get<T>(this.buildUrl(path), params, config);
  }

  /**
   * Realiza una petición POST relativa al prefijo.
   */
  protected async post<T>(path: string = '', data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post<T>(this.buildUrl(path), data, config);
  }

  /**
   * Realiza una petición PUT relativa al prefijo.
   */
  protected async put<T>(path: string = '', data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put<T>(this.buildUrl(path), data, config);
  }

  /**
   * Realiza una petición DELETE relativa al prefijo.
   */
  protected async remove<T>(path: string = '', params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete<T>(this.buildUrl(path), params, config);
  }

  /**
   * Realiza una petición "cruda" fuera del prefijo del repositorio, 
   * pero aprovecha el cliente estandarizado y su manejo de errores.
   */
  protected async raw<T>(
    method: 'get' | 'post' | 'put' | 'delete', 
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.request<T>(method, url, data, config);
  }

  /**
   * Construye la URL completa uniendo el prefijo y el path opcional.
   */
  private buildUrl(path: string): string {
    const cleanPrefix = this.prefix.replace(/^\/+|\/+$/g, '');
    const cleanPath = path.toString().replace(/^\/+|\/+$/g, '');
    
    if (!cleanPath) return cleanPrefix;
    if (!cleanPrefix) return cleanPath;

    return `${cleanPrefix}/${cleanPath}`;
  }
}

