"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{ expanded: boolean }>({ expanded: true })

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(true)

  return <SidebarContext.Provider value={{ expanded }}>{children}</SidebarContext.Provider>
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <aside className={cn("h-screen bg-muted/40 border-r transition-all duration-300", expanded ? "w-64" : "w-16")}>
      {children}
    </aside>
  )
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("border-b", className)}>{children}</div>
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="py-2">{children}</div>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <nav className="space-y-1">{children}</nav>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function SidebarMenuButton({
  href,
  children,
  className,
}: {
  href?: string
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()
  const Component = href ? Link : "button"
  const isActive = href ? pathname === href : false

  return (
    <Component
      href={href || "#"}
      className={cn(
        "w-full flex items-center px-4 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary hover:bg-muted/50",
        className,
      )}
    >
      {children}
    </Component>
  )
}

