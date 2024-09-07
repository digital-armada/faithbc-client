/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },
    ],
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
