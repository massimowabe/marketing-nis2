import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication
    if (password === 'admin123' || password === 'admin') {
      localStorage.setItem('nis_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Password non valida. Hint: admin');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '1rem' }}>
      <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '12px', border: '1px solid var(--border)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary-light)' }}>
          <Shield size={48} />
        </div>
        <h1 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Area Riservata</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.875rem' }}>Accesso riservato agli operatori NIS Shield.</p>
        
        <form onSubmit={handleLogin}>
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Lock size={18} />
            </div>
            <input 
              type="password" 
              placeholder="Inserisci Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-darker)', color: 'white' }}
            />
          </div>
          {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Accedi</button>
        </form>
        
        <div style={{ marginTop: '2rem' }}>
          <a href="/" style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none' }}>&larr; Torna al Sito</a>
        </div>
      </div>
    </div>
  );
}
