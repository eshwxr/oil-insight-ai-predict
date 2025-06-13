import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { OperatingConditions } from '../data/oilData';
import { Thermometer, Zap, Clock, Gauge, Wind } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface OperatingConditionsFormProps {
  operatingConditions: OperatingConditions;
  onConditionsChange: (newConditions: OperatingConditions) => void;
  onPredict: () => void;
  isLoading: boolean;
}

const OperatingConditionsForm: React.FC<OperatingConditionsFormProps> = ({ operatingConditions, onConditionsChange, onPredict, isLoading }) => {
  const handleInputChange = (field: keyof OperatingConditions, value: string) => {
    const numValue = parseFloat(value);
    const currentVal = operatingConditions[field];
    onConditionsChange({
      ...operatingConditions,
      [field]: isNaN(numValue) ? (typeof currentVal === 'number' ? currentVal : 0) : numValue,
    });
  };
  
  const handleSelectChange = (field: keyof OperatingConditions, value: string) => {
    onConditionsChange({
      ...operatingConditions,
      [field]: value,
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <Zap className="h-6 w-6 mr-2 text-orange-500" />
          Operating Conditions
        </CardTitle>
        <CardDescription>Configure test parameters for the simulation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
          <div>
            <Label htmlFor="temperature" className="text-sm font-medium text-gray-600 flex items-center">
              <Thermometer className="w-4 h-4 mr-2 text-red-500" /> Temperature (°C)
            </Label>
            <Input 
              id="temperature" 
              type="number" 
              value={operatingConditions.temperature || ''} 
              onChange={(e) => handleInputChange('temperature', e.target.value)} 
              className="mt-1"
              placeholder="e.g., 80"
            />
          </div>
          <div>
            <Label htmlFor="duration" className="text-sm font-medium text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-500" /> Duration (min)
            </Label>
            <Input 
              id="duration" 
              type="number" 
              value={operatingConditions.duration || ''} 
              onChange={(e) => handleInputChange('duration', e.target.value)} 
              className="mt-1"
              placeholder="e.g., 60"
            />
          </div>
          <div>
            <Label htmlFor="loadCondition" className="text-sm font-medium text-gray-600 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-500" /> Load Condition
            </Label>
            <Select value={operatingConditions.loadCondition} onValueChange={(value) => handleSelectChange('loadCondition', value)}>
              <SelectTrigger id="loadCondition" className="mt-1">
                <SelectValue placeholder="Select Load Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="heavy">Heavy</SelectItem>
                <SelectItem value="extreme">Extreme</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="speedRPM" className="text-sm font-medium text-gray-600 flex items-center">
              <Gauge className="w-4 h-4 mr-2 text-purple-500" /> Speed (rpm)
            </Label>
            <Input 
              id="speedRPM" 
              type="number" 
              value={operatingConditions.speedRPM || ''} 
              onChange={(e) => handleInputChange('speedRPM', e.target.value)} 
              className="mt-1"
              placeholder="e.g., 1500"
            />
          </div>
          <div>
            <Label htmlFor="speedMetersPerSecond" className="text-sm font-medium text-gray-600 flex items-center">
              <Wind className="w-4 h-4 mr-2 text-green-500" /> Speed (m/s)
            </Label>
            <Input 
              id="speedMetersPerSecond" 
              type="number" 
              value={operatingConditions.speedMetersPerSecond || ''} 
              onChange={(e) => handleInputChange('speedMetersPerSecond', e.target.value)} 
              step="0.01" 
              className="mt-1"
              placeholder="e.g., 1.57"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t mt-4">
          <h4 className="text-md font-medium text-gray-700 mb-2">Test Configuration Summary:</h4>
          <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
            <li>Temperature: {operatingConditions.temperature}°C</li>
            <li>Load: {operatingConditions.loadCondition}</li>
            <li>Duration: {operatingConditions.duration} min</li>
            <li>Speed RPM: {operatingConditions.speedRPM} rpm</li>
            <li>Speed (m/s): {operatingConditions.speedMetersPerSecond} m/s</li>
          </ul>
        </div>
        </CardContent>
        <CardFooter>
            <Button 
                onClick={onPredict} 
                disabled={isLoading} 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 text-sm font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
            >
                {isLoading ? 'Running Predictions...' : 'Run Performance Test → Get AI Predictions'}
            </Button>
        </CardFooter>
    </Card>
  );
};

export default OperatingConditionsForm;