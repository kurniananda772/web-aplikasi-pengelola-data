import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SalesForm from './components/SalesForm';
import SalesList from './components/SalesList';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState('');

  // Login handler
  const handleLogin = (credentials) => {
    // Simple auth (ganti dengan backend nanti)
    if (credentials.username === 'admin' && credentials.password === '123456') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Handler untuk edit data - pass ke SalesForm
  const handleEditClick = (sale) => {
    // Scroll ke form saat edit
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler untuk menerima data edit dari SalesList
  const handleEditFromList = (sale) => {
    handleEditClick(sale);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                isLoggedIn ? 
                <Navigate to="/dashboard" /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/login" 
              element={
                isLoggedIn ? 
                <Navigate to="/dashboard" /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isLoggedIn ? (
                  <>
                    <SalesForm 
                      sales={sales}
                      setSales={setSales}
                      loading={loading}
                      setLoading={setLoading}
                      setError={setError}
                      onEdit={handleEditFromList}
                    />
                    <SalesList 
                      sales={sales}
                      setSales={setSales}
                      loading={loading}
                      setLoading={setLoading}
                      setError={setError}
                      onEdit={handleEditFromList}
                    />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
