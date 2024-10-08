/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true,
  },
  output: 'export',
};

module.exports = nextConfig;
