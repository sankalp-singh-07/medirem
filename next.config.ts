import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	eslint: {
		ignoreDuringBuilds: true, // Disable ESLint checks during builds
	},
};

export default nextConfig;
