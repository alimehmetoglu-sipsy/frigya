/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['peaksofthebalkans.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;