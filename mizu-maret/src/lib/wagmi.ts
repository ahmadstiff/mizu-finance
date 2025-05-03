import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import { optimismSepolia } from "viem/chains";

export const pharosChain = defineChain({
  id: 50002,
  name: "Pharos Devnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://devnet.dplabs-internal.com"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://pharosscan.xyz/",
    },
  },
  testnet: true,
  iconBackground: "#ffff",
  iconUrl: "/pharos-logo.jpg",
});

export const config = getDefaultConfig({
  appName: "MyDApp",
  projectId: "YOUR_PROJECT_ID",
  chains: [pharosChain, optimismSepolia],
  transports: {
    [pharosChain.id]: http(),
    [optimismSepolia.id]: http(),
  },
});
