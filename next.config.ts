import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "gettoolix.online" }],
      destination: "https://www.gettoolix.online/:path*",
      statusCode: 301
    }];
  }
};
export default nextConfig;
