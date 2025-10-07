import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Default to dark mode (ChatGPT style), but check localStorage first
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return true; // Default to dark mode
  });

  useEffect(() => {
    // Apply theme to document - default is dark, light is the override
    if (darkMode) {
      document.documentElement.removeAttribute('data-theme'); // Use default dark theme
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </Router>
  );
}