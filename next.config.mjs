/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "faithbc-strapi-s3-bucket.s3.ap-southeast-2.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.faithbc.org.au",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },
    ],
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
