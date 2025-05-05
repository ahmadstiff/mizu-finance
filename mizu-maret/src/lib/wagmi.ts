import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

export const pharosChain = defineChain({
  id: 11155420,
  name: "Pharos Devnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia.optimism.io"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://optimism-sepolia.blockscout.com",
    },
  },
  testnet: true,
  iconBackground: "#ffff",
  iconUrl: "/pharos-logo.jpg",
});

export const config = getDefaultConfig({
  appName: "MyDApp",
  projectId: "YOUR_PROJECT_ID",
  chains: [pharosChain],
  transports: {
    [pharosChain.id]: http(),
  },
});
