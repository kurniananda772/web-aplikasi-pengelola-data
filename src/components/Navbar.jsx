import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const today = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id });

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Data Penjualan
        </Link>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              <div className="text-sm text-gray-600">
                📅 {today}
              </div>
              <button
                onClick={handleLogout}
                className="btn-primary text-sm px-4 py-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
