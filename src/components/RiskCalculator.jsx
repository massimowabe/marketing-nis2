import React, { useState } from 'react';

export default function RiskCalculator() {
  const [revenue, setRevenue] = useState(5000000);
  
  // NIS2 Fine calculation (simplified: max of 10M or 2% of revenue)
  const calculateFine = (val) => {
    const twoPercent = val * 0.02;
    return Math.max(10000000, twoPercent);
  };

  const fine = calculateFine(revenue);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="calculator-container" style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border)', marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Calcola il tuo rischio sanzionatorio NIS2</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Sposta lo slider per indicare il fatturato annuo stimato della tua organizzazione. Scopri a quanto ammonta la potenziale sanzione amministrativa.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <label style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Fatturato Annuo Globale:</label>
          <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{formatCurrency(revenue)}</span>
        </div>
        <input 
          type="range" 
          min="100000" 
          max="500000000" 
          step="500000" 
          value={revenue} 
          onChange={(e) => setRevenue(Number(e.target.value))}
          style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          <span>€ 100k</span>
          <span>€ 500M+</span>
        </div>
      </div>

      <div style={{ background: 'rgba(255, 69, 58, 0.1)', border: '1px solid rgba(255, 69, 58, 0.3)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Sanzione Massima Prevista (Art. 34)</p>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--danger)', textShadow: '0 0 10px rgba(255, 69, 58, 0.5)' }}>
          {formatCurrency(fine)}
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '0.5rem', opacity: 0.8 }}>
          *Fino a 10.000.000 € o il 2% del fatturato totale annuo mondiale, se superiore.
        </p>
      </div>
    </div>
  );
}
