import { useState, useCallback, useRef, useEffect } from 'react';

interface OperationOptions<T, Args extends any[]> {
  onSuccess?: (data: T, ...args: Args) => void;
  onError?: (error: Error) => void;
  autoResetError?: boolean;
}

/**
 * Hook utilitario para gestionar el ciclo de vida de una operación asíncrona.
 * Centraliza los estados de 'loading' y 'error', reduciendo el boilerplate en los hooks de módulo.
 * 
 * NOTA DE ESTABILIDAD: Utiliza useRef para que la función 'execute' sea estable y no
 * provoque bucles infinitos cuando se usa como dependencia en useEffect.
 */
export function useOperation<T, Args extends any[]>(
  operation: (...args: Args) => Promise<T>,
  options: OperationOptions<T, Args> = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mantenemos referencias actualizadas para no requerir recrear el useCallback
  const opRef = useRef(operation);
  const optionsRef = useRef(options);

  useEffect(() => {
    opRef.current = operation;
    optionsRef.current = options;
  }, [operation, options]);

  const execute = useCallback(async (...args: Args): Promise<T | undefined> => {
    setLoading(true);
    
    if (optionsRef.current.autoResetError !== false) {
      setError(null);
    }

    try {
      const result = await opRef.current(...args);
      optionsRef.current.onSuccess?.(result, ...args);
      return result;
    } catch (err: any) {
      const message = err.message || 'Ocurrió un error inesperado';
      setError(message);
      optionsRef.current.onError?.(err);
      return undefined;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependencias vacías para estabilidad total

  const clearError = useCallback(() => setError(null), []);

  return {
    execute,
    loading,
    error,
    setError,
    clearError
  };
}
