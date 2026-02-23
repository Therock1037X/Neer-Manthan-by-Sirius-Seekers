"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCard } from "@/components/alert-card"
import { StatCard } from "@/components/stat-card"
import { districts, dwlrSensors, alerts } from "@/lib/mock-data"
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
  const filteredDistricts =
    selectedState === "all" ? districts : districts.filter((d) => d.state === selectedState)

  const avgLevel = Math.round(
    filteredDistricts.reduce((sum, d) => sum + d.waterLevel, 0) / filteredDistricts.length
  )
  const criticalCount = filteredDistricts.filter((d) => d.riskLevel === "critical").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Water Level Monitoring</h1>
          <p className="text-sm text-muted-foreground">
            Real-time groundwater monitoring with DWLR sensors
          </p>
        </div>

        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Average Level" value={`${avgLevel}%`} icon={Droplets} variant="primary" />
        <StatCard title="Critical Zones" value={criticalCount} icon={AlertTriangle} variant="destructive" />
        <StatCard title="DWLR Sensors" value={dwlrSensors.length} icon={Radio} />
        <StatCard title="Data Freshness" value="2 min" icon={Activity} variant="success" />
      </div>

      {/* 🌍 MAP HEATMAP + ALERTS */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Water Level Heatmap (India)</CardTitle>
            <CardDescription>District-wise groundwater visualization</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-[420px] rounded-lg overflow-hidden border relative">

              {/* Map */}
              <iframe
                src="https://www.openstreetmap.org/export/embed.html"
                className="absolute inset-0 w-full h-full"
              />

              {/* Heat overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/40 via-yellow-400/30 to-blue-400/30 pointer-events-none" />

              {/* Legend */}
              <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur rounded-md px-3 py-2 text-xs space-y-1 border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded" /> Critical
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded" /> Moderate
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded" /> Safe
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Critical Alerts</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {alerts
              .filter((a) => a.type === "critical" || a.type === "warning")
              .slice(0, 4)
              .map((alert) => (
                <AlertCard
                  key={alert.id}
                  type={alert.type as "critical" | "warning" | "info"}
                  title={alert.title}
                  message={alert.message}
                  time={alert.time}
                />
              ))}
          </CardContent>
        </Card>
      </div>

      {/* DWLR Sensor Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">DWLR Sensor Readings</CardTitle>
          <CardDescription>Live groundwater monitoring</CardDescription>
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

                  <TableCell className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {sensor.location}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
                      {sensor.depth}m
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">{sensor.status}</Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {sensor.lastReading}
                  </TableCell>

                  <TableCell>
                    {i % 3 === 0 ? (
                      <ArrowDown className="text-destructive" />
                    ) : i % 3 === 1 ? (
                      <ArrowUp className="text-green-500" />
                    ) : (
                      <Minus />
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