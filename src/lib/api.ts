import { supabase } from './supabase';
import type { Claim } from '../types/supabase';

export const api = {
  // Claims
  async getClaims() {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .order('claim_date', { ascending: false });
    
    if (error) throw error;
    return data as Claim[];
  },

  async createClaim(claim: Omit<Claim, 'claim_id'>) {
    const { data, error } = await supabase
      .from('claims')
      .insert(claim)
      .select()
      .single();
    
    if (error) throw error;
    return data as Claim;
  },

  // Analytics
  async getFraudPredictions() {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .gt('risk_score', 0.7);
    
    if (error) throw error;
    return data as Claim[];
  },

  // File Upload
  async uploadDataset(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload/process.php', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    return response.json();
  }
};