/*
  # Insurance Analytics Schema Update

  1. New Tables
    - datasets
    - customers
    - model_training
    - forecasting_results
    - logs

  2. Changes
    - Add new fields to existing claims table
    - Add relationships between tables
    - Add RLS policies for new tables

  3. Security
    - Enable RLS on all new tables
    - Add appropriate access policies
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Datasets Table
CREATE TABLE IF NOT EXISTS datasets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id),
    upload_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    file_format TEXT CHECK (file_format IN ('csv', 'xlsx', 'json')),
    status TEXT CHECK (status IN ('pending', 'processed', 'error')) DEFAULT 'pending'
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    age INTEGER,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    location TEXT,
    policy_number TEXT UNIQUE,
    email TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Model Training Table
CREATE TABLE IF NOT EXISTS model_training (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name TEXT NOT NULL,
    last_trained TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK (status IN ('training', 'trained', 'error')),
    trained_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Forecasting Results Table
CREATE TABLE IF NOT EXISTS forecasting_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    forecast_year INTEGER NOT NULL,
    forecasted_claims DECIMAL(10,2),
    actual_claims DECIMAL(10,2),
    forecasted_fraud DECIMAL(10,2),
    actual_fraud DECIMAL(10,2),
    dataset_id UUID REFERENCES datasets(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Logs Table
CREATE TABLE IF NOT EXISTS logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    details JSONB
);

-- Add customer_id to claims table
ALTER TABLE claims ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id);
ALTER TABLE claims ADD COLUMN IF NOT EXISTS dataset_id UUID REFERENCES datasets(id);

-- Enable RLS on all tables
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE forecasting_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Create policies for datasets
CREATE POLICY "Users can view their own datasets"
    ON datasets FOR SELECT
    TO authenticated
    USING (uploaded_by = auth.uid());

CREATE POLICY "Users can insert their own datasets"
    ON datasets FOR INSERT
    TO authenticated
    WITH CHECK (uploaded_by = auth.uid());

-- Create policies for customers
CREATE POLICY "Users can view customers"
    ON customers FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can insert customers"
    ON customers FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Create policies for model_training
CREATE POLICY "Users can view model training"
    ON model_training FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can insert model training"
    ON model_training FOR INSERT
    TO authenticated
    WITH CHECK (trained_by = auth.uid());

-- Create policies for forecasting_results
CREATE POLICY "Users can view forecasting results"
    ON forecasting_results FOR SELECT
    TO authenticated
    USING (true);

-- Create policies for logs
CREATE POLICY "Users can view their own logs"
    ON logs FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert logs"
    ON logs FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();