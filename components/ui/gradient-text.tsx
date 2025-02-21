"use client"

import type React from "react"

import { cn } from "@/lib/utils"

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "animate-text-gradient bg-gradient-to-r from-[#9945FF] via-[#14F195] to-[#9945FF] bg-[200%_auto] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  )
}

