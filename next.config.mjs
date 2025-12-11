/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // bật tối ưu ảnh
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },

  // bật minify + xoá console
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },

  // Cache file tĩnh lâu dài
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|mp3|webp|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

export default nextConfig
