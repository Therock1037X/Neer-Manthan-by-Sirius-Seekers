"use client"

import { useState } from "react"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Droplets, Users, ShieldCheck, Truck, ArrowRight, Lock, User } from "lucide-react"

const roles: { value: UserRole; label: string; description: string; icon: React.ElementType }[] = [
  {
    value: "public",
    label: "Public User",
    description: "Check water levels, drought alerts, and order tankers",
    icon: Users,
  },
  {
    value: "government",
    label: "Government Authority",
    description: "Full system access with predictions and management tools",
    icon: ShieldCheck,
  },
  {
    value: "dealer",
    label: "Tanker Dealer",
    description: "Manage incoming orders, routes, and dispatch",
    icon: Truck,
  },
]

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("public")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      login(selectedRole, name.trim())
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel - branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20">
            <Droplets className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-primary-foreground">Neer Manthan</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-primary-foreground text-balance">
            AI Powered Drought Prediction & Smart Water Tanker Management
          </h1>
          <p className="max-w-md text-base leading-relaxed text-primary-foreground/70">
            Leveraging satellite data, DWLR sensors, and machine learning to predict droughts and efficiently manage water distribution across districts.
          </p>
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-bold text-primary-foreground">750+</p>
              <p className="text-sm text-primary-foreground/60">Districts Monitored</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-foreground">1.2K</p>
              <p className="text-sm text-primary-foreground/60">DWLR Sensors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-foreground">98.5%</p>
              <p className="text-sm text-primary-foreground/60">Prediction Accuracy</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-primary-foreground/40">
          Neer Manthan by Sirius Seekers
        </p>
      </div>

      {/* Right panel - login form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Neer Manthan</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground">Select your role and enter your credentials to continue</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Select Role</Label>
            <div className="grid gap-3">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border p-4 text-left transition-all",
                    selectedRole === role.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-primary/40 hover:bg-secondary/50"
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    selectedRole === role.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  )}>
                    <role.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{role.label}</p>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </div>
                  <div className={cn(
                    "h-4 w-4 rounded-full border-2",
                    selectedRole === role.value ? "border-primary bg-primary" : "border-muted-foreground/30"
                  )}>
                    {selectedRole === role.value && (
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            This is a demo system. Enter any name to proceed.
          </p>
        </div>
      </div>
    </div>
  )
}
