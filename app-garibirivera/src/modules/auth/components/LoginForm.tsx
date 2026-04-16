"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, AlertTriangle, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { getRedirectPath } from "@/modules/auth/domain/Roles";
import { LoginPayloadSchema, LoginPayload } from "@/modules/auth/domain/Auth";
import { 
  VisionGlassWindow, 
  VisionTypography, 
  VisionText 
} from "@/core/components/ui/vision-glass";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Checkbox } from "@/core/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/core/components/ui/alert";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/core/components/ui/form";
import { getGreeting } from "@/core/utils/date";

export function LoginForm() {
  const { login, isLoading, error: apiError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginPayload>({
    resolver: zodResolver(LoginPayloadSchema),
    mode: "onBlur",
    defaultValues: {
      correo: "",
      contrasena: "",
      rememberMe: false
    }
  });

  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: LoginPayload) => {
    const user = await login(data);
    if (user && user.id) {
      const userType = Number(user.tipo_usuario || 0);
      const destination = getRedirectPath(userType);
      router.refresh();
      router.replace(destination);
    }
  };

  return (
    <VisionGlassWindow className="p-8 sm:p-10 shadow-2xl" withNoise>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6 animate-in fade-in zoom-in duration-500">
            <Image src="/images/logo.svg" width={180} height={60} alt="Logo" priority style={{ height: 'auto' }} />
          </div>
          <div className="space-y-2">
            <VisionTypography variant="title-1" className="font-bold tracking-tight">
              {isMounted ? getGreeting() : 'Bienvenido'}
            </VisionTypography>
            <VisionText className="text-[var(--text-secondary)]">
              Por favor, ingresa tus credenciales institucionales
            </VisionText>
          </div>
        </div>

        {isMounted && apiError && (
          <Alert variant="destructive" className="animate-in slide-in-from-top-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error de Acceso</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Correo Electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="usuario@fundacion.com"
                      className="h-12 transition-all bg-[var(--surface-raised)]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contrasena"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Contraseña
                    </FormLabel>
                    <Link href="/forgot-password" className="text-xs font-bold text-fundacion-amarillo hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 pr-12 transition-all bg-[var(--surface-raised)]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5 vision-text-secondary" /> : <Eye className="w-5 h-5 vision-text-secondary" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0 py-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-[var(--border-strong)] data-[state=checked]:bg-fundacion-verde data-[state=checked]:border-fundacion-verde"
                    />
                  </FormControl>
                  <FormLabel className="text-xs font-medium cursor-pointer select-none vision-text-secondary">
                    Mantener sesión iniciada
                  </FormLabel>
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button 
                type="submit" 
                variant="visionPrimary" 
                className={`w-full h-12 rounded-xl text-md font-bold transition-all duration-300 shadow-lg ${
                  form.formState.isValid ? 'shadow-fundacion-verde/20' : ''
                }`}
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Autenticando...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 group">
                    <span>Acceder al Sistema</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center pt-6 border-t border-[var(--border-subtle)]">
          <p className="text-sm vision-text-secondary">
            ¿No tienes una cuenta académica?{' '}
            <Link href="/register" className="font-bold text-fundacion-amarillo hover:underline">
              Regístrate ahora
            </Link>
          </p>
        </div>
      </div>
    </VisionGlassWindow>
  );
}
