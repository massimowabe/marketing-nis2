import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, AlertTriangle, CheckCircle, Database } from 'lucide-react';

const documents = [
  {
    id: 'policy',
    title: 'Policy Sicurezza Informazioni',
    icon: <Shield size={24} />,
    description: 'Il documento principale richiesto dalla NIS2 che definisce le direttive strategiche di sicurezza.',
    content: '1. Scopo e Campo di Applicazione\n2. Ruoli e Responsabilità (CISO, IT)\n3. Gestione degli Asset\n4. Controllo degli Accessi\n5. Sicurezza Fisica e Ambientale\n6. Sicurezza delle Operazioni'
  },
  {
    id: 'incident',
    title: 'Piano Incident Response',
    icon: <AlertTriangle size={24} />,
    description: 'Procedura standard per la classificazione e notifica obbligatoria degli incidenti all\'ACN (entro 24h).',
    content: '1. Fasi della Risposta agli Incidenti\n2. Criteri di Notifica all\'ACN\n3. Team di Risposta (CSIRT interno)\n4. Procedure di Contenimento\n5. Ripristino e Post-Mortem'
  },
  {
    id: 'assets',
    title: 'Registro Asset e Rischi',
    icon: <Database size={24} />,
    description: 'Inventario di tutti i sistemi critici e relativa valutazione del rischio cyber (Articolo 21).',
    content: '1. Metodologia di Risk Assessment\n2. Inventario Sistemi OT/IT\n3. Matrice dei Rischi\n4. Piano di Trattamento\n5. Fornitori Strategici (Supply Chain)'
  }
];

export default function FascicoloPreview() {
  const [activeDoc, setActiveDoc] = useState(documents[0].id);

  const selectedDoc = documents.find(d => d.id === activeDoc);

  return (
    <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border)', marginTop: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Anteprima "Fascicolo Ispezione"</h3>
        <p style={{ color: 'var(--text-muted)' }}>Scopri i documenti reali che presenterai all'investigatore ACN, precompilati e pronti all'uso.</p>
      </div>

      <div className="preview-grid">
        {/* Sidebar Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderRight: '1px solid var(--border)', paddingRight: '1.5rem' }}>
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDoc(doc.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeDoc === doc.id ? 'rgba(10, 132, 255, 0.1)' : 'transparent',
                color: activeDoc === doc.id ? 'var(--primary-light)' : 'var(--text-muted)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s',
                fontWeight: activeDoc === doc.id ? '600' : '400',
                borderLeft: activeDoc === doc.id ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              {doc.icon}
              <span style={{ fontSize: '0.9rem' }}>{doc.title}</span>
            </button>
          ))}
          
          <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(48, 209, 88, 0.05)', borderRadius: '8px', border: '1px solid rgba(48, 209, 88, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '0.5rem' }}>
              <CheckCircle size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Stato Conformità</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tutti i documenti sono aggiornati alle ultime linee guida ACN.</div>
          </div>
        </div>

        {/* Document Viewer */}
        <div style={{ background: 'var(--bg-darker)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} color="var(--primary-light)" />
              {selectedDoc.title}.pdf
            </div>
            <div style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: 'var(--text-muted)' }}>
              Riservato
            </div>
          </div>
          
          {/* Content */}
          <div style={{ padding: '2rem', flex: 1, position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDoc}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{selectedDoc.title}</h2>
                <p style={{ color: 'var(--primary-light)', marginBottom: '2rem', fontSize: '0.9rem' }}>{selectedDoc.description}</p>
                
                <div style={{ color: 'var(--text-muted)', lineHeight: '2' }}>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Indice del Documento:</h4>
                  {selectedDoc.content.split('\n').map((line, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '500' }}>{line}</span>
                      <div style={{ flex: 1, borderBottom: '1px dotted var(--border)' }}></div>
                    </div>
                  ))}
                </div>

                {/* Blurred fake content */}
                <div style={{ marginTop: '2rem', filter: 'blur(4px)', opacity: 0.5, userSelect: 'none' }}>
                  <div style={{ width: '100%', height: '12px', background: 'var(--border)', marginBottom: '10px', borderRadius: '4px' }}></div>
                  <div style={{ width: '90%', height: '12px', background: 'var(--border)', marginBottom: '10px', borderRadius: '4px' }}></div>
                  <div style={{ width: '95%', height: '12px', background: 'var(--border)', marginBottom: '20px', borderRadius: '4px' }}></div>
                  <div style={{ width: '80%', height: '12px', background: 'var(--border)', marginBottom: '10px', borderRadius: '4px' }}></div>
                  <div style={{ width: '100%', height: '12px', background: 'var(--border)', borderRadius: '4px' }}></div>
                </div>

                {/* Watermark */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-30deg)', fontSize: '4rem', fontWeight: 'bold', color: 'var(--border)', opacity: 0.3, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                  ANTEPRIMA NIS SHIELD
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
