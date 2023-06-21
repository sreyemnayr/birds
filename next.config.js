/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  externals: ['pino-pretty'],
}

module.exports = nextConfig
