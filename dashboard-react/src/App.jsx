import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Card from "./components/Card";
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecentSignals from './components/RecentSignals';
import Login from './components/Login';
import Signup from './components/Signup';
import Signals from './components/Signals';
import Academy from './components/Academy';
import Traydtv from './components/Traydtv';
import Webinar from './components/Webinar';
import Settings from './components/Settings';
import Subscription from './components/Subscription';
import Valtrix from './components/Valtrix';

// Firebase auth instance
const auth = getAuth();

// Authentication Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const logout = () => {
    signOut(auth).then(() => {
      setIsAuthenticated(false);
      setCurrentUser(null);
    });
  };

  const value = {
    isAuthenticated,
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/card"
              element={
                <ProtectedRoute>
                  <Card />
                </ProtectedRoute>
              }
            />
            <Route
              path="/header"
              element={
                <ProtectedRoute>
                  <Header />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recent-signals"
              element={
                <ProtectedRoute>
                  <RecentSignals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sidebar"
              element={
                <ProtectedRoute>
                  <Sidebar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signals"
              element={
                <ProtectedRoute>
                  <Signals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/academy"
              element={
                <ProtectedRoute>
                  <Academy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/traydtv"
              element={
                <ProtectedRoute>
                  <Traydtv />
                </ProtectedRoute>
              }
            />
            <Route
              path="/webinar"
              element={
                <ProtectedRoute>
                  <Webinar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscription"
              element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/valtrix"
              element={
                <ProtectedRoute>
                  <Valtrix />
                </ProtectedRoute>
              }
            />
      
          </Routes>
          
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
