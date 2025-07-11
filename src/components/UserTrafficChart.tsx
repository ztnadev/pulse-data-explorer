
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface UserTrafficChartProps {
  timeRange: string;
  detailed?: boolean;
}

const UserTrafficChart: React.FC<UserTrafficChartProps> = ({ timeRange, detailed = false }) => {
  // Mock data generation based on time range
  const generateData = () => {
    const users = ['john.doe', 'jane.smith', 'bob.wilson', 'alice.johnson', 'mike.davis', 
                   'sarah.brown', 'tom.anderson', 'lisa.garcia', 'david.martin', 'emma.taylor'];
    
    return users.map(user => ({
      username: user,
      requests: Math.floor(Math.random() * 500) + 100,
      sessions: Math.floor(Math.random() * 20) + 5,
      errors: Math.floor(Math.random() * 10),
    }));
  };

  const data = generateData();

  return (
    <Card className={detailed ? 'col-span-full' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          User Traffic by Username
          <span className="text-sm font-normal text-gray-500">
            Top {detailed ? '20' : '10'} Users
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${detailed ? 'h-96' : 'h-64'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="username" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <Legend />
              <Bar dataKey="requests" fill="#3B82F6" name="Requests" />
              <Bar dataKey="sessions" fill="#10B981" name="Sessions" />
              {detailed && <Bar dataKey="errors" fill="#EF4444" name="Errors" />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTrafficChart;
