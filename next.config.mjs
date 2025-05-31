/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/(.*)',
        destination: 'https://chat-frontend-ivory-rho.vercel.app/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
