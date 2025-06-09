
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { PredictionResult } from '../data/oilData';

interface ResultsChartProps {
  result: PredictionResult;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ result }) => {
  const barData = [
    { name: 'SRV COF', value: result.srvCOF * 100, target: 8 },
    { name: 'Four Ball Wear', value: result.fourBallWear * 10, target: 4 },
    { name: 'Film Thickness', value: result.filmThickness, target: 30 }
  ];

  const radarData = [
    { metric: 'Friction', value: (1 - result.srvCOF) * 100, fullMark: 100 },
    { metric: 'Wear Protection', value: (1 - result.fourBallWear) * 100, fullMark: 100 },
    { metric: 'Film Strength', value: (result.filmThickness / 50) * 100, fullMark: 100 }
  ];

  if (result.viscosityStability) {
    radarData.push({ metric: 'Viscosity Stability', value: result.viscosityStability, fullMark: 100 });
  }
  if (result.thermalStability) {
    radarData.push({ metric: 'Thermal Stability', value: result.thermalStability, fullMark: 100 });
  }
  if (result.oxidationResistance) {
    radarData.push({ metric: 'Oxidation Resistance', value: result.oxidationResistance, fullMark: 100 });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
              <Bar dataKey="target" fill="#10b981" opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Radar</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Performance" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsChart;
