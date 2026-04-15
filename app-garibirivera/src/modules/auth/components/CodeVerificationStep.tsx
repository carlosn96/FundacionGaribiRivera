"use client";

import React from 'react';
import { Input } from '@/core/components/ui/input';
import {
  KeyRound,
  XCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';

interface CodeVerificationStepProps {
  email: string;
  isVerifying: boolean;
  verificationCode: string;
  verificationError: string | null;
  onCodeChange: (code: string) => void;
  // Estos campos son opcionales por ahora si decidimos no manejar el reenvío aquí mismo
  resendCooldown?: number;
  canResend?: boolean;
  onResend?: () => void;
}

export function CodeVerificationStep({
  isVerifying,
  verificationCode,
  verificationError,
  onCodeChange,
  resendCooldown = 0,
  canResend = false,
  onResend,
}: CodeVerificationStepProps) {

  return (
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-right-5 duration-500">
      <div className="space-y-4">
        <div className="space-y-3">
          <label
            htmlFor="verificationCode"
            className="vision-callout vision-text-secondary flex items-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            Código de Verificación
          </label>

          <div className="relative">
            <Input
              id="verificationCode"
              name="verificationCode"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={verificationCode}
              onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, ''))}
              placeholder="0  0  0  0"
              className={`h-16 text-center tracking-[0.45em] text-3xl font-mono font-bold transition-all duration-300 ${
                verificationError && verificationCode
                  ? 'border-red-400 focus-visible:ring-red-400 bg-red-50/30'
                  : verificationCode && !verificationError
                    ? 'border-green-400 focus-visible:ring-green-400 bg-green-50/30'
                    : 'border-black/10'
              }`}
              disabled={isVerifying}
              required
              autoFocus
            />

            {verificationCode && (
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                {verificationError ? (
                  <XCircle className="w-6 h-6 text-red-500 animate-in zoom-in-50" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-green-500 animate-in zoom-in-50" />
                )}
              </div>
            )}
          </div>

          {verificationError && (
            <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-lg animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 leading-snug">{verificationError}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-muted-foreground">¿No recibiste el código?</p>
        </div>

        <button
          type="button"
          onClick={onResend}
          disabled={!canResend || isVerifying}
          className={`w-full py-2 px-3 rounded-lg font-medium text-xs transition-all duration-200 flex items-center justify-center gap-2 ${
            canResend
              ? 'bg-fundacion-verde text-white hover:bg-fundacion-verde/90 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {resendCooldown > 0 ? (
            <>
              <Clock className="w-3.5 h-3.5" />
              Reintentar en {resendCooldown}s
            </>
          ) : (
            'Reenviar Código'
          )}
        </button>
      </div>

      <p className="text-xs text-center text-muted-foreground/80 leading-relaxed">
        El código expira en 10 minutos. Revisa tu carpeta de spam si no lo ves en tu bandeja de entrada.
      </p>
    </div>
  );
}
