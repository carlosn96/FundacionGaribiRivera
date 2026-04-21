import { Suspense } from "react";
import EmprendedorDetailClient from "@/modules/asistente/difusion/components/historial/EmprendedorDetailClient";

export default function DetalleEmprendedorPage() {
  return (
    <Suspense fallback={
      <div className="py-8 space-y-8 animate-pulse p-8">
        <div className="h-32 bg-zinc-100 dark:bg-zinc-800 rounded-3xl" />
        <div className="h-96 bg-zinc-100 dark:bg-zinc-800 rounded-3xl" />
      </div>
    }>
      <EmprendedorDetailClient />
    </Suspense>
  );
}
