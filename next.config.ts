import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    const longCache = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/:path*.png", headers: longCache },
      { source: "/:path*.jpg", headers: longCache },
      { source: "/:path*.jpeg", headers: longCache },
      { source: "/:path*.webp", headers: longCache },
      { source: "/:path*.avif", headers: longCache },
      { source: "/:path*.svg", headers: longCache },
      { source: "/:path*.ico", headers: longCache },
    ];
  },
};

export default nextConfig;
