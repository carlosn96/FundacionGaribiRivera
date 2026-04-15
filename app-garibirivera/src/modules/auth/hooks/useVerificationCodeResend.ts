/**
 * @fileoverview Hook for managing verification code resend logic.
 * Encapsulates cooldown, attempt tracking, and resend functionality.
 * 
 * IMPORTANT: The attempt counter only increments on SUCCESSFUL resendings.
 * Failed attempts, network errors, and validation failures do NOT count.
 */
import { useCallback, useEffect, useState } from 'react';
import { resendVerificationCode } from '@/modules/auth/application/services/auth';
import { useToast } from '@/core/hooks/use-toast';

const MAX_RESEND_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 45;

export interface UseVerificationCodeResendReturn {
  isResending: boolean;
  resendCooldown: number;
  resendAttempts: number;
  lastError: string | null;
  canResend: boolean;
  handleResend: () => Promise<void>;
  resetState: () => void;
}

export function useVerificationCodeResend(
  email: string,
  nombre: string,
  apellidos: string
): UseVerificationCodeResendReturn {
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [lastError, setLastError] = useState<string | null>(null);

  // Cooldown timer effect
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const canResend = !isResending && resendCooldown === 0 && resendAttempts < MAX_RESEND_ATTEMPTS;

  const handleResend = useCallback(async () => {
    if (!canResend) return;

    setIsResending(true);
    setLastError(null);

    try {
      const result = await resendVerificationCode(email, nombre, apellidos);

      // Only increment attempt counter if code was successfully sent
      if (!result.sent) {
        setLastError(result.message || 'No fue posible reenviar el código.');
        
        toast({
          variant: 'destructive',
          title: 'No se pudo reenviar',
          description: result.message || 'Intenta con otros datos o más tarde.',
        });
        // NOTE: Do NOT increment resendAttempts here - it only counts successful sends
        return;
      }

      // SUCCESS: Code was sent, increment counter and start cooldown
      setResendAttempts((prev) => prev + 1);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);

      toast({
        title: 'Código reenviado',
        description: 'Revisa tu correo electrónico e ingresa el nuevo código de verificación.',
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'No se pudo reenviar el código. Intenta de nuevo.';
      setLastError(errorMessage);
      
      toast({
        variant: 'destructive',
        title: 'Error al reenviar',
        description: errorMessage,
      });
      // NOTE: Do NOT increment on errors - attempts only count successful sends
    } finally {
      setIsResending(false);
    }
  }, [canResend, email, nombre, apellidos, toast]);

  const resetState = useCallback(() => {
    setIsResending(false);
    setResendCooldown(0);
    setResendAttempts(0);
    setLastError(null);
  }, []);

  return {
    isResending,
    resendCooldown,
    resendAttempts,
    lastError,
    canResend,
    handleResend,
    resetState,
  };
}
