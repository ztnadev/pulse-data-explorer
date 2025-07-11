
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

interface HourlyTrafficChartProps {
  timeRange: string;
  detailed?: boolean;
}

const HourlyTrafficChart: React.FC<HourlyTrafficChartProps> = ({ timeRange, detailed = false }) => {
  const generateHourlyData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => {
      const baseTraffic = Math.sin((i - 6) * Math.PI / 12) * 200 + 300;
      const randomVariation = (Math.random() - 0.5) * 100;
      
      return {
        hour: `${i.toString().padStart(2, '0')}:00`,
        requests: Math.max(50, Math.floor(baseTraffic + randomVariation)),
        users: Math.max(10, Math.floor((baseTraffic + randomVariation) / 8)),
        errors: Math.floor(Math.random() * 20),
        responseTime: Math.floor(Math.random() * 200) + 150
      };
    });
    
    return hours;
  };

  const data = generateHourlyData();

  return (
    <Card className={detailed ? 'col-span-full' : ''}>
      <CardHeader>
        <CardTitle>Traffic by Hour</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${detailed ? 'h-96' : 'h-64'}`}>
          <ResponsiveContainer width="100%" height="100%">
            {detailed ? (
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="requests" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Requests" />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Users" />
                <Line type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} name="Errors" />
              </AreaChart>
            ) : (
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} name="Requests" />
                <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} name="Users" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTrafficChart;
