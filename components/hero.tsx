"use client"

import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8 flex items-center justify-center gap-2 text-sm text-[#14F195]">
          <Lock className="h-4 w-4" />
          Transparent Token Partnerships
        </div>

        <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Making Solana partnerships{" "}
          <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
            transparent
          </span>
        </h1>

        <div className="mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-base text-white hover:opacity-90"
          >
            Launch Platform
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

