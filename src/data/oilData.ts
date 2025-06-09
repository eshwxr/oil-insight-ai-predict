
export type OilType = 'oil1' | 'oil2' | 'oil3' | 'oil4';

export interface OilProperties {
  name: string;
  isoVG: number;
  viscosity40: number;
  viscosity100: number;
  viscosityIndex: number;
  density: number;
  pourPoint: number;
  flashPoint: number;
  zddp: number;
  phenolicAO: number;
  amineAO: number;
  rustInhibitor: number;
  demulsifier: number;
  antifoam: number;
  frictionModifier: number;
  viImprover: number;
}

export interface PredictionResult {
  oilType: OilType;
  srvCOF: number;
  fourBallWear: number;
  filmThickness: number;
  viscosityStability?: number; // Oil 1 specific
  thermalStability?: number;   // Oil 2 specific
  oxidationResistance?: number; // Oil 3 specific
  timestamp: string;
}

export const defaultOilData: Record<OilType, OilProperties> = {
  oil1: {
    name: "Industrial Gear Oil",
    isoVG: 320,
    viscosity40: 320,
    viscosity100: 24.5,
    viscosityIndex: 95,
    density: 895,
    pourPoint: -15,
    flashPoint: 245,
    zddp: 1.2,
    phenolicAO: 0.8,
    amineAO: 0.3,
    rustInhibitor: 0.5,
    demulsifier: 0.02,
    antifoam: 0.01,
    frictionModifier: 0.5,
    viImprover: 2.5
  },
  oil2: {
    name: "Engine Oil SAE 5W-30",
    isoVG: 68,
    viscosity40: 68,
    viscosity100: 11.2,
    viscosityIndex: 160,
    density: 850,
    pourPoint: -35,
    flashPoint: 215,
    zddp: 0.8,
    phenolicAO: 0.5,
    amineAO: 0.2,
    rustInhibitor: 0.3,
    demulsifier: 0.01,
    antifoam: 0.005,
    frictionModifier: 1.0,
    viImprover: 8.5
  },
  oil3: {
    name: "Hydraulic Oil ISO 46",
    isoVG: 46,
    viscosity40: 46,
    viscosity100: 6.8,
    viscosityIndex: 105,
    density: 870,
    pourPoint: -25,
    flashPoint: 225,
    zddp: 0.05,
    phenolicAO: 0.3,
    amineAO: 0.1,
    rustInhibitor: 0.2,
    demulsifier: 0.005,
    antifoam: 0.002,
    frictionModifier: 0.1,
    viImprover: 1.0
  },
  oil4: {
    name: "Turbine Oil ISO 32",
    isoVG: 32,
    viscosity40: 32,
    viscosity100: 5.4,
    viscosityIndex: 100,
    density: 865,
    pourPoint: -20,
    flashPoint: 210,
    zddp: 0.02,
    phenolicAO: 0.4,
    amineAO: 0.05,
    rustInhibitor: 0.15,
    demulsifier: 0.003,
    antifoam: 0.001,
    frictionModifier: 0.05,
    viImprover: 0.5
  }
};

export const oilTypeLabels = {
  oil1: "Industrial Gear Oil",
  oil2: "Engine Oil SAE 5W-30",
  oil3: "Hydraulic Oil ISO 46",
  oil4: "Turbine Oil ISO 32"
};
