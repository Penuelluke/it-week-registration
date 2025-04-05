/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Redirect Vite-specific paths
  async rewrites() {
    return [
      {
        source: '/src/:path*',
        destination: '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
