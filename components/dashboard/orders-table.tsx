"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Search } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Premium Headphones",
    amount: "$299.99",
    status: "Delivered",
    date: "2024-10-25",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Wireless Charger",
    amount: "$49.99",
    status: "Processing",
    date: "2024-10-25",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "Phone Case Pack",
    amount: "$89.99",
    status: "Shipped",
    date: "2024-10-24",
  },
  {
    id: "ORD-004",
    customer: "Sarah Williams",
    product: "Screen Protector",
    amount: "$19.99",
    status: "Delivered",
    date: "2024-10-24",
  },
  {
    id: "ORD-005",
    customer: "Tom Brown",
    product: "USB-C Cable",
    amount: "$24.99",
    status: "Processing",
    date: "2024-10-23",
  },
]

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Shipped: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.includes(searchTerm.toUpperCase()) || order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Manage and track your orders</CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/90">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-semibold text-muted-foreground p-2">Order ID</th>
                <th className="text-left font-semibold text-muted-foreground p-2">Customer</th>
                <th className="text-left font-semibold text-muted-foreground p-2">Product</th>
                <th className="text-right font-semibold text-muted-foreground p-2">Amount</th>
                <th className="text-center font-semibold text-muted-foreground p-2">Status</th>
                <th className="text-center font-semibold text-muted-foreground p-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="font-medium p-2">{order.id}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className="text-muted-foreground p-2">{order.product}</td>
                  <td className="text-right font-semibold p-2">{order.amount}</td>
                  <td className="text-center p-2">
                    <Badge className={statusColors[order.status]}>{order.status}</Badge>
                  </td>
                  <td className="text-center p-2">
                    <button className="hover:bg-muted p-1 rounded">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
