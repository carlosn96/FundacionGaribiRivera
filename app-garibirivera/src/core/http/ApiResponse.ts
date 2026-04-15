/**
 * Interfaz base para todas las respuestas de la API.
 * Refleja la estructura estandarizada devuelta por el backend y procesada por el helper.
 */
export interface BaseResponse {
  ok: boolean;
  success: boolean;
  message?: string;
  status?: number;
  details?: unknown;
}

/**
 * Contrato de respuesta unificado (payload de datos + BaseResponse).
 * Este es el tipo inferido y estandarizado tras la resoluciÃ³n HTTP.
 */
export type ApiResponse<T = unknown> = T & BaseResponse;
