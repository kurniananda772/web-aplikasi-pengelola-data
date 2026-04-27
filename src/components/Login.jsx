import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(credentials)) {
      setError('');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🚀 Masuk</h1>
          <p>Sistem Pengelolaan Data Penjualan</p>
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              value={credentials.username}
              onChange={(e) => setCredentials({
                ...credentials,
                username: e.target.value
              })}
              required
              placeholder="Masukkan username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={(e) => setCredentials({
                ...credentials,
                password: e.target.value
              })}
              required
              placeholder="Masukkan password"
            />
          </div>

          <button type="submit" className="login-submit">
            Masuk ke Sistem
          </button>
        </form>

        <div className="login-footer">
          📝 Demo: admin / 123456
        </div>
      </div>
    </div>
  );
};

export default Login;