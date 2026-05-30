import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Enable experimental Webpack memory optimizations to reduce memory usage during compilation and builds.
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
