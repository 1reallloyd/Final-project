import numpy as np
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime, timedelta

class ClaimsPredictor:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        
    def predict_future_claims(self, historical_data, months_ahead=6):
        """Predict number of claims for future months"""
        X = self._prepare_features(historical_data)
        future_dates = self._generate_future_dates(months_ahead)
        predictions = []
        
        for date in future_dates:
            features = self._create_date_features(date)
            prediction = self.model.predict([features])[0]
            predictions.append({
                'date': date.strftime('%Y-%m-%d'),
                'predicted_claims': round(prediction)
            })
            
        return predictions
    
    def _prepare_features(self, data):
        """Convert historical data into training features"""
        features = []
        for entry in data:
            date = datetime.strptime(entry['date'], '%Y-%m-%d')
            features.append(self._create_date_features(date))
        return features
    
    def _create_date_features(self, date):
        return [
            date.month,
            date.weekday(),
            date.day,
            int(date.month in [12, 1, 2]),  # winter
            int(date.month in [6, 7, 8])    # summer
        ]
    
    def _generate_future_dates(self, months):
        dates = []
        current_date = datetime.now()
        for i in range(months):
            dates.append(current_date + timedelta(days=30*i))
        return dates