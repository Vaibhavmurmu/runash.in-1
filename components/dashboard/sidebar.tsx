"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Package, ShoppingCart, Users, Settings, Zap, LogOut } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const mainLinks = [
    { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { label: "Products", href: "/dashboard/products", icon: Package },
    { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
  ]

  const bottomLinks = [
    { label: "Analytics", href: "/dashboard/analytics", icon: Zap },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const NavLink = ({ href, icon: Icon, label }: any) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/10"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">{label}</span>
      </Link>
    )
  }

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col hidden md:flex">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-sidebar-foreground hidden sm:inline">SellerHub</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {mainLinks.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
      </nav>

      <div className="p-4 space-y-2 border-t border-sidebar-border">
        {bottomLinks.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/10 transition-colors text-sm font-medium">
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </aside>
  )
}
