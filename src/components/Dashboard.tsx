
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, RefreshCw, Download, Filter } from 'lucide-react';
import UserTrafficChart from './UserTrafficChart';
import ApplicationUsageChart from './ApplicationUsageChart';
import HourlyTrafficChart from './HourlyTrafficChart';
import LocationChart from './LocationChart';
import StatsCards from './StatsCards';
import DataTable from './DataTable';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor user traffic and application usage</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards timeRange={timeRange} />

      {/* Main Content */}
      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserTrafficChart timeRange={timeRange} />
            <ApplicationUsageChart timeRange={timeRange} />
            <HourlyTrafficChart timeRange={timeRange} />
            <LocationChart timeRange={timeRange} />
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <UserTrafficChart timeRange={timeRange} detailed={true} />
            <DataTable type="users" timeRange={timeRange} />
          </div>
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <ApplicationUsageChart timeRange={timeRange} detailed={true} />
            <DataTable type="applications" timeRange={timeRange} />
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <HourlyTrafficChart timeRange={timeRange} detailed={true} />
            <DataTable type="traffic" timeRange={timeRange} />
          </div>
        </TabsContent>

        <TabsContent value="locations" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <LocationChart timeRange={timeRange} detailed={true} />
            <DataTable type="locations" timeRange={timeRange} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
