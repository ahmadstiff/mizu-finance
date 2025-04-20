"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDown, ExternalLink } from "lucide-react";

const ButtonConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        openAccountModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";

        if (!ready) {
          return (
            <div
              aria-hidden={true}
              className="opacity-0 pointer-events-none select-none"
            />
          );
        }

        if (!account || !chain) {
          return (
            <div className="relative group">
              <button
                onClick={openConnectModal}
                type="button"
                className="flex items-center justify-center space-x-1.5 px-6 py-2 rounded-3xl bg-blue-600 text-white font-medium transition-all hover:opacity-90  w-full"
              >
                <span>Connect Wallet</span>
              </button>
            </div>
          );
        }

        if (chain.unsupported) {
          return (
            <div className="relative group">
              <button
                onClick={openChainModal}
                type="button"
                className="flex items-center justify-center space-x-2 px-6 py-1.5 rounded-3xl bg-white text-red-500 font-medium transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full"
              >
                <span>Wrong Network</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button
                onClick={openChainModal}
                type="button"
                className="flex items-center justify-start  px-1 py-1 hover:cursor-pointer rounded-3xl bg-white border-2 border-blue-500 hover:opacity-90 font-medium transition-all"
              >
                {chain.hasIcon && chain.iconUrl && (
                  <img
                    src={chain.iconUrl || "/placeholder.svg"}
                    alt={chain.name || "Chain icon"}
                    className="w-8 h-8 rounded-full "
                    style={{ background: chain.iconBackground }}
                  />
                )}
                <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
              </button>
            </div>

            <div className="relative group">
              <div className="border-2 border-blue-500 rounded-full">
                <button
                  onClick={() => {
                    openAccountModal();
                  }}
                  type="button"
                  className="flex items-center justify-center space-x-1 px-3 py-2 rounded-3xl hover:cursor-pointer bg-white text-[#07094d] hover:opacity-90 font-medium transition-al"
                >
                  <span className="truncate max-w-[120px]">
                    {account.displayName}
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ButtonConnectWallet;
