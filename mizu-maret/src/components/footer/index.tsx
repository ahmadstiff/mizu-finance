import Link from "next/link";
import {
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Youtube,
  MessageSquare,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#191FBF] text-white py-12 px-4 ">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and social links */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <div className="flex items-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M20 0L36.6 10V30L20 40L3.4 30V10L20 0Z"
                      fill="white"
                    />
                    <path
                      d="M20 8L28.6 13V23L20 28L11.4 23V13L20 8Z"
                      fill="black"
                    />
                  </svg>
                  <span className="font-bold text-xl">POLYTRADE</span>
                </div>
              </Link>
            </div>
            <p className="text-gray-300 mb-6">
              Your Gateway to Real World Asset
              <br />
              Opportunities On-chain
            </p>

            <div className="flex space-x-4 mb-6">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Medium">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.285 7.269a.733.733 0 0 0-.24-.619l-1.77-2.133v-.32h5.498l4.25 9.32 3.736-9.32H21v.319l-1.515 1.451a.45.45 0 0 0-.168.425v10.666a.448.448 0 0 0 .168.425l1.479 1.451v.319h-7.436v-.319l1.529-1.487c.152-.15.152-.195.152-.424V8.401L10.95 19.218h-.575L5.417 8.401v7.249c-.041.305.06.612.275.833l1.998 2.428v.316h-5.66v-.316l1.998-2.428c.215-.221.304-.53.271-.833V7.269z" />
                </svg>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Telegram">
                <Send className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Discord">
                <MessageSquare className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-gray-300 hover:text-white">
                About Us
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Press
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Polytrade 2.0 Overview
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Contact Us
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Quests
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-medium mb-4">Find us on</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-gray-300 hover:text-white">
                CB Insights
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Crunchbase
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                CoinGecko
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                CoinMarketCap
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-medium mb-4">Products</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-gray-300 hover:text-white">
                Marketplace
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Loyalty Portal
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Reflections NFT
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Lender V2
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                $TRADE Staking
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-gray-300 hover:text-white">
                Blog
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Newsletter
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Careers
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Brand kit
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Podcast
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom section with copyright and legal links */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Polytrade. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Terms & Conditions
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
