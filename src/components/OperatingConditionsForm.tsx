
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OperatingConditions } from '../data/oilData';
import { Loader2Icon, FlaskConicalIcon } from 'lucide-react';

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900 flex items-center">
          <FlaskConicalIcon className="h-6 w-6 mr-2 text-blue-600" />
          Operating Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="temperature" className="text-sm font-medium text-gray-700">
              Temperature (°C)
            </Label>
            <Input
              id="temperature"
              type="number"
              value={operatingConditions.temperature}
              onChange={(e) => handleInputChange('temperature', Number(e.target.value))}
              min={-40}
              max={200}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pressure" className="text-sm font-medium text-gray-700">
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
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loadCondition" className="text-sm font-medium text-gray-700">
              Load Condition
            </Label>
            <Select 
              value={operatingConditions.loadCondition} 
              onValueChange={(value) => handleInputChange('loadCondition', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select load condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light Load</SelectItem>
                <SelectItem value="medium">Medium Load</SelectItem>
                <SelectItem value="heavy">Heavy Load</SelectItem>
                <SelectItem value="extreme">Extreme Load</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="operatingHours" className="text-sm font-medium text-gray-700">
              Operating Hours
            </Label>
            <Input
              id="operatingHours"
              type="number"
              value={operatingConditions.operatingHours}
              onChange={(e) => handleInputChange('operatingHours', Number(e.target.value))}
              min={0}
              max={10000}
              className="w-full"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="environment" className="text-sm font-medium text-gray-700">
              Environment
            </Label>
            <Select 
              value={operatingConditions.environment} 
              onValueChange={(value) => handleInputChange('environment', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indoor">Indoor</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="marine">Marine</SelectItem>
                <SelectItem value="dusty">Dusty Environment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-6 border-t">
          <Button 
            onClick={onPredict}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                Running AI Analysis...
              </>
            ) : (
              'Run Performance Test'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OperatingConditionsForm;
