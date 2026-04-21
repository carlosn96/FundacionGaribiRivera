import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface OperationOptions<T, Args extends any[]> {
  onSuccess?: (data: T, ...args: Args) => void;
  onError?: (error: Error) => void;
  autoResetError?: boolean;
  successMessage?: string | ((data: T) => string);
  errorMessage?: string;
  showToast?: boolean;
}

/**
 * Hook utilitario para gestionar el ciclo de vida de una operación asíncrona.
 * Centraliza los estados de 'loading' y 'error', y proporciona feedback proactivo
 * mediante el sistema de notificaciones institucional.
 */
export function useOperation<T, Args extends any[]>(
  operation: (...args: Args) => Promise<T>,
  options: OperationOptions<T, Args> = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      
      // Feedback de éxito automático
      const { successMessage, showToast = true } = optionsRef.current;
      const explicitMsg = typeof successMessage === 'function' ? successMessage(result as T) : successMessage;
      const serverMsg = (result as any)?.message;
      
      if (showToast) {
        if (explicitMsg) {
          toast.success(explicitMsg);
        } else if (serverMsg && typeof serverMsg === 'string') {
          toast.success(serverMsg);
        }
      }

      optionsRef.current.onSuccess?.(result, ...args);
      return result;
    } catch (err: any) {
      const message = err.message || 'Ocurrió un error inesperado';
      setError(message);
      
      // Feedback de error automático
      const { errorMessage, showToast = true } = optionsRef.current;
      if (showToast) {
        toast.error(errorMessage || message);
      }

      optionsRef.current.onError?.(err);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []); 

  const clearError = useCallback(() => setError(null), []);

  return {
    execute,
    loading,
    error,
    setError,
    clearError
  };
}
