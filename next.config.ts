import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pngmart.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.transparentpng.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.rawpixel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
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
