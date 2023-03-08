/** @type {import('next').NextConfig} */

const globalVariables = {
	tokenLife: /*edit this-->*/ 5 /*<--per minute*/ * 60 * 1000 - 60 * 1000,
	example2: undefined,
	example3: undefined,
}

module.exports = {
	env: { ...globalVariables },
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ["rickandmortyapi.com"],
	},
}
