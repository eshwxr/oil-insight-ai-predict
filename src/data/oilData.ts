// src/data/oilData.ts

export type OilType = 'engine' | 'hydraulic' | 'compressed' | 'transmission';

export interface OilProperties {
  viscosity40C: number;
  viscosity100C: number;
  viscosityIndex: number;
  density: number;
  baseOilType: string;
  flashPoint: number;
  pourPoint: number;
  shearStabilityIndex: number;
  zddp: number;
  moDTC: number;
  calciumSulfonate: number;
  magnesiumSulfonate: number;
  phenolicAO: number;
  amineAO: number;
  dispersant: number;
  boronEster: number;
  phosphite: number;
  sulfurizedOlefin: number;
  fmOleamide: number;
  fmGlycerol: number;
  tcp: number;
  polymerVM: number;
  pourPointDepressant: number;
}

export interface OperatingConditions {
  temperature: number;
  loadCondition: 'light' | 'medium' | 'heavy' | 'extreme';
  duration: number;
  speedRPM: number;
  speedMetersPerSecond: number;
}

export interface TestInput {
  oilType: OilType;
  properties: OilProperties;
  operatingConditions: OperatingConditions;
}

export interface PredictionResult {
  oilType: OilType;
  srvCOF?: number;
  fourBallWear?: number;
  filmThickness?: number;
  frictionTorqueNm?: number;
  wear: number;
  friction: number;
  thermalDegradation: number;
  oxidationLevel: number;
  viscosityStability: number;
  thermalStability: number;
  oxidationResistance: number;
  timestamp: string;
  testId: string;
}

export interface TestHistory extends PredictionResult {
  id: string;
  input: TestInput;
  createdAt: string;
}

const createDefaultOilProps = (): OilProperties => ({
  viscosity40C: 0,
  viscosity100C: 0,
  viscosityIndex: 0,
  density: 0,
  baseOilType: "N/A",
  flashPoint: 0,
  pourPoint: 0,
  shearStabilityIndex: 0,
  zddp: 0,
  moDTC: 0,
  calciumSulfonate: 0,
  magnesiumSulfonate: 0,
  phenolicAO: 0,
  amineAO: 0,
  dispersant: 0,
  boronEster: 0,
  phosphite: 0,
  sulfurizedOlefin: 0,
  fmOleamide: 0,
  fmGlycerol: 0,
  tcp: 0,
  polymerVM: 0,
  pourPointDepressant: 0,
});

export const defaultOilData: Record<OilType, OilProperties> = {
  engine: {
    viscosity40C: 46.23,
    viscosity100C: 4.33,
    viscosityIndex: 150,
    density: 0.89,
    baseOilType: "Group IV",
    flashPoint: 184,
    pourPoint: -18,
    shearStabilityIndex: 18.47,
    zddp: 0,
    moDTC: 0,
    calciumSulfonate: 0.65,
    magnesiumSulfonate: 0.62,
    phenolicAO: 0.02,
    amineAO: 0.01,
    dispersant: 0.86,
    boronEster: 0.02,
    phosphite: 1.53,
    sulfurizedOlefin: 0,
    fmOleamide: 0,
    fmGlycerol: 0,
    tcp: 0.01,
    polymerVM: 0,
    pourPointDepressant: 0
  },
  hydraulic: {
    ...createDefaultOilProps(),
    viscosity40C: 46,
    viscosity100C: 6.8,
    density: 0.87,
    flashPoint: 220,
    pourPoint: -30,
    baseOilType: "Group II",
  },
  compressed: {
    ...createDefaultOilProps(),
    viscosity40C: 68,
    viscosity100C: 8.5,
    density: 0.88,
    flashPoint: 230,
    pourPoint: -25,
    baseOilType: "Group III",
  },
  transmission: {
    ...createDefaultOilProps(),
    viscosity40C: 100,
    viscosity100C: 11.0,
    density: 0.89,
    flashPoint: 200,
    pourPoint: -35,
    baseOilType: "Group IV",
  },
};

export const defaultOperatingConditions: OperatingConditions = {
  temperature: 80,
  loadCondition: 'medium',
  duration: 60,
  speedRPM: 1500,
  speedMetersPerSecond: 1.57,
};

export const oilTypeLabels: Record<OilType, string> = {
  engine: "Engine Oil",
  hydraulic: "Hydraulic Oil",
  compressed: "Compressor Oil",
  transmission: "Transmission Oil",
};
