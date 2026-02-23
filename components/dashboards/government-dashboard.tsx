"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/stat-card"
import { AlertCard } from "@/components/alert-card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  alerts,
  districts,
  reservoirs,
  rainfallData,
  waterConsumption,
  droughtPredictions,
  tankerOrders,
} from "@/lib/mock-data"
import {
  Droplets,
  CloudRain,
  Truck,
  Users,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Brain,
  Map,
  Zap,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const CHART_COLORS = [
  "oklch(0.45 0.15 240)",
  "oklch(0.55 0.18 200)",
  "oklch(0.65 0.12 170)",
  "oklch(0.55 0.22 27)",
  "oklch(0.7 0.15 80)",
]

export function GovernmentDashboard() {
  const criticalCount = districts.filter((d) => d.riskLevel === "critical").length
  const highCount = districts.filter((d) => d.riskLevel === "high").length
  const pendingOrders = tankerOrders.filter((o) => o.status === "pending").length

  const riskDistribution = [
    { name: "Critical", value: criticalCount, color: "oklch(0.55 0.22 27)" },
    { name: "High", value: highCount, color: "oklch(0.7 0.15 80)" },
    { name: "Moderate", value: districts.filter((d) => d.riskLevel === "moderate").length, color: "oklch(0.55 0.18 200)" },
    { name: "Low", value: districts.filter((d) => d.riskLevel === "low").length, color: "oklch(0.45 0.15 240)" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Government Command Center</h1>
          <p className="text-sm text-muted-foreground">National water overview with AI-driven drought prediction and tanker management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Map className="mr-2 h-4 w-4" />
            Map View
          </Button>
          <Button size="sm">
            <Brain className="mr-2 h-4 w-4" />
            AI Suggestions
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Districts Monitored" value="750" icon={Map} subtitle="All India" />
        <StatCard title="Critical Zones" value={criticalCount + highCount} icon={AlertTriangle} variant="destructive" subtitle={`${criticalCount} critical, ${highCount} high`} />
        <StatCard title="Active Tankers" value="342" icon={Truck} variant="primary" subtitle="Across 18 states" />
        
        <StatCard title="Population Affected" value="2.8M" icon={Users} subtitle="In drought zones" />
      </div>

      {/* Main tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Rainfall chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Rainfall Analysis</CardTitle>
                <CardDescription>Actual vs Predicted vs Normal (mm)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={rainfallData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" tick={{ fill: "oklch(0.5 0.02 240)" }} />
                      <YAxis className="text-xs" tick={{ fill: "oklch(0.5 0.02 240)" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1 0 0)",
                          border: "1px solid oklch(0.9 0.02 230)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Area type="monotone" dataKey="actual" stackId="1" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.3} name="Actual" />
                      <Area type="monotone" dataKey="predicted" stackId="2" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.2} name="Predicted" />
                      <Area type="monotone" dataKey="normal" stackId="3" stroke={CHART_COLORS[2]} fill={CHART_COLORS[2]} fillOpacity={0.1} name="Normal" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk distribution */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Risk Distribution</CardTitle>
                <CardDescription>Districts by drought risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {riskDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Water consumption */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Water Consumption Trends</CardTitle>
              <CardDescription>Monthly consumption by sector (Million Litres)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterConsumption}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: "oklch(0.5 0.02 240)" }} />
                    <YAxis className="text-xs" tick={{ fill: "oklch(0.5 0.02 240)" }} />
                    <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", backgroundColor: "oklch(1 0 0)", border: "1px solid oklch(0.9 0.02 230)" }} />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar dataKey="domestic" fill={CHART_COLORS[0]} name="Domestic" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="industrial" fill={CHART_COLORS[1]} name="Industrial" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="agricultural" fill={CHART_COLORS[2]} name="Agricultural" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Reservoir status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Major Reservoir Status</CardTitle>
              <CardDescription>Current storage capacity of key reservoirs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reservoirs.map((reservoir) => {
                  const percent = Math.round((reservoir.current / reservoir.capacity) * 100)
                  return (
                    <div key={reservoir.name} className="rounded-lg border bg-secondary/30 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold">{reservoir.name}</p>
                          <p className="text-xs text-muted-foreground">{reservoir.state}</p>
                        </div>
                        <Badge variant={percent < 40 ? "destructive" : percent < 60 ? "secondary" : "outline"}>
                          {percent}%
                        </Badge>
                      </div>
                      <Progress value={percent} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Current: {reservoir.current} MCM</span>
                        <span>Max: {reservoir.capacity} MCM</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">AI Drought Predictions</CardTitle>
                  <CardDescription>30-day forecast by district using ML models</CardDescription>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Brain className="h-3 w-3" /> AI Model v3.2
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>District</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {droughtPredictions.map((pred) => (
                    <TableRow key={pred.district}>
                      <TableCell className="font-medium">{pred.district}</TableCell>
                      <TableCell className="text-muted-foreground">{pred.state}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={pred.probability} className="h-2 w-20" />
                          <span className="text-sm font-mono">{pred.probability}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            pred.severity === "Extreme" ? "destructive" :
                            pred.severity === "Severe" ? "destructive" :
                            pred.severity === "Moderate" ? "secondary" : "outline"
                          }
                          className="text-[10px]"
                        >
                          {pred.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={
                          pred.trend === "increasing" ? "text-destructive text-sm" :
                          pred.trend === "decreasing" ? "text-success text-sm" : "text-muted-foreground text-sm"
                        }>
                          {pred.trend === "increasing" ? "Increasing" : pred.trend === "decreasing" ? "Decreasing" : "Stable"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="h-4 w-4 text-primary" />
                  AI Reservoir Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based on current inflow patterns and predicted monsoon deficit of 12%, recommend increasing Mettur Dam release by 15% over next 2 weeks to maintain downstream supply.
                </p>
                <div className="flex gap-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="outline">Review Details</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="h-4 w-4 text-primary" />
                  AI Tanker Dispatch Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Optimized dispatch plan for Jodhpur district: Deploy 8 tankers via Route A (cost-efficient) and 4 tankers via Route B (time-critical). Est. coverage: 85% demand.
                </p>
                <div className="flex gap-2">
                  <Button size="sm">Deploy</Button>
                  <Button size="sm" variant="outline">Modify Plan</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tankers" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard title="Total Tankers" value="342" icon={Truck} variant="primary" />
            <StatCard title="Active Dispatches" value="156" icon={TrendingUp} />
            <StatCard title="Water Purchased" value="2.4M L" icon={Droplets} subtitle="From corporations today" />
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent Tanker Orders</CardTitle>
              <CardDescription>Monitor all incoming and dispatched orders</CardDescription>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tankerOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">{order.id}</TableCell>
                      <TableCell className="font-medium">{order.customer}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{order.location}</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <StatCard title="Critical Alerts" value="2" icon={AlertTriangle} variant="destructive" />
            <StatCard title="Warning Alerts" value="2" icon={CloudRain} variant="warning" />
            <StatCard title="Info Updates" value="1" icon={BarChart3} />
          </div>
          <div className="grid gap-3">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                type={alert.type as "critical" | "warning" | "info"}
                title={alert.title}
                message={alert.message}
                time={alert.time}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
