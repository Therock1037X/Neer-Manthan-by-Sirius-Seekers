"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/stat-card"
import { droughtPredictions, rainfallData } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  CloudRain,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Thermometer,
  Wind,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const CHART_COLORS = [
  "oklch(0.45 0.15 240)",
  "oklch(0.55 0.18 200)",
  "oklch(0.65 0.12 170)",
]

export function DroughtPredictionPage() {
  const extremeCount = droughtPredictions.filter((p) => p.severity === "Extreme" || p.severity === "Severe").length
  const avgProbability = Math.round(droughtPredictions.reduce((sum, p) => sum + p.probability, 0) / droughtPredictions.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Drought Prediction</h1>
        <p className="text-sm text-muted-foreground">AI-powered drought forecasting using weather, soil moisture, and historical data</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Avg Drought Risk" value={`${avgProbability}%`} icon={CloudRain} variant="warning" subtitle="Across monitored areas" />
        <StatCard title="High Risk Zones" value={extremeCount} icon={AlertTriangle} variant="destructive" subtitle="Extreme/Severe rating" />
        <StatCard title="Avg Temperature" value="38.5 C" icon={Thermometer} subtitle="Above normal by 2.3 C" />
        <StatCard title="Monsoon Deficit" value="12%" icon={Wind} subtitle="Below 30-year average" />
      </div>
      {/* 🌍 DROUGHT RISK HEATMAP MAP */}
<Card>
  <CardHeader>
    <CardTitle className="text-base">Drought Risk Heatmap (India)</CardTitle>
    <CardDescription>
      AI-predicted drought severity visualization across regions
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div className="h-[420px] rounded-lg overflow-hidden border relative">

      {/* Map */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html"
        className="absolute inset-0 w-full h-full"
      />

      {/* Heat overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 via-orange-400/30 to-blue-400/30 pointer-events-none" />

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur rounded-md px-3 py-2 text-xs space-y-1 border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded" /> Extreme
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-400 rounded" /> Severe
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded" /> Moderate
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded" /> Low Risk
        </div>
      </div>

    </div>
  </CardContent>
</Card>
      {/* Prediction cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {droughtPredictions.slice(0, 4).map((pred) => {
          const colorClass =
            pred.severity === "Extreme"
              ? "border-destructive/40 bg-destructive/5"
              : pred.severity === "Severe"
                ? "border-destructive/30 bg-destructive/5"
                : pred.severity === "Moderate"
                  ? "border-warning/30 bg-warning/5"
                  : "border-border bg-secondary/30"

          return (
            <Card key={pred.district} className={cn("transition-colors", colorClass)}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{pred.district}</p>
                    <p className="text-xs text-muted-foreground">{pred.state}</p>
                  </div>
                  <Badge
                    variant={pred.severity === "Extreme" || pred.severity === "Severe" ? "destructive" : pred.severity === "Moderate" ? "secondary" : "outline"}
                    className="text-[10px]"
                  >
                    {pred.severity}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Drought Probability</span>
                    <span className="text-sm font-bold font-mono">{pred.probability}%</span>
                  </div>
                  <Progress value={pred.probability} className="h-2" />
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {pred.trend === "increasing" ? (
                    <>
                      <TrendingUp className="h-3 w-3 text-destructive" />
                      <span className="text-destructive">Increasing risk</span>
                    </>
                  ) : pred.trend === "decreasing" ? (
                    <>
                      <TrendingDown className="h-3 w-3 text-success" />
                      <span className="text-success">Decreasing risk</span>
                    </>
                  ) : (
                    <>
                      <Minus className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Stable</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Chart & table */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Rainfall Trend Analysis</CardTitle>
            <CardDescription>Actual vs Predicted rainfall patterns (mm)</CardDescription>
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
                  <Area type="monotone" dataKey="actual" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.3} name="Actual" />
                  <Area type="monotone" dataKey="predicted" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.2} name="AI Predicted" />
                  <Area type="monotone" dataKey="normal" stroke={CHART_COLORS[2]} fill={CHART_COLORS[2]} fillOpacity={0.1} name="30yr Normal" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Summary panel */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="h-4 w-4 text-primary" />
              Prediction Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 space-y-2">
              <p className="text-xs font-semibold text-destructive">High Alert</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Jodhpur and Indore districts show extreme drought probability exceeding 80%. Immediate water conservation measures recommended.
              </p>
            </div>
            <div className="rounded-lg bg-warning/10 border border-warning/20 p-3 space-y-2">
              <p className="text-xs font-semibold text-warning-foreground">Monsoon Outlook</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                AI models predict 12% below-normal monsoon for western regions. Eastern and northeastern regions expected to receive normal rainfall.
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 space-y-2">
              <p className="text-xs font-semibold text-primary">AI Recommendation</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Pre-position water tankers in high-risk districts. Activate groundwater recharge programs in moderate-risk zones.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">All District Predictions</CardTitle>
              <CardDescription>Complete 30-day drought forecast</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Brain className="h-3 w-3" /> ML Model v3.2
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
                      <span className="text-sm font-mono font-medium">{pred.probability}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        pred.severity === "Extreme" || pred.severity === "Severe"
                          ? "destructive"
                          : pred.severity === "Moderate"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-[10px]"
                    >
                      {pred.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {pred.trend === "increasing" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-destructive" />
                      ) : pred.trend === "decreasing" ? (
                        <TrendingDown className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className="text-sm capitalize">{pred.trend}</span>
                    </div>
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
