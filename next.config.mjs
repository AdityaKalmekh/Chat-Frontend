/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    console.log('VERCEL_URL:', process.env.VERCEL_URL);
    // Only redirect if this is the OLD domain
    if (process.env.VERCEL_URL?.includes('saral-tech-assignment')) {
      console.log('Redirecting from old domain');
      return [
        {
          source: '/(.*)',
          destination: 'https://chat-frontend-ivory-rho.vercel.app/$1',
          permanent: true,
        },
      ];
    }
    console.log('No redirect applied');
    return [];
  },
};

export default nextConfig;
