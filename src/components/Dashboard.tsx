import React, { useState } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { KPICard } from './KPICard';
import { ChartCard } from './ChartCard';
import { DataTable } from './DataTable';
import { QuickFilters } from './QuickFilters';
import { ExportButtons } from './ExportButtons';

export const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('monthly');

  const doughnutData = {
    labels: ['Fraudulent', 'Legitimate'],
    datasets: [{
      data: [15, 85],
      backgroundColor: ['#ef5350', '#4caf50'],
      borderWidth: 0
    }]
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Claims Trend',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: '#1a237e',
      backgroundColor: 'rgba(26, 35, 126, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const barData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Actual Claims',
        data: [300, 450, 380, 420],
        backgroundColor: '#1a237e'
      },
      {
        label: 'Predicted Claims',
        data: [320, 430, 400, 440],
        backgroundColor: '#7986cb'
      }
    ]
  };

  const flaggedClaimsData = [
    { id: 'CLM001', date: '2024-02-28', type: 'Auto', amount: 'GH₵5,000', risk: 'High' },
    { id: 'CLM002', date: '2024-02-27', type: 'Property', amount: 'GH₵12,000', risk: 'Medium' },
    { id: 'CLM003', date: '2024-02-26', type: 'Health', amount: 'GH₵3,500', risk: 'Low' },
  ];

  const fraudPredictionsData = [
    { id: 'FRD001', date: '2024-02-28', probability: '85%', type: 'Identity Theft', status: 'Investigation' },
    { id: 'FRD002', date: '2024-02-27', probability: '92%', type: 'Billing Fraud', status: 'Confirmed' },
    { id: 'FRD003', date: '2024-02-26', probability: '78%', type: 'Multiple Claims', status: 'Pending' },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
            <p className="text-gray-500 text-lg">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
          </div>
          <ExportButtons />
        </div>
      </div>

      <QuickFilters dateRange={dateRange} setDateRange={setDateRange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard title="Total Claims" value="1,234,567" change={12} type="claims" />
        <KPICard title="Fraud Detected" value="45" change={-8} type="fraud" />
        <KPICard title="Predicted Claims" value="890" change={5} type="predicted" />
        <KPICard title="Risk Score" value="76%" change={3} type="risk" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Claims Distribution">
          <Doughnut data={doughnutData} />
        </ChartCard>

        <ChartCard title="Claims Trend">
          <Line data={lineData} options={{
            plugins: {
              legend: {
                position: 'top' as const,
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
          }} />
        </ChartCard>
      </div>

      <ChartCard title="Actual vs Predicted Claims">
        <Bar data={barData} options={{
          plugins: {
            legend: {
              position: 'top' as const,
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
        }} />
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <DataTable 
          title="Flagged Claims"
          data={flaggedClaimsData}
          columns={['ID', 'Date', 'Type', 'Amount', 'Risk Level']}
        />
        <DataTable 
          title="Fraud Predictions"
          data={fraudPredictionsData}
          columns={['ID', 'Date', 'Probability', 'Type', 'Status']}
        />
      </div>
    </div>
  );
};