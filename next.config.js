/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'yourwebsite.com', // 添加您自己網站的圖片域名
      },
      // 添加其他需要的圖片來源
    ],
    unoptimized: true,
  },
  output: 'export',
};

module.exports = nextConfig;
