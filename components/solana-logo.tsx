"use client"

import { motion } from "framer-motion"

export function SolanaLogo() {
  return (
    <motion.div
      className="relative h-24 w-24"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] opacity-75 blur-lg" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195]" />
      <div className="absolute inset-2 rounded-full bg-background" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M85.6571 68.7571L70.1714 87.0286C69.8857 87.3143 69.6 87.6 69.3143 87.6H15.4C14.8286 87.6 14.5429 87.0286 14.8286 86.4571L28.7429 69.6143C29.0286 69.3286 29.3143 69.0429 29.8857 69.0429H83.8C84.3714 69.0429 84.6571 69.6143 84.3714 70.1857L84.9429 69.6143C85.2286 69.3286 85.5143 69.0429 85.9429 69.0429H85.6571V68.7571ZM70.1714 40.7429L85.6571 59.0143C85.9429 59.3 86.2286 59.5857 86.2286 59.8714V60.1571H86.5143C87.0857 60.1571 87.3714 60.7286 87.0857 61.3L73.1714 78.1429C72.8857 78.4286 72.6 78.7143 72.0286 78.7143H15.4C14.8286 78.7143 14.5429 78.1429 14.8286 77.5714L29.0286 59.3C29.3143 59.0143 29.6 58.7286 30.1714 58.7286H83.8C84.3714 58.7286 84.6571 58.1571 84.3714 57.5857L70.4571 40.7429C70.1714 40.4571 69.8857 40.1714 69.3143 40.1714H15.4C14.8286 40.1714 14.5429 39.6 14.8286 39.0286L29.0286 20.7571C29.3143 20.4714 29.6 20.1857 30.1714 20.1857H83.8C84.3714 20.1857 84.6571 19.6143 84.3714 19.0429L70.4571 2.21429C70.1714 1.92857 69.8857 1.64286 69.3143 1.64286H15.4C14.8286 1.64286 14.5429 1.07143 14.8286 0.5L29.0286 -17.7714C29.3143 -18.0571 29.6 -18.3429 30.1714 -18.3429H83.8C84.3714 -18.3429 84.6571 -17.7714 84.3714 -17.2L70.4571 -34.0286C70.1714 -34.3143 69.8857 -34.6 69.3143 -34.6H15.4C14.8286 -34.6 14.5429 -35.1714 14.8286 -35.7429L29.0286 -54.0143C29.3143 -54.3 29.6 -54.5857 30.1714 -54.5857H83.8C84.3714 -54.5857 84.6571 -54.0143 84.3714 -53.4429L70.4571 -70.2714C70.1714 -70.5571 69.8857 -70.8429 69.3143 -70.8429H15.4"
            stroke="url(#solana-gradient)"
            strokeWidth="3"
          />
          <defs>
            <linearGradient id="solana-gradient" x1="16" y1="0" x2="86" y2="87.6" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9945FF" />
              <stop offset="1" stopColor="#14F195" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  )
}

