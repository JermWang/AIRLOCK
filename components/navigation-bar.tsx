"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
]

export function NavigationBar() {
  const { connected } = useWallet()

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#9945FF]/10 bg-background/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Lock className="h-5 w-5" />
            <span>
              Air<span className="text-[#14F195]">Lock</span>
            </span>
          </Link>
          <div className="ml-10 hidden space-x-8 sm:flex">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-zinc-400 transition hover:text-white">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <WalletMultiButton className="!bg-[#14F195] !text-background !text-sm hover:!opacity-90" />
        </div>
      </div>
    </nav>
  )
}

