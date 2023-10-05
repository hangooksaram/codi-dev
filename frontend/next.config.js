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
      domains: [
        "localhost",
        "codi-frontend.s3.ap-northeast-1.amazonaws.com",
        "codi-image-s3-bucket.s3.ap-northeast-2.amazonaws.com",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "codi-frontend.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "codi-image-s3-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
