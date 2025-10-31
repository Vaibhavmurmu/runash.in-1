"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Edit, Trash2, Eye } from "lucide-react"

const mockProducts = [
  {
    id: "PROD-001",
    name: "Premium Headphones",
    sku: "HD-PREM-001",
    category: "Electronics",
    price: "$299.99",
    stock: 45,
    status: "Active",
    sales: 1245,
  },
  {
    id: "PROD-002",
    name: "Wireless Charger",
    sku: "CHG-WI-001",
    category: "Accessories",
    price: "$49.99",
    stock: 128,
    status: "Active",
    sales: 3420,
  },
  {
    id: "PROD-003",
    name: "Phone Case Pack",
    sku: "CASE-PK-001",
    category: "Protection",
    price: "$89.99",
    stock: 2,
    status: "Low Stock",
    sales: 892,
  },
  {
    id: "PROD-004",
    name: "Screen Protector",
    sku: "PROT-SCR-001",
    category: "Protection",
    price: "$19.99",
    stock: 0,
    status: "Out of Stock",
    sales: 1534,
  },
  {
    id: "PROD-005",
    name: "USB-C Cable",
    sku: "CABLE-USB-001",
    category: "Cables",
    price: "$24.99",
    stock: 340,
    status: "Active",
    sales: 4567,
  },
]

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Low Stock": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  "Out of Stock": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

export function ProductList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.sku.includes(searchTerm.toUpperCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>{filteredProducts.length} products total</CardDescription>
          </div>
          {selectedProducts.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Delete ({selectedProducts.length})
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
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left font-semibold text-muted-foreground p-2">Product</th>
                <th className="text-left font-semibold text-muted-foreground p-2">Category</th>
                <th className="text-right font-semibold text-muted-foreground p-2">Price</th>
                <th className="text-center font-semibold text-muted-foreground p-2">Stock</th>
                <th className="text-center font-semibold text-muted-foreground p-2">Sales</th>
                <th className="text-center font-semibold text-muted-foreground p-2">Status</th>
                <th className="text-center font-semibold text-muted-foreground p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts([...selectedProducts, product.id])
                        } else {
                          setSelectedProducts(selectedProducts.filter((id) => id !== product.id))
                        }
                      }}
                      className="rounded"
                    />
                  </td>
                  <td className="p-2">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                    </div>
                  </td>
                  <td className="text-muted-foreground p-2">{product.category}</td>
                  <td className="text-right font-semibold p-2">{product.price}</td>
                  <td className="text-center p-2">
                    <span className={product.stock < 10 ? "text-destructive font-medium" : ""}>{product.stock}</span>
                  </td>
                  <td className="text-center text-muted-foreground p-2">{product.sales}</td>
                  <td className="text-center p-2">
                    <Badge className={statusColors[product.status]}>{product.status}</Badge>
                  </td>
                  <td className="text-center p-2">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1 hover:bg-muted rounded transition-colors" title="View">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded transition-colors" title="Edit">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1 hover:bg-destructive/10 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
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
