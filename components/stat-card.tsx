import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
  trend?: { value: string; positive: boolean }
  variant?: "default" | "primary" | "warning" | "destructive" | "success"
}

const variantStyles = {
  default: "bg-card text-card-foreground",
  primary: "bg-primary text-primary-foreground",
  warning: "bg-warning text-warning-foreground",
  destructive: "bg-destructive/10 text-card-foreground border-destructive/20",
  success: "bg-success/10 text-card-foreground border-success/20",
}

const iconVariants = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  warning: "bg-warning-foreground/10 text-warning-foreground",
  destructive: "bg-destructive/20 text-destructive",
  success: "bg-success/20 text-success",
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  return (
    <Card className={cn("border", variantStyles[variant])}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className={cn("text-xs font-medium uppercase tracking-wider", variant === "primary" ? "text-primary-foreground/70" : "text-muted-foreground")}>
              {title}
            </p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {subtitle && (
              <p className={cn("text-xs", variant === "primary" ? "text-primary-foreground/60" : "text-muted-foreground")}>
                {subtitle}
              </p>
            )}
            {trend && (
              <p className={cn("text-xs font-medium", trend.positive ? "text-success" : "text-destructive")}>
                {trend.positive ? "+" : ""}{trend.value}
              </p>
            )}
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconVariants[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
