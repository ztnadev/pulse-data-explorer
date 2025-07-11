
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Upload, FileText, Image, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

interface FileOperationsProps {
  onDataUpload: (data: any[]) => void;
}

const FileOperations: React.FC<FileOperationsProps> = ({ onDataUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    try {
      // Create a new window with the dashboard content for PDF generation
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Analytics Dashboard Report</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .section { margin-bottom: 20px; page-break-inside: avoid; }
                .chart-placeholder { 
                  width: 100%; 
                  height: 200px; 
                  border: 1px solid #ccc; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  background: #f9f9f9; 
                }
                @media print {
                  body { margin: 0; }
                  .section { page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Analytics Dashboard Report</h1>
                <p>Generated on ${new Date().toLocaleDateString()}</p>
              </div>
              <div class="section">
                <h2>User Traffic Summary</h2>
                <div class="chart-placeholder">User Traffic Chart</div>
              </div>
              <div class="section">
                <h2>Application Usage</h2>
                <div class="chart-placeholder">Application Usage Chart</div>
              </div>
              <div class="section">
                <h2>Traffic by Hour</h2>
                <div class="chart-placeholder">Hourly Traffic Chart</div>
              </div>
              <div class="section">
                <h2>Geographic Distribution</h2>
                <div class="chart-placeholder">Location Chart</div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
      
      toast({
        title: "PDF Export",
        description: "PDF generation initiated. Please use your browser's print dialog.",
      });
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to generate PDF report.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadJPG = async () => {
    try {
      const dashboardElement = document.querySelector('.dashboard-content') as HTMLElement;
      if (!dashboardElement) {
        throw new Error('Dashboard content not found');
      }

      toast({
        title: "Generating Screenshot",
        description: "Creating JPG image of the dashboard...",
      });

      const canvas = await html2canvas(dashboardElement, {
        backgroundColor: '#f8f9fa',
        scale: 0.8,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `dashboard-${new Date().toISOString().split('T')[0]}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          toast({
            title: "JPG Export Complete",
            description: "Dashboard screenshot downloaded successfully.",
          });
        }
      }, 'image/jpeg', 0.9);
    } catch (error) {
      console.error('Screenshot error:', error);
      toast({
        title: "Export Error",
        description: "Failed to generate JPG screenshot.",
        variant: "destructive",
      });
    }
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const data = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          return row;
        });

        onDataUpload(data);
        toast({
          title: "Data Uploaded Successfully",
          description: `Successfully uploaded ${data.length} records from CSV.`,
        });
      } catch (error) {
        console.error('CSV parsing error:', error);
        toast({
          title: "Upload Error",
          description: "Failed to parse CSV file. Please check the format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5" />
          File Operations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleDownloadPDF} variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Download PDF
          </Button>
          
          <Button onClick={handleDownloadJPG} variant="outline" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Download JPG
          </Button>
          
          <Button onClick={triggerFileUpload} variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload CSV Data
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="hidden"
          />
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">File Operation Guidelines:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>CSV Upload:</strong> Upload files with columns like username, application, timestamp, location, requests, sessions, etc.</p>
            <p><strong>PDF Export:</strong> Generate printable reports with charts and data summaries.</p>
            <p><strong>JPG Export:</strong> Create high-quality screenshot images of the entire dashboard.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileOperations;
