"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, Send, BarChart3 } from "lucide-react"

export function QuickActions() {
  const actions = [
    { icon: Plus, label: "Add Product", href: "/dashboard/products/new" },
    { icon: FileText, label: "Create Report", href: "/dashboard/reports" },
    { icon: Send, label: "Send Campaign", href: "/dashboard/campaigns" },
    { icon: BarChart3, label: "View Analytics", href: "/dashboard/analytics" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <action.icon className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
