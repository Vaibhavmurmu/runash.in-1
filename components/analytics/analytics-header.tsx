import { Button } from "@/components/ui/button"
import { Database as DateRange } from "lucide-react"

export function AnalyticsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your sales and business metrics</p>
      </div>
      <Button variant="outline" className="gap-2 w-fit bg-transparent">
        <DateRange className="w-4 h-4" />
        Last 30 Days
      </Button>
    </div>
  )
}
