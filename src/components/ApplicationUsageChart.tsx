
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ApplicationUsageChartProps {
  timeRange: string;
  detailed?: boolean;
}

const ApplicationUsageChart: React.FC<ApplicationUsageChartProps> = ({ timeRange, detailed = false }) => {
  const generateData = () => {
    const applications = [
      { name: 'Web Portal', usage: 45, color: '#3B82F6' },
      { name: 'Mobile App', usage: 30, color: '#10B981' },
      { name: 'API Gateway', usage: 15, color: '#F59E0B' },
      { name: 'Admin Panel', usage: 7, color: '#EF4444' },
      { name: 'Analytics', usage: 3, color: '#8B5CF6' }
    ];

    return applications.map(app => ({
      ...app,
      requests: Math.floor(Math.random() * 5000) + 1000,
      users: Math.floor(Math.random() * 200) + 50,
      responseTime: Math.floor(Math.random() * 300) + 100
    }));
  };

  const data = generateData();

  return (
    <Card className={detailed ? 'col-span-full' : ''}>
      <CardHeader>
        <CardTitle>Application Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${detailed ? 'h-96' : 'h-64'}`}>
          <ResponsiveContainer width="100%" height="100%">
            {detailed ? (
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="requests" fill="#3B82F6" name="Requests" />
                <Bar dataKey="users" fill="#10B981" name="Users" />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="usage"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationUsageChart;
