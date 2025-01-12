/*
  # Database Schema Updates
  
  1. Schema Changes
    - Add user_id columns to relevant tables
    - Add missing indexes
    - Update RLS policies
    
  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- Add columns first
ALTER TABLE public.claims 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

ALTER TABLE public.customers 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create indexes
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_claims_policy_type') THEN
        CREATE INDEX idx_claims_policy_type ON public.claims(policy_type);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_claims_status') THEN
        CREATE INDEX idx_claims_status ON public.claims(status);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_claims_date') THEN
        CREATE INDEX idx_claims_date ON public.claims(claim_date);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_claims_risk') THEN
        CREATE INDEX idx_claims_risk ON public.claims(risk_score);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_claims_user_id') THEN
        CREATE INDEX idx_claims_user_id ON public.claims(user_id);
    END IF;
END $$;

-- Enable RLS on all tables
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_trail ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forecasting_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own claims" ON public.claims;
DROP POLICY IF EXISTS "Users can insert own claims" ON public.claims;
DROP POLICY IF EXISTS "Users can view own audit trail" ON public.audit_trail;
DROP POLICY IF EXISTS "Users can view risk factors for own claims" ON public.risk_factors;
DROP POLICY IF EXISTS "Users can view own datasets" ON public.datasets;
DROP POLICY IF EXISTS "Users can insert own datasets" ON public.datasets;
DROP POLICY IF EXISTS "Users can view own customer data" ON public.customers;
DROP POLICY IF EXISTS "Users can insert customer data" ON public.customers;
DROP POLICY IF EXISTS "Users can view model training data" ON public.model_training;
DROP POLICY IF EXISTS "Users can view forecasting results" ON public.forecasting_results;
DROP POLICY IF EXISTS "Users can view own logs" ON public.logs;

-- Create new policies
CREATE POLICY "Users can view own claims"
    ON public.claims FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert own claims"
    ON public.claims FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own audit trail"
    ON public.audit_trail FOR SELECT
    TO authenticated
    USING (performed_by = auth.uid());

CREATE POLICY "Users can view risk factors for own claims"
    ON public.risk_factors FOR SELECT
    TO authenticated
    USING (claim_id IN (
        SELECT claim_id FROM public.claims WHERE user_id = auth.uid()
    ));

CREATE POLICY "Users can view own datasets"
    ON public.datasets FOR SELECT
    TO authenticated
    USING (uploaded_by = auth.uid());

CREATE POLICY "Users can insert own datasets"
    ON public.datasets FOR INSERT
    TO authenticated
    WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can view own customer data"
    ON public.customers FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert customer data"
    ON public.customers FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view model training data"
    ON public.model_training FOR SELECT
    TO authenticated
    USING (trained_by = auth.uid());

CREATE POLICY "Users can view forecasting results"
    ON public.forecasting_results FOR SELECT
    TO authenticated
    USING (dataset_id IN (
        SELECT id FROM public.datasets WHERE uploaded_by = auth.uid()
    ));

CREATE POLICY "Users can view own logs"
    ON public.logs FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());