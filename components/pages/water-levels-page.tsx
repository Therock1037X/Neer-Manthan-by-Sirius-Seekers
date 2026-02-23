"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCard } from "@/components/alert-card"
import { StatCard } from "@/components/stat-card"
import { districts, dwlrSensors, alerts } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  Droplets,
  AlertTriangle,
  Activity,
  MapPin,
  Gauge,
  Radio,
  ArrowDown,
  ArrowUp,
  Minus,
} from "lucide-react"

export function WaterLevelsPage() {
  const [selectedState, setSelectedState] = useState("all")

  const states = [...new Set(districts.map((d) => d.state))]
  const filteredDistricts = selectedState === "all" ? districts : districts.filter((d) => d.state === selectedState)
  const avgLevel = Math.round(filteredDistricts.reduce((sum, d) => sum + d.waterLevel, 0) / filteredDistricts.length)
  const criticalCount = filteredDistricts.filter((d) => d.riskLevel === "critical").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Water Level Monitoring</h1>
          <p className="text-sm text-muted-foreground">Real-time groundwater and surface water monitoring with DWLR sensors</p>
        </div>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {states.map((state) => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Average Level" value={`${avgLevel}%`} icon={Droplets} variant="primary" subtitle="Across selected area" />
        <StatCard title="Critical Zones" value={criticalCount} icon={AlertTriangle} variant="destructive" subtitle="Immediate attention" />
        <StatCard title="DWLR Sensors" value={dwlrSensors.length} icon={Radio} subtitle="Active sensors" />
        <StatCard title="Data Freshness" value="2 min" icon={Activity} variant="success" subtitle="Last update" />
      </div>

      {/* Heatmap placeholder + alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Water Level Heatmap</CardTitle>
            <CardDescription>District-wise water availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {filteredDistricts.map((district) => {
                const bgColor =
                  district.riskLevel === "critical"
                    ? "bg-destructive/20 border-destructive/40"
                    : district.riskLevel === "high"
                      ? "bg-warning/20 border-warning/40"
                      : district.riskLevel === "moderate"
                        ? "bg-primary/10 border-primary/30"
                        : "bg-success/10 border-success/30"

                return (
                  <div
                    key={district.name}
                    className={cn("rounded-lg border p-3 text-center space-y-1 transition-colors hover:ring-1 hover:ring-primary/50 cursor-pointer", bgColor)}
                  >
                    <p className="text-xs font-semibold truncate">{district.name}</p>
                    <p className="text-lg font-bold font-mono">{district.waterLevel}%</p>
                    <p className="text-[10px] text-muted-foreground">{district.state}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-destructive/20 border border-destructive/40" />
                <span className="text-[10px] text-muted-foreground">Critical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-warning/20 border border-warning/40" />
                <span className="text-[10px] text-muted-foreground">High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-primary/10 border border-primary/30" />
                <span className="text-[10px] text-muted-foreground">Moderate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-success/10 border border-success/30" />
                <span className="text-[10px] text-muted-foreground">Low Risk</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.filter((a) => a.type === "critical" || a.type === "warning").slice(0, 4).map((alert) => (
                <AlertCard
                  key={alert.id}
                  type={alert.type as "critical" | "warning" | "info"}
                  title={alert.title}
                  message={alert.message}
                  time={alert.time}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DWLR Sensor Readings */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">DWLR Sensor Readings</CardTitle>
              <CardDescription>Digital Water Level Recorder - Live Data</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Activity className="h-3 w-3" /> Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sensor ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Depth (m)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Reading</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dwlrSensors.map((sensor, i) => (
                <TableRow key={sensor.id}>
                  <TableCell className="font-mono text-xs">{sensor.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{sensor.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-mono">{sensor.depth}m</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        sensor.status === "critical" ? "destructive" :
                        sensor.status === "warning" ? "secondary" : "outline"
                      }
                      className="text-[10px]"
                    >
                      {sensor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{sensor.lastReading}</TableCell>
                  <TableCell>
                    {i % 3 === 0 ? (
                      <ArrowDown className="h-4 w-4 text-destructive" />
                    ) : i % 3 === 1 ? (
                      <ArrowUp className="h-4 w-4 text-success" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
