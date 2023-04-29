/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_ALCHEMY_KEY:"wss://eth-goerli.g.alchemy.com/v2/whetCIbBXq3KoYRz5bT5jnTXrA_ICz-m",
    CONTRACT_ADDRESS:"0xfc5BC169504FF1000D085B3B6395E6af77da3467"
  }
}

module.exports = nextConfig
