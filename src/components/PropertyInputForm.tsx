import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { OilProperties, OilType } from '../data/oilData';
import { BeakerIcon } from 'lucide-react';

interface PropertyInputFormProps {
  oilType: OilType;
  oilProperties: OilProperties;
  onPropertiesChange: (newProperties: OilProperties) => void;
}

const PropertyInputForm: React.FC<PropertyInputFormProps> = ({ oilType, oilProperties, onPropertiesChange }) => {
  const handleDomInputChange = (field: keyof OilProperties, value: string) => {
    const numValue = parseFloat(value);
    onPropertiesChange({
      ...oilProperties,
      [field]: isNaN(numValue) ? (oilProperties[field] || 0) : numValue,
    });
  };

  const handleChange = (field: keyof OilProperties, value: string | number | boolean) => {
    onPropertiesChange({
      ...oilProperties,
      [field]: value,
    });
  };

  if (oilType !== 'engine') {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700 flex items-center">
            <BeakerIcon className="h-5 w-5 mr-2 text-blue-500" />
            Property Inputs for {oilType.charAt(0).toUpperCase() + oilType.slice(1)} Oil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Detailed property input form for '{oilType}' is focused on Engine Oil specs for now.
            Please select 'Engine Oil' for comprehensive inputs. Default values will be used for this oil type.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
       <CardTitle className="text-xl text-gray-800 flex items-center">
           <BeakerIcon className="h-6 w-6 mr-2 text-blue-600" />
           Oil Properties - Engine Oil
       </CardTitle>
       <CardDescription>Specify the chemical and physical properties of the engine oil.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <details className="space-y-1 group" open>
          <summary className="text-md font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors group-open:pb-2">Base Properties</summary>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 pt-2">
            <div>
              <Label htmlFor="viscosity40C" className="text-sm font-medium text-gray-600">Viscosity @40°C (cSt)</Label>
              <Input id="viscosity40C" type="number" value={oilProperties.viscosity40C || ''} onChange={(e) => handleDomInputChange('viscosity40C', e.target.value)} step="0.01" className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="viscosity100C" className="text-sm font-medium text-gray-600">Viscosity @100°C (cSt)</Label>
              <Input id="viscosity100C" type="number" value={oilProperties.viscosity100C || ''} onChange={(e) => handleDomInputChange('viscosity100C', e.target.value)} step="0.01" className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="viscosityIndex" className="text-sm font-medium text-gray-600">Viscosity Index</Label>
              <Input id="viscosityIndex" type="number" value={oilProperties.viscosityIndex || ''} onChange={(e) => handleDomInputChange('viscosityIndex', e.target.value)} className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="density" className="text-sm font-medium text-gray-600">Density (g/cm³)</Label>
              <Input id="density" type="number" value={oilProperties.density || ''} onChange={(e) => handleDomInputChange('density', e.target.value)} step="0.001" className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="baseOilType" className="text-sm font-medium text-gray-600">Base Oil Group</Label>
              <Select value={oilProperties.baseOilType || "Group IV"} onValueChange={(value) => handleChange('baseOilType', value)}>
                <SelectTrigger id="baseOilType" className="mt-1"><SelectValue placeholder="Select Base Oil Group" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Group I">Group I</SelectItem>
                  <SelectItem value="Group II">Group II</SelectItem>
                  <SelectItem value="Group III">Group III</SelectItem>
                  <SelectItem value="Group IV">Group IV</SelectItem>
                  <SelectItem value="Group V">Group V</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="flashPoint" className="text-sm font-medium text-gray-600">Flash Point (°C)</Label>
              <Input id="flashPoint" type="number" value={oilProperties.flashPoint || ''} onChange={(e) => handleDomInputChange('flashPoint', e.target.value)} className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="pourPoint" className="text-sm font-medium text-gray-600">Pour Point (°C)</Label>
              <Input id="pourPoint" type="number" value={oilProperties.pourPoint || ''} onChange={(e) => handleDomInputChange('pourPoint', e.target.value)} className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="shearStabilityIndex" className="text-sm font-medium text-gray-600">Shear Stability Index</Label>
              <Input id="shearStabilityIndex" type="number" value={oilProperties.shearStabilityIndex || ''} onChange={(e) => handleDomInputChange('shearStabilityIndex', e.target.value)} step="0.01" className="mt-1"/>
            </div>
          </div>
        </details>

        <details className="space-y-1 group" open>
          <summary className="text-md font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors group-open:pb-2">Numeric Additives (%)</summary>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 pt-2">
            {[
              { key: 'calciumSulfonate', label: 'Calcium Sulfonate' },
              { key: 'magnesiumSulfonate', label: 'Magnesium Sulfonate' },
              { key: 'phenolicAO', label: 'Phenolic AO' },
              { key: 'amineAO', label: 'Amine AO' },
              { key: 'dispersant', label: 'Dispersant' },
              { key: 'boronEster', label: 'Boron Ester' },
              { key: 'phosphite', label: 'Phosphite' },
              { key: 'tcp', label: 'TCP' },
            ].map(additive => (
               <div key={additive.key}>
                 <Label htmlFor={additive.key} className="text-sm font-medium text-gray-600">{additive.label}</Label>
                 <Input
                   id={additive.key}
                   type="number"
                   value={oilProperties[additive.key as keyof OilProperties] || ''}
                   onChange={(e) => handleDomInputChange(additive.key as keyof OilProperties, e.target.value)}
                   step="0.001"
                   className="mt-1"
                   placeholder="e.g., 0.1"
                 />
               </div>
            ))}
          </div>
        </details>

        <details className="space-y-1 group" open>
          <summary className="text-md font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors group-open:pb-2">Binary Additives</summary>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 pt-2">
            {[
              { key: 'zddp', label: 'ZDDP' },
              { key: 'moDTC', label: 'MoDTC' },
              { key: 'sulfurizedOlefin', label: 'Sulfurized Olefin' },
              { key: 'fmOleamide', label: 'FM Oleamide' },
              { key: 'fmGlycerol', label: 'FM Glycerol' },
              { key: 'polymerVM', label: 'Polymer VM' },
              { key: 'pourPointDepressant', label: 'Pour Point Depressant' },
            ].map(additive => (
              <div key={additive.key} className="flex items-center space-x-3 pt-2 bg-gray-50 p-2 rounded-md">
                <Switch
                  id={additive.key}
                  checked={!!oilProperties[additive.key as keyof OilProperties]}
                  onCheckedChange={(checked) => handleChange(additive.key as keyof OilProperties, checked ? 1 : 0)}
                />
                <Label htmlFor={additive.key} className="text-sm font-medium text-gray-600 whitespace-nowrap">{additive.label} (0=No, 1=Yes)</Label>
              </div>
            ))}
          </div>
        </details>
      </CardContent>
    </Card>
  );
};

export default PropertyInputForm;