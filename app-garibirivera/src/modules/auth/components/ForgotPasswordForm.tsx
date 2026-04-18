"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Mail, Lock, Eye, EyeOff, 
  ArrowRight, Loader2, AlertTriangle, CheckCircle2 
} from "lucide-react";
import { useUser } from "@/modules/auth/context/UserContext";
import { getRedirectPath } from "@/modules/auth/domain/Roles";
import { authService } from "@/modules/auth/application/services/auth";
import { 
  ForgotPasswordPayloadSchema, 
  ForgotPasswordPayload,
  ResetPasswordPayloadSchema,
  ResetPasswordPayload
} from "@/modules/auth/domain/Auth";
import { 
  VisionGlassWindow, 
  VisionTypography, 
  VisionText 
} from "@/core/components/ui/vision-glass";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/core/components/ui/alert";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/core/components/ui/form";
import { CodeVerificationStep } from "./CodeVerificationStep";

type FeedbackState = { type: "success" | "error"; message: string; } | null;

export function ForgotPasswordForm() {
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); 
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [targetEmail, setTargetEmail] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (isUserLoading || !user) return;
    router.replace(getRedirectPath(Number(user.tipoUsuario || 0)));
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const stepMeta = useMemo(() => [
    { title: "Recuperar Acceso", subtitle: "Ingresa tu correo para recibir un código de recuperación." },
    { title: "Verifica tu Identidad", subtitle: `Hemos enviado un código de 4 dígitos a ${targetEmail}` },
    { title: "Nueva Contraseña", subtitle: "Define una contraseña segura que puedas recordar." }
  ], [targetEmail]);

  const emailForm = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordPayloadSchema),
    defaultValues: { correo: "" }
  });

  const passwordForm = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordPayloadSchema),
    defaultValues: { nuevaContrasena: "", confirmarContrasena: "" }
  });

  // Ejecutor genérico para evitar redundancia en manejadores
  const executeAction = async (
    action: () => Promise<{ ok: boolean; message?: string }>,
    onSuccess: (res: any) => void
  ) => {
    setIsVerifying(true);
    setFeedback(null);
    try {
      const res = await action();
      if (res.ok) {
        onSuccess(res);
      } else {
        setFeedback({ 
          type: "error", 
          message: res.message || "Ocurrió un error inesperado." 
        });
      }
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || "Error de conexión.";
      setFeedback({ type: "error", message: errorMsg });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRequestReset = (data: ForgotPasswordPayload) => 
    executeAction(() => authService.forgotPassword(data.correo), (res) => {
      setTargetEmail(data.correo);
      setCurrentStep(2);
      setFeedback({ type: "success", message: res.message });
    });

  const handleVerifyCode = () => 
    executeAction(() => authService.verifyCode(targetEmail, verificationCode), (res) => {
      setCurrentStep(3);
      setFeedback({ type: "success", message: res.message });
    });

  const handleResendCode = () => {
    if (resendCooldown > 0) return;
    executeAction(() => authService.forgotPassword(targetEmail), (res) => {
      setResendCooldown(60);
      setFeedback({ type: "success", message: res.message });
    });
  };

  const handleResetPassword = (data: ResetPasswordPayload) => 
    executeAction(() => authService.resetPassword(targetEmail, verificationCode, data.nuevaContrasena), () => {
      setIsSuccess(true);
    });

  if (isSuccess) {
    return (
      <VisionGlassWindow className="p-8 sm:p-10 shadow-2xl text-center" withNoise>
        <div className="flex justify-center mb-6"><Image src="/images/logo.svg" width={180} height={60} alt="Logo" priority style={{ height: 'auto' }} /></div>
        <div className="py-8 space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center"><div className="w-20 h-20 rounded-full bg-fundacion-verde/20 flex items-center justify-center"><CheckCircle2 className="w-10 h-10 text-fundacion-verde" /></div></div>
          <div className="space-y-2">
            <VisionTypography variant="title-1" className="font-bold">¡Contraseña Restablecida!</VisionTypography>
            <VisionText className="text-[var(--text-secondary)]">Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar sesión nuevamente.</VisionText>
          </div>
          <Button variant="visionPrimary" className="w-full h-12 rounded-xl" asChild><Link href="/login">Volver al Inicio</Link></Button>
        </div>
      </VisionGlassWindow>
    );
  }

  return (
    <VisionGlassWindow className="p-8 sm:p-10 shadow-2xl" withNoise>
      <div className="relative h-1.5 bg-black/5 rounded-full mb-8 overflow-hidden">
        <div className="absolute h-full bg-gradient-to-r from-fundacion-amarillo to-fundacion-verde transition-all duration-700" style={{ width: `${(currentStep / 3) * 100}%` }} />
      </div>

      <div className="text-center space-y-4 mb-8">
        <div className="flex justify-center mb-6 animate-in fade-in zoom-in duration-500"><Image src="/images/logo.svg" width={180} height={60} alt="Logo" priority style={{ height: 'auto' }} /></div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-fundacion-amarillo tracking-widest uppercase mb-1">Paso {currentStep} de 3</p>
          <VisionTypography variant="title-1" className="font-bold tracking-tight">{stepMeta[currentStep - 1].title}</VisionTypography>
          <VisionText className="text-[var(--text-secondary)] text-sm">{stepMeta[currentStep - 1].subtitle}</VisionText>
        </div>
      </div>

      <div className="min-h-[280px] flex flex-col justify-center">
        {feedback && (
          <Alert variant={feedback.type === "error" ? "destructive" : "default"} className="animate-in slide-in-from-top-2 mb-6">
            {feedback.type === "error" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            <AlertTitle>{feedback.type === "error" ? "Atención" : "Excelente"}</AlertTitle>
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}

        {currentStep === 1 && (
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleRequestReset)} className="space-y-6">
              <FormField control={emailForm.control} name="correo" render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2"><Mail className="w-4 h-4" /> Correo Electrónico</FormLabel>
                  <FormControl><Input {...field} type="email" className="h-12 bg-[var(--surface-raised)]" placeholder="usuario@fundacion.com" /></FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )} />
              <Button type="submit" variant="visionPrimary" className="w-full h-12 rounded-xl font-bold shadow-lg" disabled={isVerifying}>{isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar Código"}</Button>
            </form>
          </Form>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <CodeVerificationStep email={targetEmail} isVerifying={isVerifying} verificationCode={verificationCode} verificationError={feedback?.type === 'error' ? feedback.message : null} onCodeChange={setVerificationCode} resendCooldown={resendCooldown} canResend={resendCooldown === 0} onResend={handleResendCode} />
            <Button className="w-full h-12 rounded-xl font-bold shadow-lg" variant="visionPrimary" disabled={verificationCode.length !== 4 || isVerifying} onClick={handleVerifyCode}>{isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verificar Código"}</Button>
            <Button variant="ghost" className="w-full h-10 hover:bg-white/5 text-xs text-[var(--text-secondary)]" onClick={() => { setFeedback(null); setCurrentStep(1); }}>¿Email incorrecto? Cambiar Correo</Button>
          </div>
        )}

        {currentStep === 3 && (
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handleResetPassword)} className="space-y-6">
              <FormField control={passwordForm.control} name="nuevaContrasena" render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2"><Lock className="w-4 h-4" /> Nueva Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type={showPassword ? "text" : "password"} className="h-12 pr-12 bg-[var(--surface-raised)]" placeholder="Mín. 8 caracteres, Mayúscula, Número" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors">{showPassword ? <EyeOff className="h-5 w-5 vision-text-secondary" /> : <Eye className="h-5 w-5 vision-text-secondary" />}</button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )} />
              <FormField control={passwordForm.control} name="confirmarContrasena" render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Confirmar Contraseña</FormLabel>
                  <FormControl><Input {...field} type="password" className="h-12 bg-[var(--surface-raised)]" placeholder="Repite tu nueva contraseña" /></FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )} />
              <Button type="submit" variant="visionPrimary" className="w-full h-12 rounded-xl font-bold shadow-lg" disabled={isVerifying}>{isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Restablecer Contraseña"}</Button>
            </form>
          </Form>
        )}
      </div>

      <div className="text-center mt-8 pt-6 border-t border-[var(--border-subtle)]">
        <Link href="/login" className="text-sm font-bold text-fundacion-amarillo hover:underline inline-flex items-center gap-2 transition-all hover:gap-3"><ArrowRight className="w-4 h-4 rotate-180" /> Volver al Inicio de Sesión</Link>
      </div>
    </VisionGlassWindow>
  );
}
