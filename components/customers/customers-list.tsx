"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Mail, Phone, TrendingUp } from "lucide-react"

const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0101",
    orders: 5,
    spent: "$1,499.95",
    status: "Active",
    joinDate: "2024-03-15",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0102",
    orders: 12,
    spent: "$3,299.88",
    status: "VIP",
    joinDate: "2024-01-20",
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1-555-0103",
    orders: 3,
    spent: "$599.97",
    status: "Active",
    joinDate: "2024-08-10",
  },
  {
    id: "CUST-004",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1-555-0104",
    orders: 1,
    spent: "$49.99",
    status: "Inactive",
    joinDate: "2024-09-25",
  },
  {
    id: "CUST-005",
    name: "Tom Brown",
    email: "tom@example.com",
    phone: "+1-555-0105",
    orders: 8,
    spent: "$2,199.92",
    status: "Active",
    joinDate: "2024-02-14",
  },
]

const statusColors: Record<string, string> = {
  VIP: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

export function CustomersList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Customers</CardTitle>
            <CardDescription>{filteredCustomers.length} total customers</CardDescription>
          </div>
          {selectedCustomers.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Send Email ({selectedCustomers.length})
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-colors flex items-center justify-between flex-wrap gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-fit">
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCustomers([...selectedCustomers, customer.id])
                    } else {
                      setSelectedCustomers(selectedCustomers.filter((id) => id !== customer.id))
                    }
                  }}
                  className="rounded"
                />
                <div>
                  <p className="font-semibold">{customer.name}</p>
                  <div className="flex gap-3 mt-1">
                    <a
                      href={`mailto:${customer.email}`}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    >
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </a>
                    <a
                      href={`tel:${customer.phone}`}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    >
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground text-xs">Orders</p>
                  <p className="font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    {customer.orders}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground text-xs">Total Spent</p>
                  <p className="font-semibold">{customer.spent}</p>
                </div>
                <Badge className={statusColors[customer.status]}>{customer.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
