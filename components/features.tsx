"use client"

import { motion, useInView } from "framer-motion"
import { Clock, Shield, Zap, BarChart, Lock, RefreshCw } from "lucide-react"
import { useRef } from "react"

const features = [
  {
    icon: Clock,
    title: "Automated Vesting",
    description: "Set up complex vesting schedules with customizable parameters and automatic releases",
  },
  {
    icon: Shield,
    title: "Secure Distribution",
    description: "Fully decentralized token distribution with on-chain verification",
  },
  {
    icon: Zap,
    title: "Instant Airdrops",
    description: "Execute airdrops instantly to thousands of addresses with minimal gas fees",
  },
  {
    icon: BarChart,
    title: "Real-time Analytics",
    description: "Track claims, monitor vesting progress, and analyze distribution metrics",
  },
  {
    icon: Lock,
    title: "Token Locks",
    description: "Create time-locked tokens with customizable unlock schedules",
  },
  {
    icon: RefreshCw,
    title: "Auto-claiming",
    description: "Enable automatic claiming for vested tokens upon unlock",
  },
]

export function Features() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="relative w-full bg-black/10 px-4 py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div ref={containerRef} className="container relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="bg-gradient-to-r from-primary via-blue-400 to-violet-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            Powerful Features for Token Distribution
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Everything you need to manage token airdrops and vesting schedules on Solana
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="group relative overflow-hidden rounded-xl border border-primary/10 bg-background/50 p-6 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-violet-500/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

