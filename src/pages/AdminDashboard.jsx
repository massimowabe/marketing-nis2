import React, { useState, useEffect } from 'react';
import { getLeads } from '../utils/db';
import { Link, useNavigate } from 'react-router-dom';
import { Users, AlertCircle, TrendingUp, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Auth Check
    const isAuth = localStorage.getItem('nis_admin_auth');
    if (!isAuth) {
      navigate('/login');
    } else {
      setLeads(getLeads());
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nis_admin_auth');
    navigate('/login');
  };

  // KPIs calculation
  const totalLeads = leads.length;
  const quizLeads = leads.filter(l => l.type === 'audit_quiz');
  const avgScore = quizLeads.length > 0 
    ? Math.round(quizLeads.reduce((acc, curr) => acc + curr.score, 0) / quizLeads.length)
    : 0;
  
  const highRiskCount = quizLeads.filter(l => l.score < 50).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', padding: '2rem', color: 'var(--text-main)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', color: 'white' }}>CRM NIS Shield</h1>
            <p style={{ color: 'var(--text-muted)' }}>Pannello di gestione Lead e Conversioni</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Torna al Sito</Link>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderColor: 'var(--border)', color: 'var(--danger)' }}>
              <LogOut size={16} style={{ marginRight: '0.5rem' }} /> Esci
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(10, 132, 255, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--primary-light)' }}>
              <Users size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Lead Totali Generati</p>
              <h3 style={{ fontSize: '1.8rem', color: 'white' }}>{totalLeads}</h3>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(255, 159, 10, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--warning)' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Score Medio Quiz</p>
              <h3 style={{ fontSize: '1.8rem', color: 'white' }}>{avgScore}%</h3>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(255, 69, 58, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--danger)' }}>
              <AlertCircle size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Enti ad Alto Rischio</p>
              <h3 style={{ fontSize: '1.8rem', color: 'white' }}>{highRiskCount}</h3>
            </div>
          </div>
        </div>

        {/* Table */}
        <h2 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '1rem' }}>Lista Contatti Recenti</h2>
        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
          {leads.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Nessun lead ricevuto finora. Attendi le prime conversioni!
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-darker)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '1.25rem 1rem', fontWeight: '500', color: 'var(--text-muted)' }}>Data Acquisizione</th>
                    <th style={{ padding: '1.25rem 1rem', fontWeight: '500', color: 'var(--text-muted)' }}>Tipologia</th>
                    <th style={{ padding: '1.25rem 1rem', fontWeight: '500', color: 'var(--text-muted)' }}>Contatto</th>
                    <th style={{ padding: '1.25rem 1rem', fontWeight: '500', color: 'var(--text-muted)' }}>Dettagli o Richiesta</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        {new Date(lead.date).toLocaleString('it-IT')}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '20px', 
                          fontSize: '0.75rem', 
                          fontWeight: '600',
                          background: lead.type === 'contact_form' ? 'rgba(10, 132, 255, 0.1)' : 'rgba(48, 209, 88, 0.1)',
                          color: lead.type === 'contact_form' ? 'var(--primary-light)' : 'var(--success)'
                        }}>
                          {lead.type === 'contact_form' ? 'Richiesta Preventivo' : `Quiz Score: ${lead.score}%`}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '500', color: 'white' }}>{lead.email}</div>
                        {lead.name && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{lead.name}</div>}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        {lead.type === 'contact_form' ? (
                          <div style={{ maxWidth: '300px' }}>
                            <div style={{ color: 'var(--primary-light)', marginBottom: '0.25rem' }}>{lead.role || 'Ruolo non specificato'}</div>
                            <div style={{ color: 'var(--text-muted)' }}>{lead.message}</div>
                          </div>
                        ) : (
                          <div style={{ color: 'var(--text-muted)' }}>
                            Il report automatico è stato inviato all'utente.
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
