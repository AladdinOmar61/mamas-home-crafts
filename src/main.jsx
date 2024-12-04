// import { StrictMode } from 'react'
import "./index.css";
import { createRoot } from "react-dom/client";
import { SupabaseProvider } from "../lib/context/SupabaseProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Register from "./Pages/Register/Register.jsx";
import Login from "./Pages/Login/Login.jsx";
import Products from './Pages/Products/Products.jsx';
import ProductItem from "./Pages/ProductItem/ProductItem.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <SupabaseProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:prodId" element={<ProductItem/>}></Route>
      </Routes>
    </Router>
  </SupabaseProvider>
//  {/* </StrictMode>, */}
);
