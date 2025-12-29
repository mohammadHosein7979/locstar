import { SITE_URL } from "./app/constants/constats";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const runtimeCaching = [
  {
    urlPattern: /^\/(auth|api\/auth|profile).*$/,
    handler: 'NetworkOnly',
  },
  {
    urlPattern: ({ request }: { request: Request }) => request.mode === 'navigate',
    handler: 'NetworkFirst',
    options: {
      cacheName: 'pages-cache',
      expiration: { maxEntries: 20 },
    },
  },
  {
    urlPattern: ({ request }: { request: Request }) =>
      ['style', 'script', 'worker', 'image'].includes(request.destination),
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'assets-cache',
      expiration: { maxEntries: 50 },
    },
  },
];

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== 'production',
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
});

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    compiler: {
      removeConsole: process.env.NODE_ENV !== 'development',
    },
    images: {
      domains: ['locstar.ir'],
    },
    env: {
      NEXTAUTH_URL:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : SITE_URL,
    },
    rewrites: async () => [
      { source: '/auth/:path*', destination: '/api/auth/:path*' },
    ],
  })
);
