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

  // Redirect if already authenticated
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      {/* Background church logo */}
      <img
        src="/assets/Rccg_logo.png"
        alt="Church Logo"
        className="absolute inset-0 w-full h-full object-contain opacity-5 z-0 pointer-events-none"
      />

      <div className="relative z-10 bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">🕊️ Admin Login</h2>
          <p className="text-gray-600 mt-2">RCCG Emmanuel Parish</p>
          <p className="text-sm text-gray-500">Access the feedback dashboard</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter admin email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 ${
              loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Development helper - remove in production */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowCredentials(!showCredentials)}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Show Default Credentials
          </button>

          {showCredentials && (
            <div className="mt-2 p-3 bg-gray-50 rounded text-xs text-gray-600">
              <p>
                <strong>Email:</strong> rccgemmanuelparish@gmail.com
              </p>
              <p>
                <strong>Password:</strong> Emmanuel2024@Admin
              </p>
              <button onClick={fillDefaultCredentials} className="mt-2 text-indigo-600 hover:underline">
                Fill Form
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-indigo-600 hover:underline">
            ← Back to Feedback Form
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
