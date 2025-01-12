export interface Claim {
  claim_id: string;
  policy_number: string;
  policy_type: string;
  claim_date: string;
  claim_amount: number;
  location: string;
  claimant_age: number;
  incident_type: string;
  status: string;
  risk_score: number;
}

export interface User {
  id: string;
  email: string;
}