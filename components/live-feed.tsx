"use client"

import { motion } from "framer-motion"
import { ExternalLink, Shield, Award } from "lucide-react"

const partnerships = [
  {
    username: "sol_legend",
    tokens: "500,000",
    vestingPeriod: "12 months vesting",
    project: "DeCloud Protocol",
    date: "2025-02-20",
    score: 98,
    verified: true,
    reputation: "Platinum",
  },
  {
    username: "nft_whale",
    tokens: "250,000",
    vestingPeriod: "6 months vesting",
    project: "MetaVerse Labs",
    date: "2025-02-19",
    score: 95,
    verified: true,
    reputation: "Gold",
  },
  {
    username: "defi_master",
    tokens: "750,000",
    vestingPeriod: "18 months vesting",
    project: "YieldFi",
    date: "2025-02-18",
    score: 99,
    verified: true,
    reputation: "Diamond",
  },
]

export function LiveFeed() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-zinc-400">Live Partnership Feed</div>
        <div className="text-sm text-zinc-400">Updated in real-time</div>
      </div>

      <div className="space-y-2">
        {partnerships.map((partnership, index) => (
          <motion.div
            key={partnership.username}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-lg border border-[#9945FF]/20 bg-[#9945FF]/5 p-4 backdrop-blur-sm transition hover:border-[#9945FF]/40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-white">
                    {partnership.username}
                    <ExternalLink className="ml-1 inline h-3 w-3 text-zinc-500" />
                  </div>
                  {partnership.verified && <Shield className="h-4 w-4 text-[#14F195]" />}
                  <Award className="h-4 w-4 text-[#9945FF]" title={partnership.reputation} />
                </div>
                <div className="text-sm text-zinc-500">
                  {partnership.tokens} tokens • {partnership.vestingPeriod}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right text-sm">
                  <div className="font-medium text-white">{partnership.project}</div>
                  <div className="text-zinc-500">{partnership.date}</div>
                </div>
                <div className="flex h-6 w-12 items-center justify-center rounded bg-[#14F195]/10 text-sm font-medium text-[#14F195]">
                  {partnership.score}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="rounded-lg bg-[#9945FF]/10 px-4 py-2 text-sm text-zinc-400 transition hover:bg-[#9945FF]/20">
          View All Partnerships
        </button>
      </div>
    </div>
  )
}

