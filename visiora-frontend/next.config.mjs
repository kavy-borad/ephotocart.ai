/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled to prevent duplicate API calls from double-mounting
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://phpstack-1490006-6107283.cloudwaysapps.com/api/:path*", // Backend API URL
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
