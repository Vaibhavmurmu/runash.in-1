import { CustomersHeader } from "@/components/customers/customers-header"
import { CustomersList } from "@/components/customers/customers-list"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <CustomersHeader />
      <CustomersList />
    </div>
  )
}
