import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import "./App.css";

function AppRoutes() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Router>
      <Routes>
        {/* Auth routes without Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Main app routes with Layout */}
        <Route path="/" element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}>
            <Route index element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            } />
            <Route path="tasks" element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="help" element={
              <ProtectedRoute>
                <HelpSupport />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}