// import { StrictMode } from 'react'
import "./index.css";
import { createRoot } from "react-dom/client";
import { SupabaseProvider } from "../lib/context/supabaseProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/register.jsx";
import Login from "./components/Login/Login.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <SupabaseProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </SupabaseProvider>
  // </StrictMode>,
);
