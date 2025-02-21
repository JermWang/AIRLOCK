import { LiveFeed } from "@/components/live-feed"
import { Hero } from "@/components/hero"
import { StarField } from "@/components/star-field"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <div className="flex flex-col gap-8">
        <Hero />
        <LiveFeed />
      </div>
    </div>
  )
}

