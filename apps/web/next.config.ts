import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.public.blob.vercel-storage.com",
            },
        ],
        deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
        imageSizes: [32, 48, 64, 96, 128, 192, 256],
        qualities: [75, 85],
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;
