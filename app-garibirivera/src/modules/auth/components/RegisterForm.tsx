"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/core/components/ui/alert";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { RegisterPayloadSchema, RegisterPayload } from "@/modules/auth/domain/Auth";
import { VisionGlassWindow, VisionTypography, VisionText } from "@/core/components/ui/vision-glass";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form";
import { CodeVerificationStep } from "./CodeVerificationStep";
import { getRedirectPath } from "@/modules/auth/domain/Roles";

type RegisterFields = keyof RegisterPayload;

export function RegisterForm() {
  const {
    register: registerService,
    verifyEmailExists,
    verifyValidationCode,
    isLoading: isAuthLoading,
    error: apiError,
  } = useAuth();

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterPayloadSchema),
    mode: "onBlur",
    defaultValues: {
      nombre: "",
      apellidos: "",
      correo: "",
      numero_celular: "",
      contrasena: "",
    },
  });

  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const stepInfo = [
    { title: "Información Personal", subtitle: "¿Cómo te llamas?", fields: ["nombre", "apellidos"] as RegisterFields[] },
    { title: "Correo Electrónico", subtitle: "¿Cuál es tu correo electrónico?", fields: ["correo"] as RegisterFields[] },
    { title: "Número de Teléfono", subtitle: "¿Cómo te contactamos?", fields: ["numero_celular"] as RegisterFields[] },
    { title: "Contraseña Segura", subtitle: "Protege tu cuenta", fields: ["contrasena"] as RegisterFields[] },
  ];

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleNext = async () => {
    const currentFields = stepInfo[currentStep - 1].fields;
    const isStepValid = await form.trigger(currentFields);

    if (!isStepValid) return;

    const values = form.getValues();

    if (currentStep === 2 && !emailVerified) {
      setIsVerifying(true);
      const res = await verifyEmailExists(values.correo, values.nombre, values.apellidos);
      setIsVerifying(false);

      if (res.success) {
        if (res.exists) {
          form.setError("correo", { message: "Este correo ya está registrado" });
        } else {
          setShowVerification(true);
        }
      }
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleVerifyCode = async () => {
    setIsVerifying(true);
    setVerificationError(null);
    const res = await verifyValidationCode(form.getValues().correo, verificationCode);
    setIsVerifying(false);

    if (res.success) {
      setEmailVerified(true);
      setShowVerification(false);
      setCurrentStep(3);
    } else {
      setVerificationError(res.message || "Código incorrecto");
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    setIsVerifying(true);
    const values = form.getValues();
    await verifyEmailExists(values.correo, values.nombre, values.apellidos);
    setIsVerifying(false);
    setResendCooldown(60);
  };

  const onSubmit = async (data: RegisterPayload) => {
    const user = await registerService(data);
    if (user && user.id) {
      const userType = Number(user.tipo_usuario || 0);
      const destination = getRedirectPath(userType);

      router.refresh();
      router.replace(destination);
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <VisionGlassWindow className="p-8 sm:p-10 shadow-2xl" withNoise>
      <div className="relative h-1.5 bg-black/5 rounded-full mb-8 overflow-hidden">
        <div
          className="absolute h-full bg-gradient-to-r from-fundacion-amarillo to-fundacion-verde transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6 animate-in fade-in zoom-in duration-500">
          <Image src="/images/logo.svg" width={180} height={60} alt="Logo" priority />
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-fundacion-amarillo tracking-widest uppercase">Paso {currentStep} de 4</p>
          <VisionTypography variant="title-1" className="font-bold tracking-tight">
            {isMounted && showVerification ? "Verifica tu Correo" : isMounted ? stepInfo[currentStep - 1].title : "Cargando..."}
          </VisionTypography>
          <VisionText className="text-[var(--text-secondary)]">
            {isMounted && showVerification
              ? `Ingresa el código enviado a ${form.getValues().correo}`
              : isMounted
                ? stepInfo[currentStep - 1].subtitle
                : "Por favor espera"}
          </VisionText>
        </div>
      </div>

      {isMounted && apiError && (
        <Alert variant="destructive" className="animate-in slide-in-from-top-2 mt-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error de Registro</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      {!isMounted ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--vision-primary)]" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="min-h-[250px] text-left">
                {currentStep === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2">
                            <User className="w-4 h-4" /> Nombre(s)
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="h-12 bg-[var(--surface-raised)]" placeholder="Tu nombre" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="apellidos"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2">Apellido(s)</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-12 bg-[var(--surface-raised)]" placeholder="Tus apellidos" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 2 && !showVerification && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <FormField
                      control={form.control}
                      name="correo"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Correo Electrónico
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="h-12 bg-[var(--surface-raised)]" placeholder="institucional@fundacion.com" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 2 && showVerification && (
                  <CodeVerificationStep
                    email={form.getValues().correo}
                    isVerifying={isVerifying}
                    verificationCode={verificationCode}
                    verificationError={verificationError}
                    onCodeChange={setVerificationCode}
                    resendCooldown={resendCooldown}
                    canResend={resendCooldown === 0}
                    onResend={handleResendCode}
                  />
                )}

                {currentStep === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <FormField
                      control={form.control}
                      name="numero_celular"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4" /> Número de Teléfono
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" maxLength={10} className="h-12 bg-[var(--surface-raised)]" placeholder="33XXXXXXXX" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <FormField
                      control={form.control}
                      name="contrasena"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2">
                            <Lock className="w-4 h-4" /> Contraseña
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                className="h-12 pr-12 bg-[var(--surface-raised)]"
                                placeholder="Min. 8 caracteres, Mayúscula, Número"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
                              >
                                {showPassword ? <EyeOff className="h-5 w-5 vision-text-secondary" /> : <Eye className="h-5 w-5 vision-text-secondary" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                {currentStep > 1 && !showVerification && (
                  <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setCurrentStep((prev) => prev - 1)}>
                    Atrás
                  </Button>
                )}

                {!showVerification ? (
                  <Button
                    type={currentStep === 4 ? "submit" : "button"}
                    variant="visionPrimary"
                    className="flex-1 h-12 rounded-xl font-bold shadow-lg"
                    onClick={currentStep === 4 ? undefined : handleNext}
                    disabled={isAuthLoading || isVerifying}
                  >
                    {isAuthLoading || isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : currentStep === 4 ? "Finalizar" : "Siguiente"}
                  </Button>
                ) : (
                  <div className="flex w-full gap-4">
                    <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setShowVerification(false)}>
                      Cambiar email
                    </Button>
                    <Button
                      type="button"
                      variant="visionPrimary"
                      className="flex-1 h-12 rounded-xl shadow-lg"
                      onClick={handleVerifyCode}
                      disabled={verificationCode.length !== 4 || isVerifying}
                    >
                      {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verificar"}
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </Form>

          <div className="text-center mt-8 pt-6 border-t border-[var(--border-subtle)]">
            <p className="text-sm vision-text-secondary">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-bold text-fundacion-amarillo hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </>
      )}
    </VisionGlassWindow>
  );
}
