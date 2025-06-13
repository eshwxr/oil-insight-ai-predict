import React, { useState, useEffect } from 'react';
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
import { Card } from '@/components/ui/card'; // Added for placeholder

const Platform: React.FC = () => {
  const [selectedOil, setSelectedOil] = useState<OilType>('engine');
  const [oilProperties, setOilProperties] = useState<OilProperties>(defaultOilData.engine);
  const [operatingConditions, setOperatingConditions] = useState<OperatingConditions>(defaultOperatingConditions);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testHistory, setTestHistory] = useState<TestHistoryType[]>([]);

  useEffect(() => {
    setOilProperties(defaultOilData[selectedOil]);
    setPredictionResult(null);
  }, [selectedOil]);

  const handleOilChange = (oilType: OilType) => {
    setSelectedOil(oilType);
  };

  const handlePropertiesChange = (properties: OilProperties) => {
    setOilProperties(properties);
  };

  const handleOperatingConditionsChange = (conditions: OperatingConditions) => {
    setOperatingConditions(conditions);
  };

  const predictOilPerformance = async (input: TestInput): Promise<PredictionResult | null> => {
    const payload: Record<string, any> = {
      "Viscosity_40C_cSt": input.properties.viscosity40C,
      "Viscosity_100C_cSt": input.properties.viscosity100C,
      "Viscosity_Index": input.properties.viscosityIndex,
      "Density_g_per_cm3": input.properties.density,
      "Base_Oil": input.properties.baseOilType,
      "Flash_Point_C": input.properties.flashPoint,
      "Pour_Point_C": input.properties.pourPoint,
      "Shear_Stability_Index": input.properties.shearStabilityIndex,
      "ZDDP": Number(input.properties.zddp) || 0,
      "MoDTC": Number(input.properties.moDTC) || 0,
      "Calcium Sulfonate": input.properties.calciumSulfonate,
      "Magnesium Sulfonate": input.properties.magnesiumSulfonate,
      "Phenolic AO": input.properties.phenolicAO,
      "Amine AO": input.properties.amineAO,
      "Dispersant": input.properties.dispersant,
      "Boron Ester": input.properties.boronEster,
      "Phosphite": input.properties.phosphite,
      "Sulfurized Olefin": Number(input.properties.sulfurizedOlefin) || 0,
      "FM Oleamide": Number(input.properties.fmOleamide) || 0,
      "FM Glycerol": Number(input.properties.fmGlycerol) || 0,
      "TCP": input.properties.tcp,
      "Polymer VM": Number(input.properties.polymerVM) || 0,
      "Pour Point Depressant": Number(input.properties.pourPointDepressant) || 0,
      "Load,N": { light: 100, medium: 200, heavy: 300, extreme: 400 }[input.operatingConditions.loadCondition] || 200,
      "Speed, rpm": input.operatingConditions.speedRPM,
      "Temperatue,C": input.operatingConditions.temperature,
      "Time, min": input.operatingConditions.duration,
      "Time,min": input.operatingConditions.duration,
      "Speed_m_per_s": input.operatingConditions.speedMetersPerSecond,
    };

    console.log("Payload to backend:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error from backend:", response.status, errorBody);
        alert(`Error from backend: ${response.status} - ${errorBody}`);
        return null;
      }

      const backendResult = await response.json();
      console.log("Raw response from backend:", backendResult);

      const baseValues = defaultOilData[input.oilType] || defaultOilData.engine;
      const variation = () => (Math.random() - 0.5) * 0.05;
      const tempFactor = (input.operatingConditions.temperature - 80) / 100;
      const loadN = payload["Load,N"];
      const loadFactor = loadN / 200;

      const result: PredictionResult = {
        oilType: input.oilType,
        srvCOF: backendResult.SRV_COF !== undefined ? Number(backendResult.SRV_COF.toFixed(3)) : undefined,
        fourBallWear: backendResult.FourBall_WSD_mm !== undefined ? Number(backendResult.FourBall_WSD_mm.toFixed(3)) : undefined,
        filmThickness: backendResult.EHD_Film_Thickness_nm !== undefined ? Number(backendResult.EHD_Film_Thickness_nm.toFixed(1)) : undefined,
        frictionTorqueNm: backendResult.Friction_Torque_Nm !== undefined ? Number(backendResult.Friction_Torque_Nm.toFixed(4)) : undefined,
        wear: Number(( (baseValues.zddp > 0 ? 0.05 : 0.1) * loadFactor + tempFactor * 0.01 + variation()).toFixed(3)),
        friction: Number(((backendResult.SRV_COF || 0.1) * (1 + tempFactor * 0.1) + variation()).toFixed(3)),
        thermalDegradation: Number(( (input.properties.baseOilType.includes("IV") || input.properties.baseOilType.includes("V") ? 10 : 20) + tempFactor * 5 + variation()*2).toFixed(1)),
        oxidationLevel: Number(( (input.properties.phenolicAO > 0 || input.properties.amineAO > 0 ? 8 : 15) + tempFactor * 3 + variation()*2).toFixed(1)),
        viscosityStability: Math.max(70, Number(( (input.properties.viscosityIndex > 120 ? 95 : 85) - tempFactor * 10 + (input.properties.shearStabilityIndex/10) + variation() * 5).toFixed(1))),
        thermalStability: Math.max(70, Number(((input.properties.flashPoint > 200 ? 90 : 80) - tempFactor * 15 + variation() * 5).toFixed(1))),
        oxidationResistance: Math.max(60, Number(( (input.properties.phenolicAO > 0 || input.properties.amineAO > 0 ? 90 : 75) - tempFactor * 12 + variation() * 5).toFixed(1))),
        timestamp: new Date().toISOString(),
        testId: `TEST_${Date.now()}`
      };
      return result;

    } catch (error) {
      console.error("Network error or JSON parsing error:", error);
      alert(`Network error or JSON parsing error: ${error}`);
      return null;
    }
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setPredictionResult(null);

    const testInput: TestInput = {
      oilType: selectedOil,
      properties: oilProperties,
      operatingConditions
    };

    try {
      const prediction = await predictOilPerformance(testInput);

      if (prediction) {
        setPredictionResult(prediction);
        const historyEntry: TestHistoryType = {
          id: prediction.testId,
          input: JSON.parse(JSON.stringify(testInput)),
          result: prediction,
          createdAt: prediction.timestamp,
          oilType: prediction.oilType,
          wear: prediction.wear,
          friction: prediction.friction,
          thermalDegradation: prediction.thermalDegradation,
          oxidationLevel: prediction.oxidationLevel,
          srvCOF: prediction.srvCOF,
          fourBallWear: prediction.fourBallWear,
          filmThickness: prediction.filmThickness,
          frictionTorqueNm: prediction.frictionTorqueNm,
          viscosityStability: prediction.viscosityStability,
          thermalStability: prediction.thermalStability,
          oxidationResistance: prediction.oxidationResistance,
          timestamp: prediction.timestamp,
          testId: prediction.testId,
        };
        setTestHistory(prev => [historyEntry, ...prev.slice(0, 4)]);
      } else {
        console.log("Prediction returned null in handlePredict.");
      }
    } catch (error) {
      console.error("Error in handlePredict:", error);
      alert(`Error processing prediction: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Oil Performance Testing Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select oil type, input properties and operating conditions to get AI-powered performance predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <OilSelector
              selectedOil={selectedOil}
              onOilChange={handleOilChange}
            />
            {selectedOil === 'engine' ? (
               <PropertyInputForm
                   oilType={selectedOil}
                   oilProperties={oilProperties}
                   onPropertiesChange={handlePropertiesChange}
               />
            ) : (
               <Card className="mt-4 p-4">
                 <p className="text-sm text-gray-600">
                   Detailed property inputs are specifically configured for 'Engine Oil'.
                   For '{selectedOil.charAt(0).toUpperCase() + selectedOil.slice(1)} Oil', predictions will use its current default property values.
                 </p>
               </Card>
            )}
            <OperatingConditionsForm
              operatingConditions={operatingConditions}
              onConditionsChange={handleOperatingConditionsChange}
              onPredict={handlePredict}
              isLoading={isLoading}
            />
          </div>

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