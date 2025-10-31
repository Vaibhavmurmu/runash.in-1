"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const metrics = [
  {
    title: "Total Revenue",
    value: "$24,560",
    trend: "+12.5%",
    isPositive: true,
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "Orders",
    value: "342",
    trend: "+8.2%",
    isPositive: true,
    bgColor: "bg-teal-50 dark:bg-teal-950",
  },
  {
    title: "Customers",
    value: "1,240",
    trend: "+5.1%",
    isPositive: true,
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    trend: "-0.8%",
    isPositive: false,
    bgColor: "bg-amber-50 dark:bg-amber-950",
  },
  {
    title: "Avg. Order Value",
    value: "$72",
    trend: "+2.3%",
    isPositive: true,
    bgColor: "bg-green-50 dark:bg-green-950",
  },
]

export function MetricsOverview() {
  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title} className={`${metric.bgColor} border-0`}>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              <div className="flex items-end justify-between gap-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    metric.isPositive ? "text-green-600 dark:text-green-400" : "text-destructive"
                  }`}
                >
                  {metric.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.trend}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
