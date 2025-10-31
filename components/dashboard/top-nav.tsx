"use client"

import { Bell, Search, Settings, User, Zap } from "lucide-react"

export function TopNav() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex-1 flex items-center gap-4 max-w-md">
        <div className="relative hidden md:block flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search orders, products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        <div className="ai-badge hidden sm:flex">
          <Zap className="w-4 h-4" />
          <span>AI Ready</span>
        </div>

        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-foreground" />
        </button>

        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <User className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  )
}
