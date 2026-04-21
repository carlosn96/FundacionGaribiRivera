/**
 * @fileoverview Servicios de Linea Base.
 */

import { LineaBaseDataExistsResponse } from '@/modules/emprendedor/linea-base/domain/models/lineaBaseSections';
import { LineaBaseSchema } from '@/modules/emprendedor/linea-base/domain/models/lineaBaseSections';
import { clearSingleFlightCache, singleFlightWithTtl } from '@/core/utils/singleFlight';
import { lineaBaseRepository } from '@/modules/emprendedor/linea-base/infrastructure/api/LineaBaseRepository';

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
    try {
      const payload = await lineaBaseRepository.getLineaBase();

      // Verificamos si realmente hay datos de la línea base
      const parsed = LineaBaseSchema.safeParse(payload);
      if (!parsed.success) {
        console.warn('Invalid linea base payload received:', parsed.error.issues);
        return {
          ok: true,
          success: true,
          exists: false,
          lineaBase: null,
          message: 'Datos de línea base inválidos o imcompletos.',
        };
      }

      return {
        ok: true,
        success: true,
        exists: true,
        lineaBase: parsed.data,
        message: 'Línea base encontrada.',
      };
    } catch (err: any) {
      // Si la petición falla (ej: 404 No Content), asumimos que no existe
      return {
        ok: true,
        success: true,
        exists: false,
        lineaBase: null,
        message: err.message || 'No existe línea base para el usuario actual.',
      };
    }
  }, 3000);
}

export async function recuperarCatalogosLineaBase(): Promise<CatalogosResponse | []> {
  return singleFlightWithTtl<CatalogosResponse | []>('lineaBase:catalogos', async () => {
    try {
      return await lineaBaseRepository.getCatalogos();
    } catch (err: any) {
      console.warn('Error al recuperar catálogos:', err.message);
      return [];
    }
  }, 5000);
}

/**
 * Guarda la información de línea base
 * @param data Los datos del formulario de línea base
 * @returns Una promesa que se resuelve con la respuesta de guardado
 */
export async function guardarLineaBase(data: GenericMap): Promise<GenericMap> {
  try {
    const resPayload = await lineaBaseRepository.guardar(data);
    clearSingleFlightCache('lineaBase:');
    return resPayload;
  } catch (err: any) {
    let errorMessage = err.message || 'Error al guardar la línea base.';
    
    // El gateway ya aplano los detalles en err.details
    if (err.details && typeof err.details === 'object') {
       const errorDetails = Object.entries(err.details)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
          .join(' | ');
        errorMessage += ` (${errorDetails})`;
    }
    throw new Error(errorMessage);
  }
}

export async function buscarCodigoPostalPorId(codigoId: string): Promise<GenericMap | null> {
  return singleFlightWithTtl<GenericMap | null>(`lineaBase:cp:${codigoId}`, async () => {
    try {
      return await lineaBaseRepository.getCodigoPostalById(codigoId);
    } catch (err: any) {
      return null;
    }
  }, 10000);
}


export async function buscarCodigosPostales(query: string, perPage: number = 200): Promise<CatalogOption[]> {
  const key = `lineaBase:cps:${query.trim().toLowerCase()}:${perPage}`;
  return singleFlightWithTtl<CatalogOption[]>(key, async () => {
    try {
      const items = await lineaBaseRepository.searchCodigosPostales(query, perPage);
      
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
    } catch (err: any) {
      return [];
    }
  }, 1500);
}

export async function buscarComunidadesParroquiales(query: string, perPage: number = 200): Promise<CatalogOption[]> {
  const key = `lineaBase:comunidades:${query.trim().toLowerCase()}:${perPage}`;
  return singleFlightWithTtl<CatalogOption[]>(key, async () => {
    try {
      const items = await lineaBaseRepository.searchComunidadesParroquiales(query, perPage);
      
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
    } catch (err: any) {
      return [];
    }
  }, 1500);
}
