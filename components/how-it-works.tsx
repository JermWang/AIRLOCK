"use client"

import { motion, useInView } from "framer-motion"
import { Wallet, Clock, Gift } from "lucide-react"
import { useRef } from "react"

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Connect your Solana wallet to get started",
  },
  {
    icon: Clock,
    title: "Configure Distribution",
    description: "Set up your airdrop or vesting schedule parameters",
  },
  {
    icon: Gift,
    title: "Launch & Track",
    description: "Deploy your distribution and monitor progress in real-time",
  },
]

export function HowItWorks() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="relative w-full px-4 py-24 md:py-32">
      <div ref={containerRef} className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="bg-gradient-to-r from-primary via-blue-400 to-violet-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Get started with AirLock in three simple steps</p>
        </motion.div>

        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative text-center"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative mx-auto mb-6">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-primary to-violet-500">
                    <step.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                </motion.div>

                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-24 hidden h-px w-full -translate-y-1/2 md:block">
                    <div className="h-px w-full animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.4),transparent)]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

