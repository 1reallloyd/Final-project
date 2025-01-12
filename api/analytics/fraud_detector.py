import numpy as np
from sklearn.ensemble import IsolationForest

class FraudDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1, random_state=42)
        
    def calculate_risk_score(self, claim_data):
        """Calculate risk score for a claim based on various factors"""
        features = [
            float(claim_data['claim_amount']),
            float(claim_data['claimant_age']),
            self._encode_policy_type(claim_data['policy_type']),
            self._time_since_policy_start(claim_data['policy_start_date'])
        ]
        
        # Predict anomaly score (-1 for anomalies, 1 for normal)
        score = self.model.predict([features])[0]
        
        # Convert to risk score between 0 and 1
        risk_score = (1 - score) / 2
        return round(risk_score, 2)
    
    def _encode_policy_type(self, policy_type):
        policy_types = {'Auto': 1, 'Property': 2, 'Health': 3, 'Life': 4, 'Business': 5}
        return policy_types.get(policy_type, 0)
    
    def _time_since_policy_start(self, start_date):
        # Calculate months between policy start and current date
        from datetime import datetime
        start = datetime.strptime(start_date, '%Y-%m-%d')
        now = datetime.now()
        return (now.year - start.year) * 12 + (now.month - start.month)