
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OilProperties } from '../data/oilData';
import { Loader2Icon } from 'lucide-react';

interface PropertyInputFormProps {
  oilProperties: OilProperties;
  onPropertiesChange: (properties: OilProperties) => void;
  onPredict: () => void;
  isLoading: boolean;
}

const PropertyInputForm: React.FC<PropertyInputFormProps> = ({
  oilProperties,
  onPropertiesChange,
  onPredict,
  isLoading
}) => {
  const handleInputChange = (field: keyof OilProperties, value: string | number) => {
    onPropertiesChange({
      ...oilProperties,
      [field]: value
    });
  };

  const inputFields = [
    { key: 'name', label: 'Oil Name', type: 'text', unit: '' },
    { key: 'isoVG', label: 'ISO VG', type: 'number', unit: '' },
    { key: 'viscosity40', label: 'Viscosity @40°C', type: 'number', unit: 'cSt' },
    { key: 'viscosity100', label: 'Viscosity @100°C', type: 'number', unit: 'cSt' },
    { key: 'viscosityIndex', label: 'Viscosity Index', type: 'number', unit: '' },
    { key: 'density', label: 'Density', type: 'number', unit: 'kg/m³' },
    { key: 'pourPoint', label: 'Pour Point', type: 'number', unit: '°C' },
    { key: 'flashPoint', label: 'Flash Point', type: 'number', unit: '°C' },
    { key: 'zddp', label: 'ZDDP', type: 'number', unit: '%', max: 100 },
    { key: 'phenolicAO', label: 'Phenolic AO', type: 'number', unit: '%', max: 100 },
    { key: 'amineAO', label: 'Amine AO', type: 'number', unit: '%', max: 100 },
    { key: 'rustInhibitor', label: 'Rust Inhibitor', type: 'number', unit: '%', max: 100 },
    { key: 'demulsifier', label: 'Demulsifier', type: 'number', unit: '%', max: 100 },
    { key: 'antifoam', label: 'Antifoam Agent', type: 'number', unit: '%', max: 100 },
    { key: 'frictionModifier', label: 'Friction Modifier', type: 'number', unit: '%', max: 100 },
    { key: 'viImprover', label: 'VI Improver', type: 'number', unit: '%', max: 100 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900">Oil Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="text-sm font-medium text-gray-700">
                {field.label} {field.unit && `(${field.unit})`}
              </Label>
              <Input
                id={field.key}
                type={field.type}
                value={oilProperties[field.key as keyof OilProperties]}
                onChange={(e) => handleInputChange(
                  field.key as keyof OilProperties, 
                  field.type === 'number' ? Number(e.target.value) : e.target.value
                )}
                min={field.type === 'number' ? 0 : undefined}
                max={field.max}
                step={field.type === 'number' ? 'any' : undefined}
                className="w-full"
              />
            </div>
          ))}
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
                Predicting Performance...
              </>
            ) : (
              'Predict Performance'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyInputForm;
