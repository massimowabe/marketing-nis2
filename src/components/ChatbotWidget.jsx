import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Shield } from 'lucide-react';
import { saveLead } from '../utils/db';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSending(true);
    setTimeout(() => {
      saveLead({ email, type: 'contact_form', message: 'Richiesta di contatto rapido da Chatbot', role: 'Sconosciuto' });
      setStep(1);
      setIsSending(false);
    }, 1000);
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50 }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              style={{
                background: 'var(--bg-card)',
                width: '320px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                marginBottom: '1rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ background: 'var(--primary)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 'bold' }}>
                  <Shield size={20} /> Pronto Intervento NIS
                </div>
                <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}>
                  <X size={20} />
                </button>
              </div>
              
              <div style={{ padding: '1.5rem', minHeight: '200px', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
                {step === 0 ? (
                  <>
                    <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <p>Ciao! Le ispezioni ACN di Ottobre si avvicinano.</p>
                      <p style={{ marginTop: '0.5rem' }}>Hai bisogno di verificare la tua conformità o richiedere un intervento urgente?</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <input 
                        type="email" 
                        placeholder="La tua email aziendale..." 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-darker)', color: 'white', fontSize: '0.875rem' }}
                      />
                      <button type="submit" disabled={isSending} style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', padding: '0 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isSending ? <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div> : <Send size={16} />}
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 0', margin: 'auto' }}>
                    <div style={{ color: 'var(--success)', marginBottom: '1rem' }}>
                      <Shield size={40} style={{ margin: '0 auto' }} />
                    </div>
                    <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Ricevuto!</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Un nostro consulente analizzerà la situazione e ti contatterà a breve.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={toggleChat}
          style={{
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(10, 132, 255, 0.4)',
            marginLeft: 'auto'
          }}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </>
  );
}
