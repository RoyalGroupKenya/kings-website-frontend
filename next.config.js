/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash:true,
  skipTrailingSlashRedirect:true,
  images: {
    domains: ['kingsdevelopersapi.co.ke'],
    loader: 'custom',
    loaderFile: './loader.js',
  },
	   eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      }
};

module.exports = nextConfig;
