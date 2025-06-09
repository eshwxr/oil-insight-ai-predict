
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TestHistory as TestHistoryType } from '../data/oilData';
import { HistoryIcon, ClockIcon } from 'lucide-react';

interface TestHistoryProps {
  history: TestHistoryType[];
}

const TestHistory: React.FC<TestHistoryProps> = ({ history }) => {
  const getOilTypeColor = (oilType: string) => {
    const colors = {
      engine: 'bg-blue-100 text-blue-800',
      hydraulic: 'bg-green-100 text-green-800',
      compressed: 'bg-purple-100 text-purple-800',
      transmission: 'bg-orange-100 text-orange-800'
    };
    return colors[oilType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900 flex items-center">
          <HistoryIcon className="h-5 w-5 mr-2 text-blue-600" />
          Test History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((test) => (
          <div key={test.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <Badge className={getOilTypeColor(test.input.oilType)}>
                {test.input.oilType}
              </Badge>
              <div className="flex items-center text-xs text-gray-500">
                <ClockIcon className="h-3 w-3 mr-1" />
                {new Date(test.createdAt).toLocaleString()}
              </div>
            </div>
            
            <div className="text-sm space-y-1">
              <div className="font-medium text-gray-900">{test.input.properties.name}</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>Wear: {test.result.wear}</div>
                <div>Friction: {test.result.friction}</div>
                <div>Thermal: {test.result.thermalDegradation}%</div>
                <div>Oxidation: {test.result.oxidationLevel}%</div>
              </div>
              <div className="text-xs text-gray-500">
                {test.input.operatingConditions.temperature}°C, {test.input.operatingConditions.loadCondition} load
              </div>
            </div>
          </div>
        ))}
        
        {history.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <HistoryIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No tests run yet</p>
            <p className="text-sm">Your test history will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestHistory;
