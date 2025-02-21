"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientClassName?: string
  containerClassName?: string
  borderWidth?: number
  isAnimated?: boolean
}

export function GradientBorder({
  children,
  className,
  gradientClassName,
  containerClassName,
  borderWidth = 1,
  isAnimated = false,
  ...props
}: GradientBorderProps) {
  return (
    <div
      className={cn("relative rounded-lg", isAnimated && "transition-transform hover:scale-[1.01]", className)}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-r from-primary/50 via-primary to-primary/50",
          isAnimated && "animate-gradient-x",
          gradientClassName,
        )}
      />
      <div
        className={cn("relative rounded-lg border-transparent bg-background", containerClassName)}
        style={{ margin: borderWidth }}
      >
        {children}
      </div>
    </div>
  )
}

