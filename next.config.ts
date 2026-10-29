import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Dominios permitidos: imágenes de ejemplo del seed y de la vitrina (prueba1)
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "exitocol.vtexassets.com" },
      { protocol: "https", hostname: "media.falabella.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "sony.scene7.com" },
    ],
  },
};

export default nextConfig;
