/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'imagedelivery.net',
      'customer-4pvownnickg2u2fm.cloudflarestream.com',
    ],
  },
};

module.exports = nextConfig;
