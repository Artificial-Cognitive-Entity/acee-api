/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { request: false };

    return config;
  }
};

module.exports = nextConfig;
