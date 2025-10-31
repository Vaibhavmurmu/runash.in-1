import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MetricsOverview } from "@/components/dashboard/metrics-overview"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { AIAssistant } from "@/components/dashboard/ai-assistant"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader />

        <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-5">
          <MetricsOverview />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <AIAssistant />
          </div>
        </div>

        <OrdersTable />
      </div>
    </DashboardLayout>
  )
}
