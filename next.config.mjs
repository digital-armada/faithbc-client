/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.faithbc.org.au',
                port: '',
            },
        ],
    },
};

export default nextConfig;
