/*
  # Insurance Analytics Schema

  1. New Tables
    - claims
      - Main table for storing insurance claims data
      - Includes policy info, claim details, and risk assessment
    - audit_trail
      - Tracks all changes to claims
      - Records who made changes and when
    - risk_factors
      - Stores detailed risk analysis data
      - Links to claims via claim_id

  2. Security
    - Enables RLS on all tables
    - Adds policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Claims Table
CREATE TABLE claims (
    claim_id VARCHAR(10) PRIMARY KEY,
    policy_number VARCHAR(20) NOT NULL,
    policy_type VARCHAR(20) NOT NULL CHECK (policy_type IN ('Auto', 'Property', 'Health', 'Life', 'Business')),
    claim_date DATE NOT NULL,
    claim_amount DECIMAL(15,2) NOT NULL,
    location VARCHAR(100) NOT NULL,
    claimant_age INT NOT NULL,
    incident_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Investigation')),
    risk_score DECIMAL(4,2) NOT NULL,
    incident_date DATE,
    description TEXT,
    supporting_documents JSONB,
    adjuster_notes TEXT,
    settlement_amount DECIMAL(15,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for common queries
CREATE INDEX idx_policy_type ON claims(policy_type);
CREATE INDEX idx_status ON claims(status);
CREATE INDEX idx_claim_date ON claims(claim_date);
CREATE INDEX idx_risk_score ON claims(risk_score);

-- Audit Trail Table
CREATE TABLE audit_trail (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id VARCHAR(10) REFERENCES claims(claim_id),
    action_type VARCHAR(10) NOT NULL CHECK (action_type IN ('create', 'update', 'delete')),
    action_details JSONB NOT NULL,
    performed_by UUID NOT NULL REFERENCES auth.users(id),
    performed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Risk Factors Table
CREATE TABLE risk_factors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id VARCHAR(10) REFERENCES claims(claim_id),
    factor_type VARCHAR(50) NOT NULL,
    factor_value DECIMAL(4,2) NOT NULL,
    description TEXT
);

-- Enable Row Level Security
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_trail ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_factors ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own claims"
    ON claims FOR SELECT
    TO authenticated
    USING (auth.uid() IN (
        SELECT performed_by 
        FROM audit_trail 
        WHERE claim_id = claims.claim_id
    ));

CREATE POLICY "Users can insert claims"
    ON claims FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Users can view their own audit entries"
    ON audit_trail FOR SELECT
    TO authenticated
    USING (performed_by = auth.uid());

CREATE POLICY "Users can insert audit entries"
    ON audit_trail FOR INSERT
    TO authenticated
    WITH CHECK (performed_by = auth.uid());

CREATE POLICY "Users can view risk factors for their claims"
    ON risk_factors FOR SELECT
    TO authenticated
    USING (claim_id IN (
        SELECT claim_id 
        FROM claims 
        WHERE claim_id = risk_factors.claim_id
    ));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_claims_updated_at
    BEFORE UPDATE ON claims
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();