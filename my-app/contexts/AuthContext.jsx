"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Default admin credentials
  const ADMIN_EMAIL = "rccgemmanuelparish@gmail.com"
  const ADMIN_PASSWORD = "Emmanuel2024@Admin"

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("adminToken")
    const loginTime = localStorage.getItem("adminLoginTime")

    if (token && loginTime) {
      // Check if login is still valid (24 hours)
      const now = new Date().getTime()
      const loginTimestamp = Number.parseInt(loginTime)
      const twentyFourHours = 24 * 60 * 60 * 1000

      if (now - loginTimestamp < twentyFourHours) {
        setIsAuthenticated(true)
      } else {
        // Token expired, clear it
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminLoginTime")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simple credential check
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Generate a simple token
        const token = btoa(`${email}:${new Date().getTime()}`)

        // Store authentication token and timestamp
        localStorage.setItem("adminToken", token)
        localStorage.setItem("adminLoginTime", new Date().getTime().toString())

        setIsAuthenticated(true)
        return { success: true }
      } else {
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminLoginTime")
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
