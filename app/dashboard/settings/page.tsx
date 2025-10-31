import { SettingsNav } from "@/components/settings/settings-nav"
import { AccountSettings } from "@/components/settings/account-settings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        <SettingsNav />
        <div className="lg:col-span-3">
          <AccountSettings />
        </div>
      </div>
    </div>
  )
}
