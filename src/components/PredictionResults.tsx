
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PredictionResult } from '../data/oilData';
import { CheckCircleIcon, AlertCircleIcon, XCircleIcon, Loader2Icon } from 'lucide-react';
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
              Analyzing Oil Properties
            </h3>
            <p className="text-gray-600">
              Our AI models are processing your oil data...
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
              <CheckCircleIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready for Prediction
            </h3>
            <p className="text-gray-600">
              Enter oil properties and click "Predict Performance" to see results
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPerformanceRating = (metric: string, value: number) => {
    // Simple performance rating logic
    if (metric === 'srvCOF') {
      if (value < 0.08) return { rating: 'Excellent', color: 'green', icon: CheckCircleIcon };
      if (value < 0.10) return { rating: 'Good', color: 'yellow', icon: AlertCircleIcon };
      return { rating: 'Needs Improvement', color: 'red', icon: XCircleIcon };
    }
    if (metric === 'fourBallWear') {
      if (value < 0.4) return { rating: 'Excellent', color: 'green', icon: CheckCircleIcon };
      if (value < 0.6) return { rating: 'Good', color: 'yellow', icon: AlertCircleIcon };
      return { rating: 'Needs Improvement', color: 'red', icon: XCircleIcon };
    }
    if (metric === 'filmThickness') {
      if (value > 30) return { rating: 'Excellent', color: 'green', icon: CheckCircleIcon };
      if (value > 20) return { rating: 'Good', color: 'yellow', icon: AlertCircleIcon };
      return { rating: 'Needs Improvement', color: 'red', icon: XCircleIcon };
    }
    return { rating: 'Good', color: 'blue', icon: CheckCircleIcon };
  };

  const metrics = [
    { key: 'srvCOF', label: 'SRV Coefficient of Friction', value: result.srvCOF, unit: '' },
    { key: 'fourBallWear', label: 'Four Ball Wear', value: result.fourBallWear, unit: 'mm' },
    { key: 'filmThickness', label: 'Film Thickness', value: result.filmThickness, unit: 'nm' }
  ];

  if (result.viscosityStability) {
    metrics.push({ key: 'viscosityStability', label: 'Viscosity Stability', value: result.viscosityStability, unit: '%' });
  }
  if (result.thermalStability) {
    metrics.push({ key: 'thermalStability', label: 'Thermal Stability', value: result.thermalStability, unit: '%' });
  }
  if (result.oxidationResistance) {
    metrics.push({ key: 'oxidationResistance', label: 'Oxidation Resistance', value: result.oxidationResistance, unit: '%' });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
            Prediction Results
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
                      value={metric.key === 'srvCOF' ? (1 - metric.value) * 100 : 
                             metric.key === 'fourBallWear' ? (1 - metric.value) * 100 :
                             metric.value > 100 ? 100 : metric.value} 
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
