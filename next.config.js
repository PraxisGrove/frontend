/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  // 开发环境代理配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'}/:path*`,
      },
    ];
  },
  // 环境变量配置
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // 性能优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // 开发环境优化
    if (dev && !isServer) {
      config.devtool = 'eval-source-map';
    }

    // 生产环境优化
    if (!dev && !isServer) {
      // 代码分割优化
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // shadcn/ui 组件单独打包
          shadcnui: {
            test: /[\\/]node_modules[\\/](@radix-ui|class-variance-authority|clsx|tailwind-merge)[\\/]/,
            name: 'shadcn-ui',
            chunks: 'all',
            priority: 30,
          },
          // Framer Motion 单独打包
          framermotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 25,
          },
          // React Bits 单独打包
          reactbits: {
            test: /[\\/]node_modules[\\/]react-bits[\\/]/,
            name: 'react-bits',
            chunks: 'all',
            priority: 20,
          },
          // UI 组件库
          ui: {
            test: /[\\/]src[\\/]components[\\/](ui|aceternity|reactbit|unified)[\\/]/,
            name: 'ui-components',
            chunks: 'all',
            priority: 15,
          },
        },
      };

      // Tree shaking 优化
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    return config;
  },
};

export default nextConfig;
