
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface DataTableProps {
  type: 'users' | 'applications' | 'traffic' | 'locations';
  timeRange: string;
}

const DataTable: React.FC<DataTableProps> = ({ type, timeRange }) => {
  const generateTableData = () => {
    switch (type) {
      case 'users':
        return {
          title: 'User Activity Details',
          columns: ['Username', 'Requests', 'Sessions', 'Last Activity', 'Status'],
          data: [
            { username: 'john.doe', requests: 456, sessions: 12, lastActivity: '2 min ago', status: 'active' },
            { username: 'jane.smith', requests: 389, sessions: 8, lastActivity: '5 min ago', status: 'active' },
            { username: 'bob.wilson', requests: 234, sessions: 6, lastActivity: '15 min ago', status: 'idle' },
            { username: 'alice.johnson', requests: 567, sessions: 15, lastActivity: '1 min ago', status: 'active' },
            { username: 'mike.davis', requests: 123, sessions: 3, lastActivity: '1 hour ago', status: 'offline' }
          ]
        };
      case 'applications':
        return {
          title: 'Application Performance',
          columns: ['Application', 'Requests', 'Users', 'Avg Response Time', 'Error Rate'],
          data: [
            { application: 'Web Portal', requests: 4521, users: 234, avgResponseTime: '245ms', errorRate: '1.2%' },
            { application: 'Mobile App', requests: 3456, users: 189, avgResponseTime: '189ms', errorRate: '0.8%' },
            { application: 'API Gateway', requests: 2345, users: 456, avgResponseTime: '156ms', errorRate: '2.1%' },
            { application: 'Admin Panel', requests: 1234, users: 23, avgResponseTime: '298ms', errorRate: '0.5%' },
            { application: 'Analytics', requests: 987, users: 45, avgResponseTime: '367ms', errorRate: '1.8%' }
          ]
        };
      case 'traffic':
        return {
          title: 'Traffic Pattern Analysis',
          columns: ['Time Period', 'Total Requests', 'Unique Users', 'Peak Hour', 'Avg Load'],
          data: [
            { timePeriod: '00:00-06:00', totalRequests: 2456, uniqueUsers: 123, peakHour: '03:00', avgLoad: 'Low' },
            { timePeriod: '06:00-12:00', totalRequests: 8943, uniqueUsers: 567, peakHour: '09:00', avgLoad: 'High' },
            { timePeriod: '12:00-18:00', totalRequests: 12456, uniqueUsers: 789, peakHour: '14:00', avgLoad: 'Very High' },
            { timePeriod: '18:00-24:00', totalRequests: 6789, uniqueUsers: 345, peakHour: '19:00', avgLoad: 'Medium' }
          ]
        };
      case 'locations':
        return {
          title: 'Geographic Distribution',
          columns: ['Country', 'City', 'Users', 'Requests', 'Avg Session Duration'],
          data: [
            { country: 'United States', city: 'New York', users: 1245, requests: 8943, avgSessionDuration: '12m 34s' },
            { country: 'United Kingdom', city: 'London', users: 892, requests: 6234, avgSessionDuration: '9m 45s' },
            { country: 'Germany', city: 'Berlin', users: 654, requests: 4521, avgSessionDuration: '11m 23s' },
            { country: 'France', city: 'Paris', users: 543, requests: 3876, avgSessionDuration: '8m 56s' },
            { country: 'Japan', city: 'Tokyo', users: 432, requests: 3124, avgSessionDuration: '15m 12s' }
          ]
        };
      default:
        return { title: '', columns: [], data: [] };
    }
  };

  const tableData = generateTableData();

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      active: 'default',
      idle: 'secondary',
      offline: 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getLoadBadge = (load: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      'Low': 'secondary',
      'Medium': 'default',
      'High': 'default',
      'Very High': 'destructive'
    };
    return <Badge variant={variants[load] || 'default'}>{load}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tableData.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {tableData.columns.map((column, index) => (
                <TableHead key={index}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.data.map((row: any, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value: any, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {cellIndex === Object.values(row).length - 1 && type === 'users' ? 
                      getStatusBadge(value) :
                      cellIndex === Object.values(row).length - 1 && type === 'traffic' ?
                      getLoadBadge(value) :
                      value
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
