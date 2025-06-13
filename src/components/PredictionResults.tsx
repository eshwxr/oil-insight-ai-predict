
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress'; // No longer used directly for new metrics
// import { Badge } from '@/components/ui/badge'; // No longer used directly for new metrics
import { PredictionResult } from '../data/oilData';
import { CheckCircleIcon, /*AlertCircleIcon, XCircleIcon,*/ Loader2Icon, TrendingUpIcon, ZapIcon, DropletsIcon, LayersIcon, RotateCwIcon } from 'lucide-react'; // Added new icons
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
    // getPerformanceRating is no longer needed as the old metrics and their ratings are removed.
    // const metrics array is no longer needed.
    return { rating: 'Good', color: 'blue', icon: CheckCircleIcon }; // This line is effectively dead code now but harmless.
  };


  // Define the new metrics to display from backend
  const backendMetrics = [
    { 
      key: 'srvCOF', 
      label: 'SRV COF', 
      value: result.srvCOF?.toFixed(3) || 'N/A', // Format to 3 decimal places
      unit: '',
      icon: ZapIcon 
    },
    { 
      key: 'fourBallWear', 
      label: 'FourBall WSD (mm)', 
      value: result.fourBallWear?.toFixed(3) || 'N/A', // Format to 3 decimal places
      unit: 'mm',
      icon: DropletsIcon
    },
    { 
      key: 'filmThickness', 
      label: 'EHD Film Thickness (nm)', 
      value: result.filmThickness?.toFixed(1) || 'N/A', // Format to 1 decimal place
      unit: 'nm',
      icon: LayersIcon
    },
    { 
      key: 'frictionTorqueNm', 
      label: 'Friction Torque (Nm)', 
      value: result.frictionTorqueNm?.toFixed(3) || 'N/A', // Format to 3 decimal places
      unit: 'Nm',
      icon: RotateCwIcon
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
            AI Prediction Results - {result.testId}
          </CardTitle>
          <p className="text-sm text-gray-500">
            Generated on {new Date(result.timestamp).toLocaleString()} for Oil Type: <span className="font-semibold capitalize">{result.oilType}</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {backendMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <div key={metric.key} className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-base font-semibold text-gray-800">{metric.label}</h4>
                    <IconComponent className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-gray-900">
                      {metric.value}
                    </span>
                    {metric.unit && (
                      <span className="ml-1 text-sm text-gray-600">{metric.unit}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ResultsChart is kept as per instructions, though its data source (mocked values) might be misaligned now */}
      <ResultsChart result={result} />
    </div>
  );
};

export default PredictionResults;
