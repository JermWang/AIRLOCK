"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { formatAddress } from "@/lib/utils"

interface Partnership {
  kol: {
    name: string
    handle: string
    image: string
    address: string
  }
  project: {
    name: string
    symbol: string
    logo: string
  }
  amount: number
  vestingMonths: number
  date: string
}

const PARTNERSHIPS: Partnership[] = [
  {
    kol: {
      name: "Alex Thompson",
      handle: "@solana_alex",
      image: "/placeholder.svg?height=100&width=100",
      address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA",
    },
    project: {
      name: "Solana Protocol",
      symbol: "SOL",
      logo: "/placeholder.svg?height=40&width=40",
    },
    amount: 500000,
    vestingMonths: 24,
    date: "2 minutes ago",
  },
  {
    kol: {
      name: "Sarah Chen",
      handle: "@defi_sarah",
      image: "/placeholder.svg?height=100&width=100",
      address: "3jKWxTg2CW87d97TXJSDpbD5jBkheTqA",
    },
    project: {
      name: "Jupiter Exchange",
      symbol: "JUP",
      logo: "/placeholder.svg?height=40&width=40",
    },
    amount: 250000,
    vestingMonths: 12,
    date: "5 minutes ago",
  },
  {
    kol: {
      name: "Michael Rodriguez",
      handle: "@sol_michael",
      image: "/placeholder.svg?height=100&width=100",
      address: "9pKXtg2CW87d97TXJSDpbD5jBkheTqA",
    },
    project: {
      name: "Marinade Finance",
      symbol: "MNDE",
      logo: "/placeholder.svg?height=40&width=40",
    },
    amount: 750000,
    vestingMonths: 36,
    date: "10 minutes ago",
  },
]

export function PartnershipFeed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <div ref={containerRef} className="relative h-[600px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background via-transparent to-background" />
      <motion.div style={{ y }} className="space-y-6 px-4">
        {PARTNERSHIPS.map((partnership, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group relative overflow-hidden rounded-lg border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-[#9945FF]/20 hover:bg-white/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12">
                  <Image
                    src={partnership.kol.image || "/placeholder.svg"}
                    alt={partnership.kol.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{partnership.kol.name}</h3>
                  <p className="text-sm text-white/60">{partnership.kol.handle}</p>
                  <p className="mt-1 text-xs text-white/40">{formatAddress(partnership.kol.address)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Image
                    src={partnership.project.logo || "/placeholder.svg"}
                    alt={partnership.project.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">{partnership.project.name}</span>
                </div>
                <p className="mt-1 text-sm text-white/60">
                  {partnership.amount.toLocaleString()} {partnership.project.symbol}
                </p>
                <p className="text-xs text-white/40">{partnership.vestingMonths} month vesting</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#9945FF]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

