/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    BASE_API_URL: process.env.BASE_API_URL,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
