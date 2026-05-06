import React, { useState, useEffect, Suspense, lazy } from 'react';
import { saveLead } from '../utils/db';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ShieldCheck, Lock, FileCheck, Sun, Moon, Menu, X, Building2, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Lazy loading components for extreme performance
const RiskCalculator = lazy(() => import('../components/RiskCalculator'));
const AuditQuiz = lazy(() => import('../components/AuditQuiz'));
const FascicoloPreview = lazy(() => import('../components/FascicoloPreview'));
const ChatbotWidget = lazy(() => import('../components/ChatbotWidget'));

export default function LandingPage() {
  const { id } = useParams();
  const [formState, setFormState] = useState('idle');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCookies, setShowCookies] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', message: '' });
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setTimeout(() => setShowCookies(true), 1000);
    }
    const savedTheme = localStorage.getItem('nis_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('nis_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookies(false);
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contatti').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    saveLead({ ...formData, type: 'contact_form' });
    setTimeout(() => {
      setFormState('success');
    }, 1000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const copyData = {
    'pubblica-amministrazione': {
      title: <>Governance del Rischio e Conformità NIS2 per la <span className="text-gradient">Pubblica Amministrazione</span></>,
      seoTitle: "Governance del Rischio e Conformità NIS2 per la Pubblica Amministrazione",
      subtitle: "Garantisci la resilienza operativa del tuo Ente. Forniamo policy preconfigurate, registri degli asset e framework di incident response allineati alle direttive AgID e ACN."
    },
    'sanita': {
      title: <>Resilienza Operativa e Sicurezza Dati per il <span className="text-gradient">Settore Sanitario</span></>,
      seoTitle: "Resilienza Operativa e Sicurezza Dati per il Settore Sanitario",
      subtitle: "Proteggi le infrastrutture critiche sanitarie. Una piattaforma integrata per l'adeguamento normativo ISO 27001 e NIS2, progettata per mitigare il rischio cyber e superare gli audit ACN."
    },
    'default': {
      title: <>Piattaforma Enterprise per la Conformità <span className="text-gradient">NIS2 e ACN</span></>,
      seoTitle: "Piattaforma Enterprise per la Conformità NIS2 e ACN",
      subtitle: "Riduciamo la complessità normativa trasformandola in flussi di lavoro automatizzati. Policy predefinite, registri di trattamento e Command Center per una postura di cyber-sicurezza inattaccabile."
    }
  };

  const copy = copyData[id] || copyData['default'];

  return (
    <>
      <Helmet>
        <title>{copy.seoTitle} | NIS Shield Enterprise</title>
        <meta name="description" content={copy.subtitle} />
        <meta property="og:title" content={`${copy.seoTitle} - NIS Shield`} />
        <meta property="og:description" content={copy.subtitle} />
      </Helmet>

      <motion.div className="progress-bar" style={{ scaleX }} />
      <nav aria-label="Navigazione Principale">
        <div className="container nav-content">
          <div className="logo">
            <img src="/nis_shield_logo.png" alt="Logo NIS Shield" />
            <span>NIS Shield</span>
          </div>
          <div className="nav-links desktop-only">
            <a href="#contesto">Il Problema NIS2</a>
            <a href="#soluzione">Piattaforma</a>
            <a href="#trust">Trust Center</a>
            <a href="#target">Soggetti Obbligati</a>
          </div>
          <div className="nav-actions desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button aria-label="Cambia Tema" onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex' }}>
              {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
            </button>
            <a href="#contatti" onClick={scrollToContact} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Richiedi Demo</a>
          </div>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X size={28} color="var(--text-main)" /> : <Menu size={28} color="var(--text-main)" />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div className="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
            <a href="#contesto" onClick={() => setIsMenuOpen(false)}>Il Problema NIS2</a>
            <a href="#soluzione" onClick={() => setIsMenuOpen(false)}>Piattaforma</a>
            <a href="#trust" onClick={() => setIsMenuOpen(false)}>Trust Center</a>
            <a href="#target" onClick={() => setIsMenuOpen(false)}>Soggetti Obbligati</a>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {theme === 'dark' ? <><Sun size={20} /> Modalità Chiara</> : <><Moon size={20} /> Modalità Scura</>}
              </button>
              <a href="#contatti" onClick={(e) => { setIsMenuOpen(false); scrollToContact(e); }} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Richiedi Demo</a>
            </div>
          </motion.div>
        )}
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section className="hero">
          <motion.div className="container" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeInUp}>{copy.title}</motion.h1>
            <motion.p variants={fadeInUp}>
              {copy.subtitle}
            </motion.p>
            <motion.div className="btn-group" variants={fadeInUp}>
              <a href="#contatti" onClick={scrollToContact} className="btn btn-primary">Mettiti al sicuro ora</a>
              <a href="#soluzione" className="btn btn-outline">Scopri il sistema</a>
            </motion.div>

            <motion.div className="mockup-wrapper" variants={fadeInUp} style={{ marginTop: '4rem' }}>
              <div className="mockup-tabs">
                <button className={`mockup-tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Vista Dashboard</button>
                <button className={`mockup-tab ${activeTab === 'policy' ? 'active' : ''}`} onClick={() => setActiveTab('policy')}>Gestione Policy</button>
                <button className={`mockup-tab ${activeTab === 'incident' ? 'active' : ''}`} onClick={() => setActiveTab('incident')}>Incident Response</button>
              </div>

              <div className="mockup-container">
                <div className="mockup-header">
                  <div className="mockup-dot red"></div>
                  <div className="mockup-dot yellow"></div>
                  <div className="mockup-dot green"></div>
                </div>
                <div className="mockup-content">
                  <img src="/nis_command_center.png" alt="NIS Command Center Interface" loading="lazy" />
                  
                  {activeTab !== 'dashboard' && (
                    <motion.div className="mockup-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="overlay-content">
                        {activeTab === 'policy' && (
                          <>
                            <h3>Motore di Policy Integrato</h3>
                            <p>Visualizzazione di tutte le policy ISO/IEC 27001 e NIS2 precompilate, pronte per la personalizzazione e l'export per l'ispezione ACN.</p>
                          </>
                        )}
                        {activeTab === 'incident' && (
                          <>
                            <h3>Modulo Incident Response</h3>
                            <p>Tracciamento degli eventi di sicurezza, logging immutabile e workflow per la segnalazione obbligatoria degli incidenti significativi.</p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Trust Badges */}
        <section style={{ padding: '2.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-darker)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '500' }}>
              <ShieldCheck size={24} color="var(--primary-light)" /> Conforme Direttiva NIS2
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '500' }}>
              <Lock size={24} color="var(--primary-light)" /> Allineato ISO/IEC 27001
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '500' }}>
              <FileCheck size={24} color="var(--primary-light)" /> Standard ACN Garantiti
            </div>
          </div>
        </section>

        {/* Problema Section */}
        <section id="contesto">
          <motion.div className="container" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.h2 className="section-title" variants={fadeInUp}>Ottobre si avvicina, ma non devi affrontare<br />questa sfida da solo.</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              I reparti IT e le direzioni sono già sotto pressione. Adeguarsi alle rigide richieste della direttiva NIS2 richiede tempo e risorse che spesso mancano, esponendo l'organizzazione a rischi severi.
            </motion.p>

            <motion.div className="grid" variants={staggerContainer}>
              <motion.div className="card" variants={fadeInUp}>
                <div className="card-icon">
                  <ShieldCheck size={32} />
                </div>
                <h3>Il Peso delle Sanzioni</h3>
                <p>Un errore formale può costare fino a 10 milioni di euro o il 2% del fatturato. È una responsabilità enorme da non dover portare interamente sulle tue spalle.</p>
              </motion.div>
              <motion.div className="card" variants={fadeInUp}>
                <div className="card-icon">
                  <FileCheck size={32} />
                </div>
                <h3>Pressione delle Ispezioni</h3>
                <p>Da Ottobre l'ACN avvierà i controlli a tappeto. Agli ispettori serviranno prove tangibili, strutturate e immediate. Noi ti forniamo esattamente ciò che si aspettano di vedere.</p>
              </motion.div>
              <motion.div className="card" variants={fadeInUp}>
                <div className="card-icon">
                  <Lock size={32} />
                </div>
                <h3>Burocrazia Estenuante</h3>
                <p>Creare decine di policy e registri da zero significa paralizzare il tuo team per mesi. Puoi evitare questo dispendio di energie affidandoti a chi ha già fatto il lavoro per te.</p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} style={{ marginTop: '4rem' }}>
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Caricamento calcolatore...</div>}>
                <RiskCalculator />
              </Suspense>
            </motion.div>
          </motion.div>
        </section>

        {/* Soluzione Section */}
        <section id="soluzione" style={{ background: 'var(--bg-darker)' }}>
          <motion.div className="container" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.h2 className="section-title" variants={fadeInUp}>La Soluzione: <span className="text-gradient">NIS Shield</span></motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              Abbiamo ingegnerizzato NIS Shield proprio per restituire serenità a chi gestisce la sicurezza. Trasformiamo mesi di stress burocratico in un'implementazione rapida, guidata e sicura.
            </motion.p>

            <motion.div className="grid" variants={staggerContainer}>
              <motion.div className="card" variants={fadeInUp}>
                <h3>NIS Command Center</h3>
                <p>Il cuore pulsante della tua compliance. Un pannello di controllo unificato per monitorare lo stato di sicurezza e governare le policy in tempo reale.</p>
                <ul className="feature-list">
                  <li><ShieldCheck size={18} color="var(--success)" /> Cruscotto di conformità</li>
                  <li><ShieldCheck size={18} color="var(--success)" /> Gestione degli incidenti</li>
                  <li><ShieldCheck size={18} color="var(--success)" /> Log immutabili</li>
                </ul>
              </motion.div>
              <motion.div className="card" variants={fadeInUp}>
                <h3>Policy Preimpostate</h3>
                <p>Documentazione legale e tecnica già redatta dai nostri esperti cyber, pronta per essere adottata e personalizzata per il tuo ente.</p>
                <ul className="feature-list">
                  <li><ShieldCheck size={18} color="var(--success)" /> Policy di Sicurezza delle Informazioni</li>
                  <li><ShieldCheck size={18} color="var(--success)" /> Business Continuity & Disaster Recovery</li>
                  <li><ShieldCheck size={18} color="var(--success)" /> Supply Chain Security</li>
                </ul>
              </motion.div>
              <motion.div className="card" variants={fadeInUp}>
                <h3>Allegati e Modulistica</h3>
                <p>L'arsenale completo da consegnare agli ispettori ACN in caso di verifica. Registri, audit trail e checklist operative.</p>
                <ul className="feature-list">
                  <li><ShieldCheck size={18} color="var(--success)" /> Fascicolo ispezione pronto</li>
                  <li><ShieldCheck size={18} color="var(--success)" /> Registri dei trattamenti e asset</li>
                  <li><ShieldCheck size={18} color="var(--success)" /> Checklist conformità</li>
                </ul>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Caricamento fascicolo...</div>}>
                <FascicoloPreview />
              </Suspense>
            </motion.div>
          </motion.div>
        </section>

        {/* Success Stories & Trust Center */}
        <section id="trust" style={{ background: 'var(--bg-dark)' }}>
          <motion.div className="container" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div className="grid" variants={staggerContainer} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
              
              {/* Trust Center */}
              <motion.div variants={fadeInUp}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'var(--success-bg)', padding: '0.75rem', borderRadius: '12px' }}>
                    <Lock size={28} color="var(--success)" />
                  </div>
                  <h2 style={{ fontSize: '2rem', margin: 0 }}>Trust Center</h2>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                  La sicurezza è il fondamento della nostra architettura. Tutti i dati immessi nel Command Center sono trattati secondo i più rigidi standard industriali per garantire confidenzialità e integrità.
                </p>
                <ul className="feature-list" style={{ gap: '1.5rem' }}>
                  <li>
                    <CheckCircle2 size={24} color="var(--primary-light)" style={{ flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-main)' }}>Crittografia End-to-End</strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Dati a riposo cifrati con protocollo AES-256 e in transito via TLS 1.3.</span>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={24} color="var(--primary-light)" style={{ flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-main)' }}>Conformità GDPR Rigorosa</strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Infrastruttura cloud europea (Data Residency in UE) con politiche di retention automatiche.</span>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={24} color="var(--primary-light)" style={{ flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-main)' }}>Zero-Trust Architecture</strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Controlli degli accessi basati su RBAC (Role-Based Access Control) per segmentazione privilegi.</span>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Success Story */}
              <motion.div variants={fadeInUp} style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                  <Building2 size={150} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Azienda Sanitaria Locale</h3>
                <span style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-light)', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '500', marginBottom: '2rem' }}>Caso di Successo</span>
                
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                  "L'adeguamento alla direttiva NIS2 sembrava richiedere un intero team dedicato per mesi. Grazie a NIS Shield, abbiamo mappato gli asset critici e generato il fascicolo per l'ACN in sole 3 settimane, risparmiando oltre 400 ore di lavoro del reparto IT."
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--primary-light)' }}>-70%</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tempo di deployment</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--primary-light)' }}>100%</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Copertura controlli</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Audit Quiz Section */}
        <section id="quiz">
          <motion.div className="container" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div style={{ textAlign: 'center', marginBottom: '2rem' }} variants={fadeInUp}>
              <h2 className="section-title">Valuta la tua preparazione</h2>
              <p className="section-subtitle">Rispondi a 4 semplici domande per scoprire se saresti in grado di superare un'ispezione ACN domani mattina.</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Caricamento quiz...</div>}>
                <AuditQuiz />
              </Suspense>
            </motion.div>
          </motion.div>
        </section>

        {/* Target Audience */}
        <section id="target" style={{ background: 'var(--bg-dark)' }}>
          <motion.div className="container" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.h2 className="section-title" variants={fadeInUp}>A chi ci rivolgiamo</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              La Direttiva NIS2 (D.Lgs. 138/2024) si applica obbligatoriamente alle <strong>medie e grandi imprese</strong> {'>'}50 dipendenti o {'>'}10M€ di fatturato) e alla Pubblica Amministrazione.
            </motion.p>
            
            <motion.div className="grid" style={{ marginTop: '2rem', textAlign: 'left' }} variants={staggerContainer}>
              <motion.div className="card" variants={fadeInUp}>
                <h4 style={{ color: 'var(--accent)', fontSize: '1.25rem', marginBottom: '1rem' }}>Soggetti Essenziali (All. I)</h4>
                <ul className="feature-list" style={{ marginTop: 0, fontSize: '0.9rem' }}>
                  <li>Energia <span style={{ whiteSpace: 'nowrap' }}>(Elettricità, Gas, Petrolio)</span></li>
                  <li>Trasporti <span style={{ whiteSpace: 'nowrap' }}>(Aereo, Ferroviario, Navale)</span></li>
                  <li>Bancario e Mercati Finanziari</li>
                  <li>Sanità <span style={{ whiteSpace: 'nowrap' }}>(Ospedali, Lab, Farmaceutica)</span></li>
                  <li>Acqua Potabile e Reflue</li>
                  <li>Infrastrutture Digitali (Cloud, Telco)</li>
                  <li>Pubblica Amministrazione</li>
                </ul>
              </motion.div>
              
              <motion.div className="card" variants={fadeInUp}>
                <h4 style={{ color: 'var(--accent)', fontSize: '1.25rem', marginBottom: '1rem' }}>Soggetti Importanti (All. II)</h4>
                <ul className="feature-list" style={{ marginTop: 0, fontSize: '0.9rem' }}>
                  <li>Servizi Postali e di Corriere</li>
                  <li>Gestione dei Rifiuti</li>
                  <li>Chimica <span style={{ whiteSpace: 'nowrap' }}>(Produzione e Distribuzione)</span></li>
                  <li>Alimentare <span style={{ whiteSpace: 'nowrap' }}>(Produzione)</span></li>
                  <li>Manifattura <span style={{ whiteSpace: 'nowrap' }}>(Dispositivi, Veicoli, Elettronica)</span></li>
                  <li>Fornitori di Servizi Digitali</li>
                  <li>Organizzazioni di Ricerca</li>
                </ul>
              </motion.div>
              
              <motion.div className="card" variants={fadeInUp} style={{ borderColor: 'var(--danger)' }}>
                <h4 style={{ color: 'var(--danger)', fontSize: '1.25rem', marginBottom: '1rem' }}>Fornitori / Supply Chain</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Anche se la tua azienda ha meno di 50 dipendenti, potresti essere obbligato alla conformità se sei un fornitore critico per un Soggetto Essenziale o Importante. 
                  <strong style={{ display: 'block', marginTop: '0.5rem', color: 'var(--text-main)' }}>Sei pronto a dimostrare la tua sicurezza ai tuoi clienti B2B?</strong>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Emergency Section */}
        <section className="emergency-section">
          <motion.div className="container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span className="emergency-badge">SUPPORTO IMMEDIATO ACN</span>
            <h2>Hai ricevuto un avviso di ispezione? Siamo al tuo fianco.</h2>
            <p style={{ maxWidth: '700px', margin: '1.5rem auto 2rem', color: '#F3F4F6', fontSize: '1.1rem' }}>
              Comprendiamo l'ansia di una verifica imminente. Il nostro team prenderà subito in carico la situazione, schierando <strong style={{color: 'white'}}>NIS Shield</strong> in tempi record per fornirti un "fascicolo ispezione" ineccepibile e farti superare i controlli a testa alta.
            </p>
            <a href="#contatti" onClick={scrollToContact} className="btn btn-danger">Richiedi Intervento Urgente</a>
          </motion.div>
        </section>

        {/* Contact Form */}
        <section id="contatti" className="contact-section">
          <motion.div className="container contact-container" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div className="contact-info" variants={fadeInUp}>
              <h2>Troviamo insieme la soluzione giusta per te.</h2>
              <p>
                Sappiamo che ogni Ente ha esigenze, strutture e budget diversi. Raccontaci la tua situazione senza alcun impegno: un nostro esperto ti ascolterà e studierà con te il piano d'azione più sereno ed efficace.
              </p>
              <ul className="feature-list" style={{ marginTop: '2rem' }}>
                <li><ShieldCheck size={20} color="var(--accent)" /> Consulenza esplorativa e ascolto</li>
                <li><ShieldCheck size={20} color="var(--accent)" /> Preventivo dettagliato senza impegno</li>
                <li><ShieldCheck size={20} color="var(--accent)" /> Massima riservatezza e supporto</li>
              </ul>
            </motion.div>
            
            <motion.div className="contact-form" variants={fadeInUp}>
              {formState === 'success' ? (
                <motion.div className="form-success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <div className="success-icon">
                    <ShieldCheck size={32} />
                  </div>
                  <h3>Richiesta Ricevuta!</h3>
                  <p style={{color: 'var(--text-muted)', marginTop: '0.5rem'}}>Un nostro esperto ti contatterà entro 24 ore per fornirti tutte le informazioni e un preventivo dedicato.</p>
                  <button onClick={() => setFormState('idle')} className="btn btn-outline" style={{marginTop: '1.5rem'}}>Invia nuova richiesta</button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nome dell'Ente o Azienda</label>
                    <input type="text" id="name" placeholder="Es. Comune di Roma o Tech SpA" required disabled={formState === 'submitting'} value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Istituzionale/Aziendale</label>
                    <input type="email" id="email" placeholder="nome@ente.it" required disabled={formState === 'submitting'} value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Ruolo (es. CISO, IT Manager)</label>
                    <input type="text" id="role" placeholder="IT Manager" disabled={formState === 'submitting'} value={formData.role} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Come possiamo aiutarti?</label>
                    <textarea id="message" rows="4" placeholder="Descrivi brevemente la tua situazione o richiedi una demo..." required disabled={formState === 'submitting'} value={formData.message} onChange={handleInputChange}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }} disabled={formState === 'submitting'}>
                    {formState === 'submitting' ? 'Invio in corso...' : 'Parla con un Esperto'}
                  </button>
                  <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1.25rem', textAlign: 'center'}}>
                    Cliccando su Invia accetti la nostra <a href="#" style={{color: 'var(--primary-light)'}}>Privacy Policy</a>. I tuoi dati sono trattati con massima sicurezza.
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="logo" style={{ justifyContent: 'center', marginBottom: '1.5rem', opacity: '0.8' }}>
            <img src="/nis_shield_logo.png" alt="NIS Shield Logo" />
            <span>NIS Shield</span>
          </div>
          <p>© {new Date().getFullYear()} NIS Shield. Tutti i diritti riservati.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Una soluzione professionale per la conformità alla Direttiva NIS2 e ai framework ACN.</p>
          
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Termini di Servizio</a>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
             <Link to="/admin" style={{ fontSize: '0.75rem', color: 'var(--border)', textDecoration: 'none' }}>Area Riservata</Link>
          </div>
        </div>
      </footer>

      {showCookies && (
        <motion.div className="cookie-banner" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0 }}>
          <div className="cookie-content">
            <h4>Gestione dei Cookie</h4>
            <p>Utilizziamo cookie tecnici per garantire il funzionamento del sito e cookie analitici per misurare il traffico in conformità al GDPR. Per maggiori dettagli, consulta la nostra <a href="#">Cookie Policy</a>.</p>
          </div>
          <div className="cookie-actions">
            <button className="btn btn-outline" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}} onClick={acceptCookies}>Solo Essenziali</button>
            <button className="btn btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}} onClick={acceptCookies}>Accetta Tutti</button>
          </div>
        </motion.div>
      )}

      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>
    </>
  );
}
