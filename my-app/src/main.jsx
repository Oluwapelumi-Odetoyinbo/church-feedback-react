import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import AppWithRoutes from "./AppWithRoutes"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
