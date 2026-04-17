/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to build as a static site
  output: 'export',
  // This helps with images if you add them later
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
