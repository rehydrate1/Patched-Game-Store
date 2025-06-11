import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.rockstargames.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
