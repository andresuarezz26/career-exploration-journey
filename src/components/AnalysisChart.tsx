
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface AnalysisChartProps {
  data: any;
  chartType: 'radar' | 'bar';
  title: string;
}

const AnalysisChart: React.FC<AnalysisChartProps> = ({ data, chartType, title }) => {
  if (!data) return null;

  const normalizeData = (data: any) => {
    if (Array.isArray(data)) return data;
    
    // Convert object to array if needed
    if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([name, value]) => ({
        name,
        value: typeof value === 'number' ? value : 0
      }));
    }
    
    return [];
  };

  const processedData = normalizeData(data);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'radar' ? (
              <RadarChart outerRadius="80%" data={processedData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#8b5cf6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            ) : (
              <BarChart data={processedData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Score" 
                  fill="#6366f1" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisChart;
