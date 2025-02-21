import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { GradientBorder } from "@/components/ui/gradient-border"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <GradientBorder isAnimated borderWidth={2}>
      <Card className="h-full bg-card/50 backdrop-blur">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </GradientBorder>
  )
}

