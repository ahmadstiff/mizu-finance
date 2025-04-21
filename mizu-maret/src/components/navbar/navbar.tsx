"use client";

import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ButtonConnectWallet from "./button-connect-wallet";
import NextImage from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Function to check if the current path matches the link
  const isActive = (path : any) => {
    return pathname === path;
  };

  return (
    <header className="border-b border-gray-200 mx-5">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span>
              <NextImage
                alt="Mizu"
                src="/mizu-logo.png"
                width={40}
                height={40}
              />
            </span>
            <span className="text-xl font-bold">
              <NextImage
                alt="Mizu"
                src="/mizu-finance.png"
                width={150}
                height={90}
              />
            </span>
          </Link>
        </div>

        {/* Search
        <div className="ml-8 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search"
              className="w-[300px] pl-10 bg-gray-50 border border-gray-200"
            />
          </div>
        </div> */}

        {/* Navigation */}
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", path: "/" },
              { name: "Token Hub", path: "/token-hub" },
              { name: "Asset Hub", path: "/asset-hub" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-semibold hover:text-gray-900 relative ${
                  isActive(item.path) ? "text-blue-600" : "text-gray-700"
                }`}
              >
                <div className="py-5">{item.name}</div>
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                )}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Cart</span>
            </Link>
            <ButtonConnectWallet />
          </div>
        </div>
      </div>
    </header>
  );
}
