
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OilType, oilTypeLabels } from '../data/oilData';
import { SettingsIcon, CogIcon, DropletIcon, ZapIcon } from 'lucide-react';

interface OilSelectorProps {
  selectedOil: OilType;
  onOilChange: (oilType: OilType) => void;
}

const OilSelector: React.FC<OilSelectorProps> = ({ selectedOil, onOilChange }) => {
  const oilTypes: Array<{ type: OilType; icon: React.ReactNode; color: string }> = [
    { type: 'oil1', icon: <SettingsIcon className="h-6 w-6" />, color: 'blue' },
    { type: 'oil2', icon: <CogIcon className="h-6 w-6" />, color: 'green' },
    { type: 'oil3', icon: <DropletIcon className="h-6 w-6" />, color: 'purple' },
    { type: 'oil4', icon: <ZapIcon className="h-6 w-6" />, color: 'orange' }
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
          Select Oil Type
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {oilTypes.map(({ type, icon, color }) => (
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
              <span className="font-medium text-sm text-center">
                {oilTypeLabels[type]}
              </span>
            </Button>
          ))}
        </div>
        {selectedOil && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Selected:</strong> {oilTypeLabels[selectedOil]}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OilSelector;
