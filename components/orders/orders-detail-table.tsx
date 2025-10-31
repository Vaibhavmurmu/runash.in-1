"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight, Copy } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Premium Headphones",
    amount: "$299.99",
    status: "Delivered",
    date: "2024-10-25",
    items: 1,
    trackingNumber: "TRK-123456789",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Wireless Charger",
    amount: "$49.99",
    status: "Processing",
    date: "2024-10-25",
    items: 1,
    trackingNumber: "TRK-987654321",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "Phone Case Pack (x2)",
    amount: "$179.98",
    status: "Shipped",
    date: "2024-10-24",
    items: 2,
    trackingNumber: "TRK-456789123",
  },
  {
    id: "ORD-004",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    product: "Screen Protector",
    amount: "$19.99",
    status: "Delivered",
    date: "2024-10-24",
    items: 1,
    trackingNumber: "TRK-321654987",
  },
  {
    id: "ORD-005",
    customer: "Tom Brown",
    email: "tom@example.com",
    product: "USB-C Cable (x3)",
    amount: "$74.97",
    status: "Processing",
    date: "2024-10-23",
    items: 3,
    trackingNumber: "TRK-789123456",
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
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.includes(searchTerm.toUpperCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Complete order history and details</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by order ID, customer, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border border-border rounded-lg hover:border-primary/50 transition-colors">
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-4 flex-wrap gap-y-2">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm text-muted-foreground line-clamp-1">{order.product}</p>
                    </div>
                    <Badge className={statusColors[order.status]}>{order.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold hidden sm:block">{order.amount}</p>
                  <ChevronRight
                    className={`w-5 h-5 text-muted-foreground transition-transform ${expandedOrder === order.id ? "rotate-90" : ""}`}
                  />
                </div>
              </button>

              {expandedOrder === order.id && (
                <div className="border-t border-border bg-muted/20 p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Order ID</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-mono text-sm">{order.id}</p>
                        <button className="p-1 hover:bg-muted rounded">
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Items</p>
                      <p className="font-semibold mt-1">{order.items}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Total Amount</p>
                      <p className="font-semibold text-lg mt-1">{order.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Tracking Number</p>
                      <p className="font-mono text-sm mt-1">{order.trackingNumber}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Print Label
                    </Button>
                    <Button size="sm" variant="outline">
                      Send Notification
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
