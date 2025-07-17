// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">🏠 Todo</Link>
        <Link to="/contact">📮 Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
