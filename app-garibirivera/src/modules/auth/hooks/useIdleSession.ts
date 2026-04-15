
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/core/hooks/use-toast';
import { AUTH_ENDPOINTS } from '@/modules/auth/constants';

// Constantes para evitar números mágicos
const MS_PER_MINUTE = 1000 * 60;
const IDLE_TIMEOUT_MINUTES = 15;
const PROMPT_BEFORE_IDLE_MINUTES = 5;
const IDLE_TIMEOUT_MS = IDLE_TIMEOUT_MINUTES * MS_PER_MINUTE;
const PROMPT_BEFORE_IDLE_MS = PROMPT_BEFORE_IDLE_MINUTES * MS_PER_MINUTE;

interface UseIdleSessionOptions {
  timeout?: number;
  promptBeforeIdle?: number;
  enabled?: boolean;
}

const useIdleSession = (options: UseIdleSessionOptions = {}) => {
  const {
    timeout = IDLE_TIMEOUT_MS,
    promptBeforeIdle = PROMPT_BEFORE_IDLE_MS,
    enabled = true
  } = options;
  const router = useRouter();
  const { toast } = useToast();
  const [isIdle, setIsIdle] = useState(false);

  const handleIdle = useCallback(async () => {
    setIsIdle(true);
    toast({
      title: 'Tu sesión está a punto de expirar',
      description: `Cerraremos tu sesión por inactividad en ${PROMPT_BEFORE_IDLE_MINUTES} minutos.`,
      variant: 'default',
      position: 'top-center',
    });

    setTimeout(async () => {
      try {
        const response = await fetch(AUTH_ENDPOINTS.logout, {
          method: 'POST'
        });
        if (!response.ok) {
          console.error('Logout failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        window.location.href = '/';
      }
    }, promptBeforeIdle);
  }, [router, toast, promptBeforeIdle]);

  useEffect(() => {
    // Solo activar el monitoreo si está habilitado
    if (!enabled) {
      return;
    }

    let idleTimer: NodeJS.Timeout;
    let scrollThrottleTimer: NodeJS.Timeout | null = null;

    const resetTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(handleIdle, timeout);
    };

    // Throttled version for scroll events to prevent excessive calls
    const throttledResetTimer = () => {
      if (scrollThrottleTimer === null) {
        resetTimer();
        scrollThrottleTimer = setTimeout(() => {
          scrollThrottleTimer = null;
        }, 500); // Throttle to once every 500ms
      }
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];

    // Add scroll event with throttling
    window.addEventListener('scroll', throttledResetTimer, { passive: true });

    // Add other events without throttling
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(idleTimer);
      if (scrollThrottleTimer) {
        clearTimeout(scrollThrottleTimer);
      }
      window.removeEventListener('scroll', throttledResetTimer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [enabled, handleIdle, timeout]);

  return isIdle;
};

export default useIdleSession;
