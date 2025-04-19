"use client"

import { Search, ShoppingCart, Hexagon } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import ButtonConnectWallet from "./button-connect-wallet"
import NextImage from 'next/image';


export default function Navbar() {
  const [open, setOpen] = useState(false)


  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
          <span>
          <NextImage alt="Mizu" src="/mizu-logo.png"  width={32} height={32}/>
          </span>
            <span className="text-xl font-bold">
              MIZU<span className="font-light text-gray-500">MARET</span>
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="ml-8 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input type="search" placeholder="Search" className="w-[300px] pl-10 bg-gray-50 border border-gray-200" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/token-hub" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Token Hub
            </Link>
            <Link href="/asset-hub" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Asset Hub
            </Link>
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
  )
}
