const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

module.exports = {
  i18n: {
    locales: ['bg', 'uk', 'en'],
    defaultLocale: 'bg',
  },
}

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
