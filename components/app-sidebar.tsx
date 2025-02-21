"use client"

import { Home, Users, MessageSquare, Handshake, Clock, Package2, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

export function AppSidebar() {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "KOL Directory",
      href: "/kols",
      icon: Users,
      badge: "New",
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageSquare,
      badge: "3",
    },
    {
      name: "Deals",
      href: "/deals",
      icon: Handshake,
    },
    {
      name: "Vesting",
      href: "/vesting",
      icon: Clock,
    },
    {
      name: "Token Gating",
      href: "/token-gating",
      icon: Shield,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="text-lg">AirLock</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                href={item.href}
                className={cn("justify-between", pathname === item.href && "bg-primary/10 text-primary")}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge variant={item.badge === "New" ? "default" : "secondary"} className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

