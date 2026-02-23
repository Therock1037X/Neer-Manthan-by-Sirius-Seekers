"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { AlertCard } from "@/components/alert-card"
import { Progress } from "@/components/ui/progress"
import { alerts, districts, reservoirs } from "@/lib/mock-data"
import {
  Droplets,
  CloudRain,
  ThermometerSun,
  Wind,
  ArrowRight,
  MapPin,
  Truck,
} from "lucide-react"

export function PublicDashboard() {
  const publicAlerts = alerts.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Water Status Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Real-time groundwater levels, drought alerts, and tanker ordering for your area
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Ground Water Level"
          value="47.2%"
          subtitle="Across monitored districts"
          icon={Droplets}
          variant="primary"
        />
        <StatCard
          title="Active Alerts"
          value="5"
          subtitle="2 critical, 3 warning"
          icon={CloudRain}
          variant="destructive"
        />
        <StatCard
          title="Temperature"
          value="38.5 C"
          subtitle="Regional average"
          icon={ThermometerSun}
          variant="warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Water levels by district */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">District Ground Water Levels</CardTitle>
              <CardDescription>Real-time groundwater monitoring</CardDescription>
            </div>
            <Link href="/dashboard/water-levels">
              <Button variant="ghost" size="sm" className="text-xs">
                View Map <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {districts.slice(0, 6).map((district) => (
                <div key={district.name} className="flex items-center gap-4">
                  <div className="flex w-32 items-center gap-2">
                    <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
                    <span className="truncate text-sm font-medium">{district.name}</span>
                  </div>
                  <div className="flex-1">
                    <Progress value={district.waterLevel} className="h-2" />
                  </div>
                  <span className="w-10 text-right text-sm font-mono font-medium">
                    {district.waterLevel}%
                  </span>
                  <Badge className="w-16 justify-center text-[10px]">
                    {district.riskLevel}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Drought Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {publicAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  type={alert.type as "critical" | "warning" | "info"}
                  title={alert.title}
                  message={alert.message}
                  time={alert.time}
                />
              ))}
            </div>

            <Link href="/dashboard/drought-prediction">
              <Button variant="outline" className="mt-4 w-full">
                View Drought Map
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Reservoir status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Major Reservoir Status</CardTitle>
          <CardDescription>Current storage levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {reservoirs.slice(0, 4).map((reservoir) => {
              const percent = Math.round((reservoir.current / reservoir.capacity) * 100)
              return (
                <div key={reservoir.name} className="rounded-lg border bg-secondary/30 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{reservoir.name}</p>
                    <Badge variant="outline" className="text-[10px]">{reservoir.state}</Badge>
                  </div>
                  <Progress value={percent} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{reservoir.current} MCM</span>
                    <span className="font-medium">{percent}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tanker Order */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order Water Tanker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/dashboard/tanker-order">
            <Button size="lg" className="w-full">
              <Truck className="mr-2 h-4 w-4" />
              Request Tanker
            </Button>
          </Link>

          <div className="rounded-lg border bg-secondary/20 p-3 text-sm">
            <p><strong>Estimated Arrival:</strong> 45 minutes</p>
            <p><strong>Transaction ID:</strong> NM-2024-001</p>
          </div>
        </CardContent>
      </Card>

      {/* Weather */}
      <Card>
        <CardContent className="p-4 text-center">
          <Wind className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Weather: Partly cloudy, 38.5 C</p>
          <p className="text-[11px] text-muted-foreground/70">Humidity: 32% | Wind: 12 km/h</p>
        </CardContent>
      </Card>
    </div>
  )
}