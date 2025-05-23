"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showCredentials, setShowCredentials] = useState(false)

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(email, password)

    if (result.success) {
      navigate("/admin")
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  const fillDefaultCredentials = () => {
    setEmail("rccgemmanuelparish@gmail.com")
    setPassword("Emmanuel2024@Admin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background logo */}
      <img
        src="/assets/Rccg_logo.png"
        alt="Church Logo"
        className="absolute inset-0 w-full h-full object-contain opacity-5 z-0 pointer-events-none"
      />

      {/* Login Card */}
      <div className="relative z-10 bg-white shadow-2xl rounded-3xl max-w-md w-full p-10 border border-indigo-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">🕊️ Admin Login</h2>
          <p className="text-gray-600 mt-2 text-lg">RCCG Emmanuel Parish</p>
          <p className="text-sm text-gray-500">Access the feedback dashboard</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center mb-4 shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter admin email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center py-3 px-4 text-white font-semibold rounded-lg transition duration-300 ${
              loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Development helper */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowCredentials(!showCredentials)}
            className="text-xs text-gray-400 hover:text-gray-600 transition"
          >
            {showCredentials ? "Hide" : "Show"} Default Credentials
          </button>

          {showCredentials && (
            <div className="mt-2 p-3 bg-gray-50 rounded text-xs text-gray-600 border border-gray-200">
              <p>
                <strong>Email:</strong> rccgemmanuelparish@gmail.com
              </p>
              <p>
                <strong>Password:</strong> Emmanuel2024@Admin
              </p>
              <button onClick={fillDefaultCredentials} className="mt-2 text-indigo-600 hover:underline text-xs">
                Fill Form
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
