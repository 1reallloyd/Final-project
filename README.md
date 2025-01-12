# Insurance Analytics Dashboard

A comprehensive insurance claims analytics platform with fraud detection and predictive capabilities.

## Features

### 1. User Authentication
-   Username/Password authentication
- Secure session management
- Role-based access control(admin only)

### 2. Dashboard
- Real-time KPI monitoring
- Interactive data visualization
- Claims distribution analysis
- Trend forecasting

### 3. Dataset Management
- Support for CSV/JSON file uploads
- Data validation and cleaning
- Automated processing

### 4. Analytics
- ML-powered fraud detection(Python)
- Claims prediction(python)
- Risk scoring(python)
- Real-time analytics(python)

### 5. Reporting
- Custom report generation
- Export to PDF/Excel
- Scheduled reporting
- Interactive visualizations

### 6. Settings
- Profile management
- System preferences
- Notification settings
- Data retention controls

## Database Structure

### Claims Table
```sql
CREATE TABLE claims (
    claim_id VARCHAR(10) PRIMARY KEY,
    policy_number VARCHAR(20) NOT NULL,
    policy_type VARCHAR(20) NOT NULL,
    claim_date DATE NOT NULL,
    claim_amount DECIMAL(15,2) NOT NULL,
    location VARCHAR(100) NOT NULL,
    claimant_age INT NOT NULL,
    incident_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    risk_score DECIMAL(4,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### Audit Trail Table
```sql
CREATE TABLE audit_trail (
    id UUID PRIMARY KEY,
    claim_id VARCHAR(10) REFERENCES claims(claim_id),
    action_type VARCHAR(10) NOT NULL,
    action_details JSONB NOT NULL,
    performed_by UUID NOT NULL,
    performed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### Risk Factors Table
```sql
CREATE TABLE risk_factors (
    id UUID PRIMARY KEY,
    claim_id VARCHAR(10) REFERENCES claims(claim_id),
    factor_type VARCHAR(50) NOT NULL,
    factor_value DECIMAL(4,2) NOT NULL,
    description TEXT
);
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

4. Start the development server:
```bash
npm run dev
```

5. Create an account:
- Visit the login page
- Click "Need an account? Sign up"
- Enter your email and password
- Login with your credentials

## Security Features

- Row Level Security (RLS) enabled
- Encrypted data transmission
- JWT token authentication
- Audit logging

## Tech Stack

- Frontend: React + TypeScript
- Styling: Tailwind CSS
- Charts: Chart.js
- Database: Supabase
- Authentication: Supabase Auth
- Icons: Lucide React

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint