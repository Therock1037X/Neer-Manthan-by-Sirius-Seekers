"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { LoginPage } from "@/components/login-page"

export default function Home() {
  const { isLoggedIn, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn && role) {
      const routes = {
        public: "/dashboard/public",
        government: "/dashboard/government",
        dealer: "/dashboard/dealer",
      }
      router.push(routes[role])
    }
  }, [isLoggedIn, role, router])

  if (isLoggedIn) return null

  return <LoginPage />
}
