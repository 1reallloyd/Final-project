import React from 'react';
import { ChartCard } from './ChartCard';
import { Line, Doughnut } from 'react-chartjs-2';

export const FraudDetection = () => {
  const fraudTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Fraud Detection Rate',
        data: [3.2, 2.8, 3.5, 4.1, 3.8, 3.2],
        borderColor: '#1a237e',
        backgroundColor: 'rgba(26, 35, 126, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const fraudTypeData = {
    labels: ['Identity Theft', 'Billing Fraud', 'Staged Accidents', 'Other'],
    datasets: [{
      data: [35, 25, 20, 20],
      backgroundColor: ['#1a237e', '#283593', '#3949ab', '#5c6bc0'],
      borderWidth: 0
    }]
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Fraud Detection</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Fraud Detection Trend">
          <Line data={fraudTrendData} options={{
            plugins: {
              legend: { position: 'top' },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Detection Rate (%)'
                }
              }
            }
          }} />
        </ChartCard>

        <ChartCard title="Fraud Types Distribution">
          <Doughnut data={fraudTypeData} options={{
            plugins: {
              legend: { position: 'right' }
            }
          }} />
        </ChartCard>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Recent Fraud Alerts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claim ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2024-02-{20 + index}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    CLM-{2024000 + index}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Identity Theft
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      High
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};