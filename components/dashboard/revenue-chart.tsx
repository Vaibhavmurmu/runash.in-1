"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { date: "Mon", revenue: 4000, orders: 24 },
  { date: "Tue", revenue: 3200, orders: 18 },
  { date: "Wed", revenue: 5800, orders: 32 },
  { date: "Thu", revenue: 4200, orders: 28 },
  { date: "Fri", revenue: 6800, orders: 42 },
  { date: "Sat", revenue: 5500, orders: 35 },
  { date: "Sun", revenue: 6200, orders: 38 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Orders</CardTitle>
        <CardDescription>Last 7 days performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="var(--color-chart-1)" name="Revenue ($)" />
            <Bar dataKey="orders" fill="var(--color-chart-2)" name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
