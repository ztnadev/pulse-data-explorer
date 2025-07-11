
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Globe, Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardsProps {
  timeRange: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ timeRange }) => {
  // Mock data based on time range
  const getStatsData = () => {
    const multiplier = timeRange === '1h' ? 1 : timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
    
    return {
      totalUsers: Math.floor(1420 * (multiplier / 24)),
      activeUsers: Math.floor(845 * (multiplier / 24)),
      totalRequests: Math.floor(15680 * (multiplier / 24)),
      errorRate: 2.3,
      responseTime: 245
    };
  };

  const stats = getStatsData();

  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Users,
      description: 'Active users in period'
    },
    {
      title: 'Active Sessions',
      value: stats.activeUsers.toLocaleString(),
      change: '+8%',
      trend: 'up',
      icon: Activity,
      description: 'Currently active sessions'
    },
    {
      title: 'Total Requests',
      value: stats.totalRequests.toLocaleString(),
      change: '+15%',
      trend: 'up',
      icon: Globe,
      description: 'API requests processed'
    },
    {
      title: 'Error Rate',
      value: `${stats.errorRate}%`,
      change: '-0.5%',
      trend: 'down',
      icon: TrendingDown,
      description: 'Request error percentage'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isPositive = card.trend === 'up';
        
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="flex items-center mt-2">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {card.change}
                </span>
                <span className="text-xs text-gray-500 ml-2">{card.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
