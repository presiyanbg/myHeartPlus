/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: process.env.API_IP,
            },
        ],
    },
}

module.exports = nextConfig
