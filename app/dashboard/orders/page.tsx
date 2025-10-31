import { OrdersHeader } from "@/components/orders/orders-header"
import { OrdersTable } from "@/components/orders/orders-detail-table"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <OrdersHeader />
      <OrdersTable />
    </div>
  )
}
