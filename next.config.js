/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['picsum.photos'],
  },
  output: 'standalone',
}

module.exports = nextConfig