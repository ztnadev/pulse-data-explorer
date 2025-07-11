
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
import FileOperations from './FileOperations';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [refreshing, setRefreshing] = useState(false);
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleDataUpload = (data: any[]) => {
    setUploadedData(data);
    console.log('Uploaded data:', data);
  };

  const handleExportCSV = () => {
    // Generate CSV data from current dashboard state
    const csvData = [
      ['Username', 'Application', 'Requests', 'Sessions', 'Location'],
      ['john.doe', 'Web Portal', '245', '12', 'New York'],
      ['jane.smith', 'Mobile App', '189', '8', 'London'],
      ['bob.wilson', 'API Gateway', '156', '15', 'Tokyo'],
      // Add more sample data
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 dashboard-content">
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
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* File Operations */}
      <FileOperations onDataUpload={handleDataUpload} />

      {/* Display uploaded data info */}
      {uploadedData.length > 0 && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <p className="text-green-800">
              <strong>Data Source:</strong> Using uploaded CSV data ({uploadedData.length} records)
            </p>
          </CardContent>
        </Card>
      )}

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
