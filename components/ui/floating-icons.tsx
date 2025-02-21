"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingIcon {
  Icon: React.ComponentType<any>
  x: number
  y: number
  scale: number
  rotation: number
}

export function FloatingIcons({ icons }: { icons: React.ComponentType<any>[] }) {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    const newIcons = icons.map((Icon, i) => ({
      Icon,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
    }))
    setFloatingIcons(newIcons)
  }, [icons])

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          animate={{
            x: [icon.x, icon.x + 20, icon.x],
            y: [icon.y, icon.y + 20, icon.y],
            rotate: [icon.rotation, icon.rotation + 10, icon.rotation],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ scale: icon.scale }}
        >
          <icon.Icon className="h-12 w-12 text-primary/40" />
        </motion.div>
      ))}
    </div>
  )
}

