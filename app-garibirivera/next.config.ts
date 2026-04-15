import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false, // Deshabilitar StrictMode para evitar doble ejecución de useEffect en desarrollo
};

export default nextConfig;
