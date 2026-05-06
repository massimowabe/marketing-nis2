import React, { useState } from 'react';
import { saveLead } from '../utils/db';

const questions = [
  "Hai mappato e identificato tutti gli asset IT e OT critici della tua organizzazione?",
  "Hai adottato formalmente una policy di Incident Response entro le tempistiche richieste?",
  "Esegui test di sicurezza (Vulnerability Assessment/PenTest) almeno una volta l'anno?",
  "Hai imposto requisiti di cybersicurezza vincolanti ai tuoi fornitori strategici (Supply Chain)?"
];

export default function AuditQuiz() {
  const [step, setStep] = useState(0); // 0 to questions.length - 1
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [step]: val };
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate score
      const totalYes = Object.values(newAnswers).filter(a => a === 'yes').length;
      const calculatedScore = Math.round((totalYes / questions.length) * 100);
      setScore(calculatedScore);
      setStep(questions.length); // Move to email capture step
    }
  };

  const submitLead = async (e) => {
    e.preventDefault();
    await saveLead({ email, type: 'audit_quiz', score, answers });
    setFinished(true);
  };

  return (
    <div style={{ background: 'var(--bg-darker)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border)', marginTop: '2rem' }}>
      {!finished && step < questions.length && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'white' }}>Audit-Readiness Quiz</h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Domanda {step + 1} di {questions.length}</span>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>{questions[step]}</p>
          </div>
          <div className="quiz-grid">
            <button className="btn btn-outline" onClick={() => handleAnswer('yes')} style={{ padding: '1rem', borderColor: 'var(--success)' }}>
              Sì, assolutamente
            </button>
            <button className="btn btn-outline" onClick={() => handleAnswer('no')} style={{ padding: '1rem', borderColor: 'var(--danger)' }}>
              No / Non sono sicuro
            </button>
          </div>
        </>
      )}

      {!finished && step === questions.length && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s' }}>
          <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>Analisi Completata</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Abbiamo calcolato il tuo indice di preparazione alle ispezioni ACN. Inserisci la tua email per scoprire subito il risultato e ricevere il report gratuito.
          </p>
          <form onSubmit={submitLead} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="La tua email aziendale" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ textAlign: 'center' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Scopri il Risultato</button>
          </form>
        </div>
      )}

      {finished && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: score >= 50 ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 69, 58, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: `2px solid ${score >= 50 ? 'var(--success)' : 'var(--danger)'}` }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: score >= 50 ? 'var(--success)' : 'var(--danger)' }}>{score}%</span>
          </div>
          <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>
            {score === 100 ? "Sei Pronto!" : score >= 50 ? "Sei sulla buona strada, ma ci sono lacune." : "Attenzione: Rischio Altissimo!"}
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {score >= 50 
              ? "Abbiamo inviato un report dettagliato alla tua email. Contattaci per colmare le mancanze prima delle ispezioni di Ottobre." 
              : "Il tuo ente è gravemente esposto alle sanzioni NIS2. Controlla l'email e richiedi immediatamente il nostro intervento."}
          </p>
          <button className="btn btn-outline" onClick={() => { setStep(0); setFinished(false); setScore(0); setAnswers({}); setEmail(''); }}>
            Rifai il Test
          </button>
        </div>
      )}
    </div>
  );
}
