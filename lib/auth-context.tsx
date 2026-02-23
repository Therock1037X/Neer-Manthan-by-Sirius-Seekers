"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "public" | "government" | "dealer"

interface AuthContextType {
  role: UserRole | null
  userName: string
  login: (role: UserRole, name: string) => void
  logout: () => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [userName, setUserName] = useState("")

  const login = (newRole: UserRole, name: string) => {
    setRole(newRole)
    setUserName(name)
  }

  const logout = () => {
    setRole(null)
    setUserName("")
  }

  return (
    <AuthContext.Provider value={{ role, userName, login, logout, isLoggedIn: role !== null }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
