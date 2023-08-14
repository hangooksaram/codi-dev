/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "export",
  reactStrictMode: false,
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  compiler: {
    styledComponents: true,
    images: {
      domains: ["localhost", "codi-frontend.s3.ap-northeast-1.amazonaws.com"],
    },
  },
};

module.exports = nextConfig;
