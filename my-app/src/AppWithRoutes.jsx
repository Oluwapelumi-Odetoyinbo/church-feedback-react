import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"
import App from "./App"
import AdminLogin from "./AdminLogin"
import AdminFeedbackPage from "./AdminFeedbackPage"
import ProtectedRoute from "./ProtectedRoute"

const AppWithRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Main route - shows your existing feedback form */}
        <Route path="/" element={<App />} />

        {/* Admin login route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminFeedbackPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default AppWithRoutes
