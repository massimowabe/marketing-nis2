import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-dark)',
      color: 'var(--text-main)',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ShieldAlert size={80} color="var(--danger)" style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Pagina non trovata</h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 2.5rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          L'indirizzo inserito non esiste o è stato spostato. Torna al sicuro nella pagina principale.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Torna alla Home
        </Link>
      </motion.div>
    </div>
  );
}
