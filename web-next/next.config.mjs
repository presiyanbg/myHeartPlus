import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        serverActions: true,
    },
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

export default withNextIntl(nextConfig);
