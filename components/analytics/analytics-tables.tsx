"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const topProducts = [
  { id: 1, name: "Premium Headphones", units: 342, revenue: "$102,558" },
  { id: 2, name: "Wireless Charger", units: 287, revenue: "$14,313" },
  { id: 3, name: "USB-C Cable", units: 456, revenue: "$11,384" },
  { id: 4, name: "Phone Case Pack", units: 124, revenue: "$11,176" },
  { id: 5, name: "Screen Protector", units: 892, revenue: "$17,858" },
]

const topTraffic = [
  { source: "Direct", visitors: 4234, bounceRate: "24%" },
  { source: "Google", visitors: 2124, bounceRate: "18%" },
  { source: "Social Media", visitors: 1892, bounceRate: "32%" },
  { source: "Referral", visitors: 1234, bounceRate: "14%" },
  { source: "Email", visitors: 892, bounceRate: "8%" },
]

export function AnalyticsTables() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Best performing products this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-8 h-8 flex items-center justify-center rounded-full">
                    {index + 1}
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.units} units sold</p>
                  </div>
                </div>
                <p className="font-semibold">{product.revenue}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Where your visitors come from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topTraffic.map((traffic) => (
              <div
                key={traffic.source}
                className="p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">{traffic.source}</p>
                  <Badge variant="outline">{traffic.bounceRate}</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${(traffic.visitors / 4234) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{traffic.visitors.toLocaleString()} visitors</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
