/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  output: 'standalone'
};

export default nextConfig;
