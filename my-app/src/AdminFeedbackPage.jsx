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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">📬 Submitted Feedback</h2>
          <p className="text-gray-600">RCCG Emmanuel Parish Admin Dashboard</p>
        </div>
        <div className="flex gap-4">
          <Link to="/" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition">
            Back to Form
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {feedbacks.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <p className="text-gray-500 text-lg">No feedback submissions yet.</p>
              <p className="text-gray-400 text-sm mt-2">Feedback will appear here once members start submitting.</p>
            </div>
          ) : (
            <>
              <div className="bg-white p-4 rounded-xl shadow mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Total Feedback:</strong> {feedbacks.length} submissions
                </p>
              </div>

              {feedbacks.map((fb, idx) => (
                <div key={fb._id || idx} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {fb.category}
                    </span>
                    <button onClick={() => handleDelete(fb._id)} className="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-800 mb-3 leading-relaxed">{fb.message}</p>
                  <p className="text-xs text-gray-400 text-right">{new Date(fb.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminFeedbackPage
