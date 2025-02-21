interface StepCardProps {
  number: number
  title: string
  description: string
  isLast?: boolean
}

export function StepCard({ number, title, description, isLast }: StepCardProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <span className="text-2xl font-bold text-primary">{number}</span>
      </div>
      <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {!isLast && (
        <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent md:block" />
      )}
    </div>
  )
}

