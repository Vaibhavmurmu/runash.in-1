import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AccountSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">First Name</label>
              <Input className="mt-2" placeholder="John" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Last Name</label>
              <Input className="mt-2" placeholder="Doe" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input className="mt-2" type="email" placeholder="john@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Company</label>
            <Input className="mt-2" placeholder="Your Company" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
          <CardDescription>Manage your seller profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Bio</label>
            <textarea
              placeholder="Tell us about your business..."
              className="w-full mt-2 p-3 rounded-lg border border-input bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={4}
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}
