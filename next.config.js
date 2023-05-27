/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["*"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
				port: "",
				pathname: "/**"
			}
		]
	},
	reactStrictMode: false
}

module.exports = nextConfig
