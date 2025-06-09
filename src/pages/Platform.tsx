
import React, { useState } from 'react';
import OilSelector from '../components/OilSelector';
import PropertyInputForm from '../components/PropertyInputForm';
import OperatingConditionsForm from '../components/OperatingConditionsForm';
import PredictionResults from '../components/PredictionResults';
import TestHistory from '../components/TestHistory';
import { 
  defaultOilData, 
  defaultOperatingConditions,
  OilType, 
  OilProperties, 
  OperatingConditions,
  TestInput,
  PredictionResult,
  TestHistory as TestHistoryType
} from '../data/oilData';

const Platform = () => {
  const [selectedOil, setSelectedOil] = useState<OilType>('engine');
  const [oilProperties, setOilProperties] = useState<OilProperties>(defaultOilData.engine);
  const [operatingConditions, setOperatingConditions] = useState<OperatingConditions>(defaultOperatingConditions);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testHistory, setTestHistory] = useState<TestHistoryType[]>([]);

  const handleOilChange = (oilType: OilType) => {
    setSelectedOil(oilType);
    setOilProperties(defaultOilData[oilType]);
    setPredictionResult(null);
  };

  const handlePropertiesChange = (properties: OilProperties) => {
    setOilProperties(properties);
  };

  const handleOperatingConditionsChange = (conditions: OperatingConditions) => {
    setOperatingConditions(conditions);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const testInput: TestInput = {
      oilType: selectedOil,
      properties: oilProperties,
      operatingConditions
    };
    
    // Mock prediction - replace with actual backend API call
    const prediction = await predictOilPerformance(testInput);
    setPredictionResult(prediction);
    
    // Add to history
    const historyEntry: TestHistoryType = {
      id: Date.now().toString(),
      input: testInput,
      result: prediction,
      createdAt: new Date().toISOString()
    };
    setTestHistory(prev => [historyEntry, ...prev]);
    
    setIsLoading(false);
  };

  const predictOilPerformance = async (input: TestInput): Promise<PredictionResult> => {
    // Mock ML prediction logic - replace with actual backend API call
    const baseValues = {
      engine: { wear: 0.08, friction: 0.12, thermalDegradation: 15, oxidationLevel: 12 },
      hydraulic: { wear: 0.06, friction: 0.10, thermalDegradation: 18, oxidationLevel: 14 },
      compressed: { wear: 0.05, friction: 0.08, thermalDegradation: 20, oxidationLevel: 16 },
      transmission: { wear: 0.07, friction: 0.09, thermalDegradation: 12, oxidationLevel: 10 }
    };

    const base = baseValues[input.oilType];
    const variation = () => (Math.random() - 0.5) * 0.2;
    
    // Adjust based on operating conditions
    const tempFactor = (input.operatingConditions.temperature - 80) / 100;
    const loadFactor = {
      light: 0.8,
      medium: 1.0,
      heavy: 1.3,
      extreme: 1.6
    }[input.operatingConditions.loadCondition];

    const result: PredictionResult = {
      oilType: input.oilType,
      wear: Math.max(0.01, Number((base.wear * loadFactor + tempFactor * 0.02 + variation() * 0.01).toFixed(3))),
      friction: Math.max(0.01, Number((base.friction * loadFactor + tempFactor * 0.01 + variation() * 0.01).toFixed(3))),
      thermalDegradation: Math.max(5, Number((base.thermalDegradation * (1 + tempFactor * 0.5) + variation() * 2).toFixed(1))),
      oxidationLevel: Math.max(5, Number((base.oxidationLevel * (1 + tempFactor * 0.3) + variation() * 2).toFixed(1))),
      // Additional properties for charts
      srvCOF: Math.max(0.01, Number((base.friction * loadFactor + variation() * 0.005).toFixed(3))),
      fourBallWear: Math.max(0.1, Number((base.wear * 5 + variation() * 0.1).toFixed(2))),
      filmThickness: Math.max(10, Number((50 - base.wear * 200 + variation() * 5).toFixed(1))),
      viscosityStability: Math.max(70, Number((95 - tempFactor * 10 + variation() * 5).toFixed(1))),
      thermalStability: Math.max(70, Number((90 - tempFactor * 15 + variation() * 5).toFixed(1))),
      oxidationResistance: Math.max(60, Number((85 - tempFactor * 12 + variation() * 5).toFixed(1))),
      timestamp: new Date().toISOString(),
      testId: `TEST_${Date.now()}`
    };

    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Oil Performance Testing Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your oil formulations across 4 different oil types with AI-powered performance predictions
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="xl:col-span-2 space-y-6">
            <OilSelector 
              selectedOil={selectedOil} 
              onOilChange={handleOilChange} 
            />
            <PropertyInputForm
              oilType={selectedOil}
              oilProperties={oilProperties}
              onPropertiesChange={handlePropertiesChange}
            />
            <OperatingConditionsForm
              operatingConditions={operatingConditions}
              onConditionsChange={handleOperatingConditionsChange}
              onPredict={handlePredict}
              isLoading={isLoading}
            />
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            <PredictionResults 
              result={predictionResult}
              isLoading={isLoading}
            />
            {testHistory.length > 0 && (
              <TestHistory history={testHistory} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
