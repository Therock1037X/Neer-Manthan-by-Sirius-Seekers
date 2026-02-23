"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { tankerOrders } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import {
  Truck,
  MapPin,
  Droplets,
  CheckCircle,
  Clock,
  Package,
  Send,
} from "lucide-react"

export function TankerOrderPage() {
  const { role } = useAuth()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Water Tanker Orders</h1>
        <p className="text-sm text-muted-foreground">
          {role === "public"
            ? "Request a water tanker delivery for your area"
            : "Monitor and manage all tanker orders"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order form */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Truck className="h-4 w-4 text-primary" />
              New Tanker Order
            </CardTitle>
            <CardDescription>Fill in the details to request water delivery</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/20">
                  <CheckCircle className="h-7 w-7 text-success" />
                </div>
                <h3 className="text-lg font-semibold">Order Submitted</h3>
                <p className="text-sm text-muted-foreground">
                  Your tanker request has been submitted. You will receive a confirmation shortly.
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  Order ID: ORD-2024-{String(Math.floor(Math.random() * 900) + 100)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jaipur">Jaipur</SelectItem>
                      <SelectItem value="jodhpur">Jodhpur</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                      <SelectItem value="indore">Indore</SelectItem>
                      <SelectItem value="bengaluru">Bengaluru</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea id="address" placeholder="Enter full delivery address" rows={3} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Water Quantity</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2000">2,000 Litres</SelectItem>
                      <SelectItem value="5000">5,000 Litres</SelectItem>
                      <SelectItem value="8000">8,000 Litres</SelectItem>
                      <SelectItem value="10000">10,000 Litres</SelectItem>
                      <SelectItem value="12000">12,000 Litres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Within 48 hours</SelectItem>
                      <SelectItem value="medium">Medium - Within 24 hours</SelectItem>
                      <SelectItem value="high">High - Within 12 hours</SelectItem>
                      <SelectItem value="critical">Critical - Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Order
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Order status / list */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Order History</CardTitle>
                <CardDescription>Track your recent tanker orders</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="gap-1 text-[10px]">
                  <Clock className="h-3 w-3" />
                  {tankerOrders.filter((o) => o.status === "pending").length} Pending
                </Badge>
                <Badge variant="secondary" className="gap-1 text-[10px]">
                  <Package className="h-3 w-3" />
                  {tankerOrders.filter((o) => o.status === "dispatched").length} Dispatched
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tankerOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {order.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="h-3 w-3 text-primary" />
                        <span className="font-mono">{(order.quantity / 1000).toFixed(0)}K L</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={order.priority === "critical" ? "destructive" : order.priority === "high" ? "destructive" : "secondary"}
                        className="text-[10px]"
                      >
                        {order.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {order.status === "pending" && <Clock className="h-3 w-3 text-muted-foreground" />}
                        {order.status === "dispatched" && <Truck className="h-3 w-3 text-primary" />}
                        {order.status === "delivered" && <CheckCircle className="h-3 w-3 text-success" />}
                        <Badge
                          variant={order.status === "pending" ? "outline" : order.status === "dispatched" ? "secondary" : "default"}
                          className="text-[10px]"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
