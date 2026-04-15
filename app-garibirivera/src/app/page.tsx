'use client';

/**
 * La página raíz (/) es un componente neutral.
 * El sistema de protección de rutas en UserContext se encarga de redirigir 
 * al usuario a /login (si no hay sesión) o a su Dashboard (si ya la hay).
 */
export default function Home() {
  return null;
}
