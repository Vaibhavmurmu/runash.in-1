"use client"

import { useState } from "react"
import { User, Lock, Bell, CreditCard, Database } from "lucide-react"

export function SettingsNav() {
  const [activeTab, setActiveTab] = useState("account")

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "data", label: "Data", icon: Database },
  ]

  return (
    <div className="space-y-2">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary/50 text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
