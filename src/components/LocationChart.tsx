
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

interface LocationChartProps {
  timeRange: string;
  detailed?: boolean;
}

const LocationChart: React.FC<LocationChartProps> = ({ timeRange, detailed = false }) => {
  const generateLocationData = () => {
    return [
      { country: 'United States', city: 'New York', users: 1245, requests: 8943, color: '#3B82F6' },
      { country: 'United Kingdom', city: 'London', users: 892, requests: 6234, color: '#10B981' },
      { country: 'Germany', city: 'Berlin', users: 654, requests: 4521, color: '#F59E0B' },
      { country: 'France', city: 'Paris', users: 543, requests: 3876, color: '#EF4444' },
      { country: 'Japan', city: 'Tokyo', users: 432, requests: 3124, color: '#8B5CF6' },
      { country: 'Canada', city: 'Toronto', users: 321, requests: 2345, color: '#06B6D4' },
      { country: 'Australia', city: 'Sydney', users: 234, requests: 1687, color: '#F97316' },
      { country: 'Brazil', city: 'São Paulo', users: 198, requests: 1432, color: '#84CC16' }
    ];
  };

  const data = generateLocationData();

  return (
    <Card className={detailed ? 'col-span-full' : ''}>
      <CardHeader>
        <CardTitle>Traffic by Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${detailed ? 'h-96' : 'h-64'}`}>
          <ResponsiveContainer width="100%" height="100%">
            {detailed ? (
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="city" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#3B82F6" name="Users" />
                <Bar dataKey="requests" fill="#10B981" name="Requests" />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="users"
                  label={({ city, users }) => `${city}: ${users}`}
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

export default LocationChart;
