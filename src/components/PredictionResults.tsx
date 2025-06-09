
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PredictionResult } from '../data/oilData';
import { CheckCircleIcon, AlertCircleIcon, XCircleIcon, Loader2Icon, TrendingUpIcon } from 'lucide-react';
import ResultsChart from './ResultsChart';

interface PredictionResultsProps {
  result: PredictionResult | null;
  isLoading: boolean;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2Icon className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              AI Analysis in Progress
            </h3>
            <p className="text-gray-600">
              Processing oil properties and operating conditions...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUpIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready for Testing
            </h3>
            <p className="text-gray-600">
              Configure oil properties and operating conditions, then run the performance test
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPerformanceRating = (metric: string, value: number) => {
    // Performance rating logic for the 4 outputs
    if (metric === 'wear') {
      if (value < 0.06) return { rating: 'Excellent', color: 'green', icon: CheckCircleIcon };
      if (value < 0.10) return { rating: 'Good', color: 'yellow', icon: AlertCircleIcon };
      return { rating: 'Needs Improvement', color: 'red', icon: XCircleIcon };
    }
    if (metric === 'friction') {
      if (value < 0.08) return { rating: 'Excellent', color: 'green', icon: CheckCircleIcon };
      if (value < 0.12) return { rating: 'Good', color: 'yellow', icon: AlertCircleIcon };
      return { rating: 'Needs Improvement', color: 'red', icon: XCircleIcon };
    }
    if (metric === 'thermalDegradation') {
      if (value < 15) return { rating: 'Excellent', color: 'green', icon: CheckCircleIcon };
      if (value < 25) return { rating: 'Good', color: 'yellow', icon: AlertCircleIcon };
      return { rating: 'Needs Improvement', color: 'red', icon: XCircleIcon };
    }
    if (metric === 'oxidationLevel') {
      if (value < 12) return { rating: 'Excellent', color: 'green', icon: CheckCircleIcon };
      if (value < 20) return { rating: 'Good', color: 'yellow', icon: AlertCircleIcon };
      return { rating: 'Needs Improvement', color: 'red', icon: XCircleIcon };
    }
    return { rating: 'Good', color: 'blue', icon: CheckCircleIcon };
  };

  const metrics = [
    { key: 'wear', label: 'Wear Rate', value: result.wear, unit: 'mm/1000h' },
    { key: 'friction', label: 'Friction Coefficient', value: result.friction, unit: '' },
    { key: 'thermalDegradation', label: 'Thermal Degradation', value: result.thermalDegradation, unit: '%' },
    { key: 'oxidationLevel', label: 'Oxidation Level', value: result.oxidationLevel, unit: '%' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
            Test Results - {result.testId}
          </CardTitle>
          <p className="text-sm text-gray-500">
            Generated on {new Date(result.timestamp).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.map((metric) => {
            const performance = getPerformanceRating(metric.key, metric.value);
            const IconComponent = performance.icon;
            
            return (
              <div key={metric.key} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{metric.label}</h4>
                  <Badge variant={performance.color === 'green' ? 'default' : 'secondary'}>
                    <IconComponent className="h-3 w-3 mr-1" />
                    {performance.rating}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.value} {metric.unit}
                  </span>
                  <div className="flex-1">
                    <Progress 
                      value={metric.key.includes('degradation') || metric.key.includes('oxidation') 
                        ? Math.max(0, 100 - metric.value) 
                        : Math.max(0, (1 - metric.value) * 100)} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <ResultsChart result={result} />
    </div>
  );
};

export default PredictionResults;
