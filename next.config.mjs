/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.8.171'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
  },
};

export default nextConfig;
