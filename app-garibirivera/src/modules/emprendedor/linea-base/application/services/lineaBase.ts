/**
 * @fileoverview Servicios de Linea Base.
 */

import {
  LINEA_BASE_ENDPOINTS
} from '../../constants';
import { LineaBaseDataExistsResponse } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBaseSections';
import { LineaBaseSchema } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBaseSections';
import { clearSingleFlightCache, singleFlightWithTtl } from '@/core/utils/singleFlight';

import { http } from '@/core/http/ApiHttpClient';

type GenericMap = Record<string, unknown>;

type CatalogOption = {
  value: string;
  label: string;
  [key: string]: unknown;
};

type CatalogosResponse = GenericMap | GenericMap[];

/**
 * Verifica si existe una línea base para el usuario actual.
 * @returns Una promesa que se resuelve a true si existe la línea base, false en caso contrario.
 */
export async function verificarExisteLineaBase(): Promise<LineaBaseDataExistsResponse> {
  return singleFlightWithTtl<LineaBaseDataExistsResponse>('lineaBase:exists', async () => {
    const res = await http.get<GenericMap>(LINEA_BASE_ENDPOINTS.getLineaBase);

    if (!res.ok) {
      return {
        ok: true,
        success: true,
        exists: false,
        lineaBase: null,
        message: res.message || 'No existe línea base para el usuario actual.',
      };
    }

    const payload = res; // apiRequest ya aplana el data
    
    // Verificamos si realmente hay datos de la línea base (el payload aplanado debería tener campos de la línea base)
    // En el backend, si no existe devuelve 404 o data: null. apiRequest maneja status y ok.
    
    const parsed = LineaBaseSchema.safeParse(payload);
    if (!parsed.success) {
      console.warn('Invalid linea base payload received:', parsed.error.issues);
      return {
        ok: true,
        success: true,
        exists: false,
        lineaBase: null,
        message: res.message || 'Datos de línea base inválidos.',
      };
    }

    return {
      ok: true,
      success: true,
      exists: true,
      lineaBase: parsed.data,
      message: res.message || 'Línea base encontrada.',
    };
  }, 3000);
}

export async function recuperarCatalogosLineaBase(): Promise<CatalogosResponse | []> {
  return singleFlightWithTtl<CatalogosResponse | []>('lineaBase:catalogos', async () => {
    const res = await http.get<CatalogosResponse>(LINEA_BASE_ENDPOINTS.catalogos);
    if (!res.ok) {
      console.warn('Error al recuperar catálogos:', res.message);
      return [];
    }
    // Recordamos que apiRequest ya devuelve el contenido de 'data' aplanado o el objeto completo
    // Si res.ok es true y viene de Laravel success(), res ya es el array de catalogos (porque era res.data)
    return res;
  }, 5000);
}

/**
 * Guarda la información de línea base
 * @param data Los datos del formulario de línea base
 * @returns Una promesa que se resuelve con la respuesta de guardado
 */
export async function guardarLineaBase(data: GenericMap): Promise<GenericMap> {
  const res = await http.post<GenericMap>(LINEA_BASE_ENDPOINTS.guardar, data);

  if (!res.ok) {
    let errorMessage = res.message || 'Error al guardar la línea base.';
    // Los errores de validación de Laravel ahora vendrían en las propiedades de res si apiRequest los aplanó,
    // pero usualmente ApiResponse::error no envía 'data', solo 'message' y opcionalmente 'details'.
    if (res.details && typeof res.details === 'object') {
       const errorDetails = Object.entries(res.details)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
          .join(' | ');
        errorMessage += ` (${errorDetails})`;
    }
    throw new Error(errorMessage);
  }

  clearSingleFlightCache('lineaBase:');
  return res;
}

export async function buscarCodigoPostalPorId(codigoId: string): Promise<GenericMap | null> {
  return singleFlightWithTtl<GenericMap | null>(`lineaBase:cp:${codigoId}`, async () => {
    const url = LINEA_BASE_ENDPOINTS.codigoPostalById.replace('{codigoId}', encodeURIComponent(codigoId));
    const res = await http.get<GenericMap | null>(url);
    if (!res.ok) return null;
    return res;
  }, 10000);
}


export async function buscarCodigosPostales(query: string, perPage: number = 200): Promise<CatalogOption[]> {
  const key = `lineaBase:cps:${query.trim().toLowerCase()}:${perPage}`;
  return singleFlightWithTtl<CatalogOption[]>(key, async () => {
    const url = `${LINEA_BASE_ENDPOINTS.codigosPostalesSearch}?q=${encodeURIComponent(query)}&per_page=${perPage}`;
    const res = await http.get<GenericMap>(url);
    
    if (!res.ok || !res.data) return [];

    const items = res.data as unknown; // En búsquedas paginadas, Laravel suele devolver { data: [...] } dentro de la respuesta de éxito
    if (!Array.isArray(items)) return [];
    
    return items.map((item) => {
      const cp = item as GenericMap;
      const municipio = cp.municipio as GenericMap | undefined;
      const estado = municipio?.estado as GenericMap | undefined;
      return {
        value: String(cp.id_codigo || cp.id),
        label: municipio
          ? `${cp.codigo_postal} - ${cp.colonia}, ${municipio.nombre}, ${estado?.nombre ?? ''}`
          : (cp.colonia ? `${cp.codigo_postal} - ${cp.colonia}` : String(cp.colonia || cp.descripcion || cp.id || '')),
        codigo_postal: cp.codigo_postal,
        colonia: cp.colonia,
        municipio: municipio?.nombre,
        estado: estado?.nombre,
        municipio_id: municipio?.id,
        estado_id: estado?.id,
      } as CatalogOption;
    });
  }, 1500);
}

export async function buscarComunidadesParroquiales(query: string, perPage: number = 200): Promise<CatalogOption[]> {
  const key = `lineaBase:comunidades:${query.trim().toLowerCase()}:${perPage}`;
  return singleFlightWithTtl<CatalogOption[]>(key, async () => {
    const url = `${LINEA_BASE_ENDPOINTS.comunidadesParroquialesSearch}?q=${encodeURIComponent(query)}&per_page=${perPage}`;
    const res = await http.get<GenericMap>(url);
    
    if (!res.ok || !res.data) return [];

    const items = res.data as unknown;
    if (!Array.isArray(items)) return [];
    
    return items.map((item) => {
      const comunidad = item as GenericMap;
      const decanato = comunidad.decanato as GenericMap | undefined;
      const vicaria = decanato?.vicaria as GenericMap | undefined;
      return {
        value: String(comunidad.id_comunidad || comunidad.id),
        label: decanato ? `${comunidad.nombre} - ${decanato.nombre}, ${vicaria?.nombre ?? ''}` : String(comunidad.nombre || ''),
        nombre: comunidad.nombre,
        id_decanato: comunidad.id_decanato,
        decanato: decanato?.nombre,
        id_vicaria: vicaria?.id,
        vicaria: vicaria?.nombre,
      } as CatalogOption;
    });
  }, 1500);
}
