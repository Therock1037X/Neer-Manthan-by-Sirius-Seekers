import { cn } from "@/lib/utils"
import { AlertTriangle, Info, AlertOctagon } from "lucide-react"

interface AlertCardProps {
  type: "critical" | "warning" | "info"
  title: string
  message: string
  time: string
}

const alertStyles = {
  critical: {
    bg: "bg-destructive/10 border-destructive/30",
    icon: AlertOctagon,
    iconColor: "text-destructive",
    dot: "bg-destructive",
  },
  warning: {
    bg: "bg-warning/10 border-warning/30",
    icon: AlertTriangle,
    iconColor: "text-warning",
    dot: "bg-warning",
  },
  info: {
    bg: "bg-primary/10 border-primary/30",
    icon: Info,
    iconColor: "text-primary",
    dot: "bg-primary",
  },
}

export function AlertCard({ type, title, message, time }: AlertCardProps) {
  const style = alertStyles[type]
  const Icon = style.icon

  return (
    <div className={cn("flex gap-3 rounded-lg border p-3.5", style.bg)}>
      <div className="shrink-0 pt-0.5">
        <Icon className={cn("h-4 w-4", style.iconColor)} />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold">{title}</h4>
          <div className={cn("h-2 w-2 rounded-full", style.dot)} />
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{message}</p>
        <p className="text-[11px] text-muted-foreground/70">{time}</p>
      </div>
    </div>
  )
}
