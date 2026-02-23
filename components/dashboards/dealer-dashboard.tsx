"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/stat-card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { tankerOrders } from "@/lib/mock-data"
import {
  Truck,
  Package,
  Route,
  DollarSign,
  Clock,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Phone,
  Droplets,
} from "lucide-react"

const routes = [
  { id: "RT-01", from: "Central Depot", to: "Jaipur Sector 12", distance: "24 km", eta: "45 min", tanker: "TK-104", status: "in-transit" },
  { id: "RT-02", from: "East Hub", to: "Jodhpur Block C", distance: "38 km", eta: "1 hr 10 min", tanker: "TK-107", status: "in-transit" },
  { id: "RT-03", from: "Central Depot", to: "Ahmedabad Ward 7", distance: "12 km", eta: "25 min", tanker: "TK-112", status: "loading" },
  { id: "RT-04", from: "South Terminal", to: "Chennai Zone 4", distance: "31 km", eta: "55 min", tanker: "TK-119", status: "queued" },
  { id: "RT-05", from: "West Hub", to: "Indore Area 3", distance: "18 km", eta: "35 min", tanker: "TK-121", status: "in-transit" },
]

export function DealerDashboard() {
  const pendingOrders = tankerOrders.filter((o) => o.status === "pending")
  const dispatchedOrders = tankerOrders.filter((o) => o.status === "dispatched")
  const deliveredOrders = tankerOrders.filter((o) => o.status === "delivered")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Tanker Operations</h1>
          <p className="text-sm text-muted-foreground">Manage incoming orders, route allocation, and dispatch status</p>
        </div>
        <Button size="sm">
          <Phone className="mr-2 h-4 w-4" />
          Contact Control Room
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Pending Orders" value={pendingOrders.length} icon={Package} variant="warning" subtitle="Awaiting dispatch" />
        <StatCard title="In Transit" value={dispatchedOrders.length} icon={Truck} variant="primary" subtitle="Currently delivering" />
        <StatCard title="Delivered Today" value={deliveredOrders.length} icon={CheckCircle2} variant="success" subtitle="Successfully completed" />
        <StatCard title="Govt. Purchase" value="48K L" icon={DollarSign} subtitle="Total water purchased today" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Incoming Orders</TabsTrigger>
          <TabsTrigger value="routes">Route Planning</TabsTrigger>
          <TabsTrigger value="dispatch">Dispatch Status</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Order Queue</CardTitle>
                  <CardDescription>All incoming water tanker orders</CardDescription>
                </div>
                <Badge variant="secondary">{tankerOrders.length} Total</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tankerOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">{order.id}</TableCell>
                      <TableCell className="font-medium">{order.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {order.location}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{(order.quantity / 1000).toFixed(0)}K L</TableCell>
                      <TableCell>
                        <Badge
                          variant={order.priority === "critical" ? "destructive" : order.priority === "high" ? "destructive" : "secondary"}
                          className="text-[10px]"
                        >
                          {order.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={order.status === "pending" ? "outline" : order.status === "dispatched" ? "secondary" : "default"}
                          className="text-[10px]"
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {order.status === "pending" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Dispatch <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        )}
                        {order.status === "dispatched" && (
                          <Button size="sm" variant="ghost" className="h-7 text-xs">
                            Track
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Active Routes</CardTitle>
              <CardDescription>Current tanker route allocations and ETAs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="flex items-center gap-4 rounded-lg border bg-secondary/20 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Route className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{route.id}</span>
                        <Badge
                          variant={route.status === "in-transit" ? "default" : route.status === "loading" ? "secondary" : "outline"}
                          className="text-[10px]"
                        >
                          {route.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">
                        {route.from} <ArrowRight className="inline h-3 w-3 mx-1" /> {route.to}
                      </p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Tanker: {route.tanker}</span>
                        <span>Distance: {route.distance}</span>
                        <span>ETA: {route.eta}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0">
                      View Map
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dispatch" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Fleet Utilization</p>
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">78%</p>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground">18 of 23 tankers active</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Avg Delivery Time</p>
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">2h 15m</p>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: 2h 00m</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Water Delivered</p>
                    <Droplets className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">124K L</p>
                  <Progress value={82} className="h-2" />
                  <p className="text-xs text-muted-foreground">Daily target: 150K L</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Dispatch Timeline</CardTitle>
              <CardDescription>Recent dispatch activity log</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "14:32", action: "TK-107 dispatched to Jodhpur Block C", status: "dispatched" },
                  { time: "13:45", action: "TK-112 loaded at Central Depot (10,000L)", status: "loading" },
                  { time: "12:20", action: "TK-104 delivered to Jaipur Sector 12", status: "delivered" },
                  { time: "11:15", action: "TK-119 queued for Chennai Zone 4", status: "queued" },
                  { time: "10:30", action: "TK-121 dispatched to Indore Area 3", status: "dispatched" },
                  { time: "09:45", action: "TK-103 delivered to Nagpur Ward 5", status: "delivered" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-12 text-xs font-mono text-muted-foreground">{item.time}</span>
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="flex-1 text-sm">{item.action}</span>
                    <Badge variant={item.status === "delivered" ? "default" : item.status === "dispatched" ? "secondary" : "outline"} className="text-[10px]">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
