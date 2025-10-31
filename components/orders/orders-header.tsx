"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, Download } from "lucide-react"
import { useState } from "react"

export function OrdersHeader() {
  const [statusFilter, setStatusFilter] = useState("all")

  const statuses = [
    { value: "all", label: "All Orders", count: 342 },
    { value: "processing", label: "Processing", count: 24 },
    { value: "shipped", label: "Shipped", count: 89 },
    { value: "delivered", label: "Delivered", count: 215 },
    { value: "cancelled", label: "Cancelled", count: 14 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage all your orders and shipments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => setStatusFilter(status.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-colors whitespace-nowrap text-sm font-medium ${
                  statusFilter === status.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {status.label}
                <span className="ml-2 text-xs opacity-70">({status.count})</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
