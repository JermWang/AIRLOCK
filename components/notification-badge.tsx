"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export function NotificationBadge({ children }: { children: React.ReactNode }) {
  const [hasNotification, setHasNotification] = React.useState(true)

  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {hasNotification && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

