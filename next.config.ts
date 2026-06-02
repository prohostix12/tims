import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
    ],
    qualities: [75, 80, 90],
  },
  async redirects() {
    return [
      {
        source: '/programs',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/programs/:slug*',
        destination: '/courses/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
