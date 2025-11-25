/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // cần nếu dùng next/image
  },
  output: 'export', // <--- thêm dòng này để thay thế next export
}

export default nextConfig
