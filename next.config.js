/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mr2labs.com' }],
        destination: 'https://mr2labs.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
