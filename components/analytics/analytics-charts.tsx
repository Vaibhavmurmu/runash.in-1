"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const revenueData = [
  { day: "1", revenue: 2400, target: 2400 },
  { day: "3", revenue: 1398, target: 2210 },
  { day: "5", revenue: 9800, target: 2290 },
  { day: "7", revenue: 3908, target: 2000 },
  { day: "9", revenue: 4800, target: 2181 },
  { day: "11", revenue: 3800, target: 2500 },
  { day: "13", revenue: 4300, target: 2100 },
  { day: "15", revenue: 5200, target: 2300 },
  { day: "17", revenue: 4100, target: 2400 },
  { day: "19", revenue: 6200, target: 2500 },
  { day: "21", revenue: 5800, target: 2400 },
]

const categoryData = [
  { category: "Electronics", sales: 4000 },
  { category: "Accessories", sales: 3000 },
  { category: "Protection", sales: 2000 },
  { category: "Cables", sales: 2780 },
  { category: "Audio", sales: 1890 },
]

const conversionData = [
  { hour: "00:00", visitors: 400, conversions: 24 },
  { hour: "04:00", visitors: 300, conversions: 14 },
  { hour: "08:00", visitors: 200, conversions: 9 },
  { hour: "12:00", visitors: 278, conversions: 39 },
  { hour: "16:00", visitors: 189, conversions: 20 },
  { hour: "20:00", visitors: 239, conversions: 29 },
  { hour: "23:59", visitors: 349, conversions: 31 },
]

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Daily revenue vs. target</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                fill="var(--color-chart-1)"
                stroke="var(--color-chart-1)"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="target"
                fill="var(--color-chart-2)"
                stroke="var(--color-chart-2)"
                name="Target"
                opacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
          <CardDescription>Product category performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis
                dataKey="category"
                type="category"
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: "12px" }}
                width={80}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Bar dataKey="sales" fill="var(--color-chart-3)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Hourly Conversion Analysis</CardTitle>
          <CardDescription>Visitors and conversions throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Legend />
              <Bar dataKey="visitors" fill="var(--color-chart-4)" name="Visitors" />
              <Bar dataKey="conversions" fill="var(--color-chart-1)" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
