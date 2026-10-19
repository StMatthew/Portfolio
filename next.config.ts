import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["otplib", "qrcode"],
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
