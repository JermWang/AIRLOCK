import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>AirLock Preview Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">If you can see this card, the preview is working!</p>
          <Button>Test Button</Button>
        </CardContent>
      </Card>
    </div>
  )
}

