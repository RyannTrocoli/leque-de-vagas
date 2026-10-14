import type { NextConfig } from "next";

// cacheComponents fica desligado: o projeto segue o modelo das aulas 04 a 06,
// com fetch + revalidate, generateStaticParams e rotas estaticas/dinamicas.
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
