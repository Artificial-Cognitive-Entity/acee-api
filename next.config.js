/** @type {import('next').NextConfig} */
const nextConfig = {
      webpack: (config) => {
        config.resolve.fallback = { request: false };
        config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        });
    
        return config;
      },
}

module.exports = nextConfig
