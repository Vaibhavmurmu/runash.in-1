import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { AnalyticsCharts } from "@/components/analytics/analytics-charts"
import { AnalyticsTables } from "@/components/analytics/analytics-tables"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <AnalyticsCharts />
      <AnalyticsTables />
    </div>
  )
}
