import { Zap } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground mt-1">Here's your sales overview for today</p>
      </div>
      <div className="ai-badge w-fit">
        <Zap className="w-4 h-4" />
        <span>AI-Powered Insights Ready</span>
      </div>
    </div>
  )
}
