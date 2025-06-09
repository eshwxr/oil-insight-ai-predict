
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OilProperties, OilType, propertyLabels } from '../data/oilData';
import { BeakerIcon } from 'lucide-react';

interface PropertyInputFormProps {
  oilType: OilType;
  oilProperties: OilProperties;
  onPropertiesChange: (properties: OilProperties) => void;
}

const PropertyInputForm: React.FC<PropertyInputFormProps> = ({
  oilType,
  oilProperties,
  onPropertiesChange
}) => {
  const handleInputChange = (field: keyof OilProperties, value: string | number) => {
    onPropertiesChange({
      ...oilProperties,
      [field]: value
    });
  };

  const getPropertiesForOilType = (type: OilType) => {
    const baseProperties = ['name', 'viscosity40', 'viscosity100', 'viscosityIndex', 'density', 'pourPoint', 'flashPoint'];
    
    const specificProperties = {
      engine: ['zddp', 'phenolicAO', 'amineAO', 'detergent', 'dispersant', 'frictionModifier', 'viImprover', 'baseTBN'],
      hydraulic: ['antifoam', 'demulsifier', 'rustInhibitor', 'wearProtection', 'thermalStability'],
      compressed: ['carbonResidue', 'sulfurContent', 'waterContent', 'acidNumber', 'oxidationStability'],
      transmission: ['frictionCoefficient', 'shearStability', 'sealCompatibility', 'foamTendency', 'copperCorrosion']
    };

    return [...baseProperties, ...specificProperties[type]];
  };

  const properties = getPropertiesForOilType(oilType);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900 flex items-center">
          <BeakerIcon className="h-6 w-6 mr-2 text-blue-600" />
          Oil Properties - {oilType.charAt(0).toUpperCase() + oilType.slice(1)} Oil
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map((property) => {
            const config = propertyLabels[property as keyof typeof propertyLabels];
            if (!config) return null;

            return (
              <div key={property} className="space-y-2">
                <Label htmlFor={property} className="text-sm font-medium text-gray-700">
                  {config.label} {config.unit && `(${config.unit})`}
                </Label>
                <Input
                  id={property}
                  type={config.type}
                  value={oilProperties[property as keyof OilProperties] || ''}
                  onChange={(e) => handleInputChange(
                    property as keyof OilProperties, 
                    config.type === 'number' ? Number(e.target.value) : e.target.value
                  )}
                  min={config.type === 'number' ? 0 : undefined}
                  max={config.max}
                  step={config.type === 'number' ? 'any' : undefined}
                  className="w-full"
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyInputForm;
