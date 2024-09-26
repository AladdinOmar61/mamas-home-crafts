// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/register.jsx";
import "./index.css";
import { SupabaseProvider } from "../lib/context/supabaseProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <SupabaseProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </SupabaseProvider>
  // </StrictMode>,
);
