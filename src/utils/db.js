export const saveLead = (lead) => {
  try {
    const existing = JSON.parse(localStorage.getItem('nis_leads') || '[]');
    const newLead = { ...lead, id: Date.now(), date: new Date().toISOString() };
    localStorage.setItem('nis_leads', JSON.stringify([newLead, ...existing]));
    return newLead;
  } catch (e) {
    console.error("Error saving lead", e);
    return null;
  }
};

export const getLeads = () => {
  try {
    return JSON.parse(localStorage.getItem('nis_leads') || '[]');
  } catch (e) {
    console.error("Error getting leads", e);
    return [];
  }
};
