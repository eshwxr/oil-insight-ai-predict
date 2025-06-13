
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OilType, oilTypeLabels } from '/Users/eshwarbhadhavath/try/oil-insight-ai-predict/src/data/oilData.ts';
import { CarIcon, CogIcon, WindIcon, SettingsIcon } from 'lucide-react';

interface OilSelectorProps {
  selectedOil: OilType;
  onOilChange: (oilType: OilType) => void;
}

const OilSelector: React.FC<OilSelectorProps> = ({ selectedOil, onOilChange }) => {
  const oilTypes: Array<{ type: OilType; icon: React.ReactNode; color: string; description: string }> = [
    { 
      type: 'engine', 
      icon: <CarIcon className="h-6 w-6" />, 
      color: 'blue',
      description: 'Automotive engine lubrication'
    },
    { 
      type: 'hydraulic', 
      icon: <CogIcon className="h-6 w-6" />, 
      color: 'green',
      description: 'Hydraulic system fluid'
    },
    { 
      type: 'compressed', 
      icon: <WindIcon className="h-6 w-6" />, 
      color: 'purple',
      description: 'Air compressor lubrication'
    },
    { 
      type: 'transmission', 
      icon: <SettingsIcon className="h-6 w-6" />, 
      color: 'orange',
      description: 'Transmission fluid'
    }
  ];

  const getButtonClass = (oilType: OilType, color: string) => {
    const isSelected = selectedOil === oilType;
    const baseClass = "h-full flex flex-col items-center justify-center p-4 text-left transition-all duration-200 border-2";
    
    if (isSelected) {
      return `${baseClass} border-${color}-500 bg-${color}-50 text-${color}-700 shadow-md transform scale-105`;
    }
    
    return `${baseClass} border-gray-200 hover:border-${color}-300 hover:bg-${color}-25 bg-white`;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Select Oil Type for Testing
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {oilTypes.map(({ type, icon, color, description }) => (
            <Button
              key={type}
              variant="ghost"
              onClick={() => onOilChange(type)}
              className={getButtonClass(type, color)}
            >
              <div className={`p-3 rounded-full mb-3 ${
                selectedOil === type 
                  ? `bg-${color}-100 text-${color}-600` 
                  : `bg-gray-100 text-gray-500`
              }`}>
                {icon}
              </div>
              <span className="font-medium text-sm text-center mb-1">
                {oilTypeLabels[type]}
              </span>
              <span className="text-xs text-center text-gray-500">
                {description}
              </span>
            </Button>
          ))}
        </div>
        {selectedOil && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Selected:</strong> {oilTypeLabels[selectedOil]} - Ready for property input and testing
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OilSelector;
