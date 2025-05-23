"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const AdminFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/feedback`)
        setFeedbacks(response.data)
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error)
        alert("Failed to fetch feedbacks")
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  const handleLogout = () => {
    logout()
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/feedbacks/${id}`)
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id))
      alert("Feedback deleted successfully")
    } catch (error) {
      console.error("Error deleting feedback:", error)
      alert("Failed to delete feedback")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4 py-6 sm:px-8">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-1">📬 Submitted Feedback</h1>
        <p className="text-gray-600">RCCG Emmanuel Parish Admin Dashboard</p>
      </header>

      <div className="mb-6 flex justify-center sm:justify-start">
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-full transition duration-200"
        >
          ← Back to Form
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <p className="text-gray-500 text-lg">No feedback submissions yet.</p>
              <p className="text-gray-400 text-sm mt-2">
                Feedback will appear here once members start submitting.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow p-4 text-sm text-gray-700">
                <strong>Total Feedback:</strong> {feedbacks.length} submissions
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {feedbacks.map((fb, idx) => (
                  <div
                    key={fb._id || idx}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                        {fb.category}
                      </span>
                    </div>

                    <p className="text-gray-800 text-sm leading-relaxed mb-4">{fb.message}</p>

                    <p className="text-xs text-gray-400 text-right">{new Date(fb.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminFeedbackPage
