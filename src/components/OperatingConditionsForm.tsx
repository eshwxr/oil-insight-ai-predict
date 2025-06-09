
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OperatingConditions } from '../data/oilData';
import { Loader2Icon, FlaskConicalIcon, ThermometerIcon, GaugeIcon, WeightIcon, ClockIcon, CloudIcon } from 'lucide-react';

interface OperatingConditionsFormProps {
  operatingConditions: OperatingConditions;
  onConditionsChange: (conditions: OperatingConditions) => void;
  onPredict: () => void;
  isLoading: boolean;
}

const OperatingConditionsForm: React.FC<OperatingConditionsFormProps> = ({
  operatingConditions,
  onConditionsChange,
  onPredict,
  isLoading
}) => {
  const handleInputChange = (field: keyof OperatingConditions, value: string | number) => {
    onConditionsChange({
      ...operatingConditions,
      [field]: value
    });
  };

  const getLoadConditionColor = (condition: string) => {
    switch (condition) {
      case 'light': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'heavy': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'extreme': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getEnvironmentIcon = (environment: string) => {
    switch (environment) {
      case 'indoor': return '🏢';
      case 'outdoor': return '🌲';
      case 'marine': return '🌊';
      case 'dusty': return '🏜️';
      default: return '🏢';
    }
  };

  return (
    <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <CardTitle className="text-2xl text-gray-900 flex items-center">
          <FlaskConicalIcon className="h-6 w-6 mr-3 text-blue-600" />
          Operating Conditions
          <span className="ml-3 text-sm font-normal text-gray-500">
            Configure test parameters
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Environmental Parameters */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <ThermometerIcon className="h-5 w-5 mr-2 text-blue-500" />
            Environmental Parameters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="temperature" className="text-sm font-medium text-gray-700 flex items-center">
                <ThermometerIcon className="h-4 w-4 mr-2 text-red-500" />
                Temperature (°C)
              </Label>
              <Input
                id="temperature"
                type="number"
                value={operatingConditions.temperature}
                onChange={(e) => handleInputChange('temperature', Number(e.target.value))}
                min={-40}
                max={200}
                className="w-full text-lg font-medium"
                placeholder="80"
              />
              <p className="text-xs text-gray-500">Range: -40°C to 200°C</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pressure" className="text-sm font-medium text-gray-700 flex items-center">
                <GaugeIcon className="h-4 w-4 mr-2 text-blue-500" />
                Pressure (MPa)
              </Label>
              <Input
                id="pressure"
                type="number"
                step="0.1"
                value={operatingConditions.pressure}
                onChange={(e) => handleInputChange('pressure', Number(e.target.value))}
                min={0}
                max={50}
                className="w-full text-lg font-medium"
                placeholder="1.0"
              />
              <p className="text-xs text-gray-500">Range: 0 to 50 MPa</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment" className="text-sm font-medium text-gray-700 flex items-center">
                <CloudIcon className="h-4 w-4 mr-2 text-green-500" />
                Environment
              </Label>
              <Select 
                value={operatingConditions.environment} 
                onValueChange={(value) => handleInputChange('environment', value)}
              >
                <SelectTrigger className="w-full text-lg">
                  <SelectValue placeholder="Select environment">
                    <span className="flex items-center">
                      {getEnvironmentIcon(operatingConditions.environment)} 
                      <span className="ml-2 capitalize">{operatingConditions.environment}</span>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="indoor" className="flex items-center">
                    🏢 Indoor Environment
                  </SelectItem>
                  <SelectItem value="outdoor" className="flex items-center">
                    🌲 Outdoor Environment
                  </SelectItem>
                  <SelectItem value="marine" className="flex items-center">
                    🌊 Marine Environment
                  </SelectItem>
                  <SelectItem value="dusty" className="flex items-center">
                    🏜️ Dusty Environment
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Load & Operating Parameters */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <WeightIcon className="h-5 w-5 mr-2 text-orange-500" />
            Load & Operating Parameters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="loadCondition" className="text-sm font-medium text-gray-700 flex items-center">
                <WeightIcon className="h-4 w-4 mr-2 text-orange-500" />
                Load Condition
              </Label>
              <Select 
                value={operatingConditions.loadCondition} 
                onValueChange={(value) => handleInputChange('loadCondition', value)}
              >
                <SelectTrigger className={`w-full text-lg border-2 ${getLoadConditionColor(operatingConditions.loadCondition)}`}>
                  <SelectValue placeholder="Select load condition">
                    <span className="capitalize font-medium">{operatingConditions.loadCondition} Load</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="light" className="text-green-700 hover:bg-green-50">
                    Light Load - Minimal stress
                  </SelectItem>
                  <SelectItem value="medium" className="text-yellow-700 hover:bg-yellow-50">
                    Medium Load - Standard operation
                  </SelectItem>
                  <SelectItem value="heavy" className="text-orange-700 hover:bg-orange-50">
                    Heavy Load - High stress
                  </SelectItem>
                  <SelectItem value="extreme" className="text-red-700 hover:bg-red-50">
                    Extreme Load - Maximum stress
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="operatingHours" className="text-sm font-medium text-gray-700 flex items-center">
                <ClockIcon className="h-4 w-4 mr-2 text-purple-500" />
                Operating Hours
              </Label>
              <Input
                id="operatingHours"
                type="number"
                value={operatingConditions.operatingHours}
                onChange={(e) => handleInputChange('operatingHours', Number(e.target.value))}
                min={0}
                max={10000}
                className="w-full text-lg font-medium"
                placeholder="1000"
              />
              <p className="text-xs text-gray-500">Total operating time (0-10,000 hours)</p>
            </div>
          </div>
        </div>

        {/* Test Summary */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Test Configuration Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Temp:</span>
              <span className="ml-1 font-medium">{operatingConditions.temperature}°C</span>
            </div>
            <div>
              <span className="text-gray-500">Pressure:</span>
              <span className="ml-1 font-medium">{operatingConditions.pressure} MPa</span>
            </div>
            <div>
              <span className="text-gray-500">Load:</span>
              <span className={`ml-1 font-medium capitalize ${getLoadConditionColor(operatingConditions.loadCondition).split(' ')[0]}`}>
                {operatingConditions.loadCondition}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Hours:</span>
              <span className="ml-1 font-medium">{operatingConditions.operatingHours}h</span>
            </div>
            <div>
              <span className="text-gray-500">Env:</span>
              <span className="ml-1 font-medium capitalize">{operatingConditions.environment}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t">
          <Button 
            onClick={onPredict}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2Icon className="mr-3 h-6 w-6 animate-spin" />
                Running AI Analysis...
                <span className="ml-2 text-sm opacity-75">(Processing data)</span>
              </>
            ) : (
              <>
                <FlaskConicalIcon className="mr-3 h-6 w-6" />
                Run Performance Test
                <span className="ml-2 text-sm opacity-90">→ Get AI Predictions</span>
              </>
            )}
          </Button>
          {!isLoading && (
            <p className="text-center text-xs text-gray-500 mt-2">
              Click to analyze oil performance with current parameters
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OperatingConditionsForm;
