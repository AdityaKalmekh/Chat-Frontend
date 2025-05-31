/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Only redirect if this is the OLD domain
    if (process.env.VERCEL_URL?.includes('saral-tech-assignment-frontend')) {
      return [
        {
          source: '/(.*)',
          destination: 'https://chat-frontend-ivory-rho.vercel.app/$1',
          permanent: true,
        },
      ];
    }
    return []; // No redirects for the new domain
  },
};

export default nextConfig;
