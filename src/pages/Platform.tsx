
import React, { useState } from 'react';
import OilSelector from '../components/OilSelector';
import PropertyInputForm from '../components/PropertyInputForm';
import PredictionResults from '../components/PredictionResults';
import { defaultOilData, OilType, OilProperties, PredictionResult } from '../data/oilData';

const Platform = () => {
  const [selectedOil, setSelectedOil] = useState<OilType>('oil1');
  const [oilProperties, setOilProperties] = useState<OilProperties>(defaultOilData.oil1);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOilChange = (oilType: OilType) => {
    setSelectedOil(oilType);
    setOilProperties(defaultOilData[oilType]);
    setPredictionResult(null);
  };

  const handlePropertiesChange = (properties: OilProperties) => {
    setOilProperties(properties);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction - replace with actual ML model
    const prediction = predictOilPerformance(selectedOil, oilProperties);
    setPredictionResult(prediction);
    setIsLoading(false);
  };

  const predictOilPerformance = (oilType: OilType, properties: OilProperties): PredictionResult => {
    // Mock ML prediction logic
    const baseValues = {
      oil1: { srvCOF: 0.08, fourBallWear: 0.4, filmThickness: 30, viscosityStability: 95 },
      oil2: { srvCOF: 0.09, fourBallWear: 0.5, filmThickness: 25, thermalStability: 92 },
      oil3: { srvCOF: 0.07, fourBallWear: 0.3, filmThickness: 35, oxidationResistance: 88 },
      oil4: { srvCOF: 0.085, fourBallWear: 0.45, filmThickness: 28 }
    };

    const base = baseValues[oilType];
    const variation = () => (Math.random() - 0.5) * 0.1;

    return {
      oilType,
      srvCOF: Number((base.srvCOF + variation()).toFixed(3)),
      fourBallWear: Number((base.fourBallWear + variation()).toFixed(2)),
      filmThickness: Number((base.filmThickness + variation() * 5).toFixed(1)),
      ...(oilType === 'oil1' && { viscosityStability: Number((base.viscosityStability! + variation() * 3).toFixed(1)) }),
      ...(oilType === 'oil2' && { thermalStability: Number((base.thermalStability! + variation() * 3).toFixed(1)) }),
      ...(oilType === 'oil3' && { oxidationResistance: Number((base.oxidationResistance! + variation() * 3).toFixed(1)) }),
      timestamp: new Date().toISOString()
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Oil Performance Prediction Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your oil type, input properties, and get instant AI-powered performance predictions
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <OilSelector 
              selectedOil={selectedOil} 
              onOilChange={handleOilChange} 
            />
            <PropertyInputForm
              oilProperties={oilProperties}
              onPropertiesChange={handlePropertiesChange}
              onPredict={handlePredict}
              isLoading={isLoading}
            />
          </div>

          {/* Output Panel */}
          <div>
            <PredictionResults 
              result={predictionResult}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
