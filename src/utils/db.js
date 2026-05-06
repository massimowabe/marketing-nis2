import { supabase } from './supabaseClient';
import emailjs from '@emailjs/browser';

// Se Supabase non è configurato, usa il localStorage come fallback (Mock Mode)
export const isMockMode = !supabase;

export const saveLead = async (lead) => {
  const newLead = { ...lead, date: new Date().toISOString() };

  // 1. SALVATAGGIO DATABASE
  if (!isMockMode) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([newLead]);
      
      if (error) throw error;
    } catch (e) {
      console.error("Errore salvataggio Supabase:", e);
    }
  } else {
    // Fallback locale
    try {
      const existing = JSON.parse(localStorage.getItem('nis_leads') || '[]');
      newLead.id = Date.now();
      localStorage.setItem('nis_leads', JSON.stringify([newLead, ...existing]));
    } catch (e) {
      console.error("Error saving lead locally", e);
    }
  }

  // 2. INVIO NOTIFICA EMAIL (se configurato)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (serviceId && templateId && publicKey) {
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: 'tuo_indirizzo_reale@email.it',
          reply_to: newLead.email,
          lead_type: newLead.type,
          lead_score: newLead.score || 'N/A',
          message: newLead.message || 'Nuovo contatto dal sito NIS Shield.'
        },
        publicKey
      );
    } catch (error) {
      console.error("Errore invio email:", error);
    }
  }

  return newLead;
};

export const getLeads = async () => {
  if (!isMockMode) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error("Errore lettura Supabase:", e);
      return [];
    }
  } else {
    try {
      return JSON.parse(localStorage.getItem('nis_leads') || '[]');
    } catch (e) {
      console.error("Error getting leads locally", e);
      return [];
    }
  }
};
