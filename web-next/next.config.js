const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
    headers: () => [
        {
            source: '/',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: process.env.API_IP,
            },
        ],
    },
}

module.exports = withNextIntl(nextConfig);
