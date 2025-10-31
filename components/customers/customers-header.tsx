import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"

export function CustomersHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customers</h1>
        <p className="text-muted-foreground mt-1">Manage customer relationships and interactions</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export
        </Button>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Add Customer
        </Button>
      </div>
    </div>
  )
}
