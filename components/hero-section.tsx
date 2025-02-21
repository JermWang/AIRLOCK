"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowRight, Lock, Coins, Gift, Clock, BarChartIcon as ChartBar } from "lucide-react"
import { FloatingIcons } from "@/components/ui/floating-icons"
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background"

export function HeroSection() {
  const router = useRouter()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 100])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background px-4 py-32">
      <AnimatedGradientBackground />

      <FloatingIcons icons={[Coins, Gift, Clock, ChartBar]} />

      <div className="container relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm"
          >
            <Lock className="mr-2 h-4 w-4" />
            Secure Token Distribution on Solana
          </motion.div>

          <motion.div style={{ y }} className="mt-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Automate Your{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-primary via-blue-400 to-violet-500 bg-clip-text text-transparent">
                  Token Distribution
                </span>
                <motion.span
                  className="absolute inset-x-0 bottom-0 z-0 h-3 skew-x-12 bg-primary/20"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Create, manage and track token airdrops and vesting schedules with ease. Fully decentralized, verifiable
            on-chain, and secure by design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-500"
              >
                <span className="relative z-10 flex items-center">
                  Launch App
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-primary"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/pricing")}
                className="group relative overflow-hidden border-primary/20 bg-background/50 backdrop-blur-sm"
              >
                View Pricing
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  )
}

