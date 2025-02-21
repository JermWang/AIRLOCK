"use client"

import { WalletMultiButton as SolanaWalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"

export function WalletMultiButton() {
  const { connected } = useWallet()

  return (
    <div className="wallet-adapter-button-trigger">
      <Button variant={connected ? "outline" : "default"} asChild>
        <SolanaWalletMultiButton />
      </Button>
    </div>
  )
}

