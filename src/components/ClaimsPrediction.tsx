import React from 'react';
import { ChartCard } from './ChartCard';
import { Line, Bar } from 'react-chartjs-2';
import { format, addMonths } from 'date-fns';

export const ClaimsPrediction = () => {
  const nextSixMonths = Array.from({ length: 6 }, (_, i) => 
    format(addMonths(new Date(), i), 'MMM yyyy')
  );

  const predictionData = {
    labels: nextSixMonths,
    datasets: [
      {
        label: 'Predicted Claims',
        data: [420, 450, 480, 460, 490, 510],
        borderColor: '#1a237e',
        backgroundColor: 'rgba(26, 35, 126, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Confidence Interval',
        data: [380, 410, 440, 420, 450, 470],
        borderColor: '#7986cb',
        backgroundColor: 'rgba(121, 134, 203, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const categoryPredictions = {
    labels: ['Auto', 'Property', 'Health', 'Life', 'Business'],
    datasets: [
      {
        label: 'Expected Claims',
        data: [300, 250, 400, 150, 200],
        backgroundColor: '#1a237e',
      }
    ]
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Claims Prediction</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Claims Forecast">
          <Line 
            data={predictionData}
            options={{
              plugins: {
                legend: { position: 'top' },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Claims'
                  }
                }
              }
            }}
          />
        </ChartCard>

        <ChartCard title="Predictions by Category">
          <Bar
            data={categoryPredictions}
            options={{
              plugins: {
                legend: { position: 'top' }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Expected Claims'
                  }
                }
              }
            }}
          />
        </ChartCard>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Prediction Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Peak Period</h4>
            <p className="text-blue-800">Expected in August 2024</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Growth Trend</h4>
            <p className="text-green-800">+8.5% YoY Increase</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Risk Level</h4>
            <p className="text-purple-800">Moderate</p>
          </div>
        </div>
      </div>
    </div>
  );
};