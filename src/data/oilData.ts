export type OilType = 'engine' | 'hydraulic' | 'compressed' | 'transmission';

export interface BaseOilProperties {
  name: string;
  viscosity40: number;
  viscosity100: number;
  viscosityIndex: number;
  density: number;
  pourPoint: number;
  flashPoint: number;
}

export interface EngineOilProperties extends BaseOilProperties {
  zddp: number;
  phenolicAO: number;
  amineAO: number;
  detergent: number;
  dispersant: number;
  frictionModifier: number;
  viImprover: number;
  baseTBN: number;
}

export interface HydraulicOilProperties extends BaseOilProperties {
  antifoam: number;
  demulsifier: number;
  rustInhibitor: number;
  wearProtection: number;
  thermalStability: number;
}

export interface CompressedOilProperties extends BaseOilProperties {
  carbonResidue: number;
  sulfurContent: number;
  waterContent: number;
  acidNumber: number;
  oxidationStability: number;
}

export interface TransmissionOilProperties extends BaseOilProperties {
  frictionCoefficient: number;
  shearStability: number;
  sealCompatibility: number;
  foamTendency: number;
  copperCorrosion: number;
}

export type OilProperties = 
  | EngineOilProperties 
  | HydraulicOilProperties 
  | CompressedOilProperties 
  | TransmissionOilProperties;

export interface OperatingConditions {
  temperature: number;
  pressure: number;
  loadCondition: 'light' | 'medium' | 'heavy' | 'extreme';
  operatingHours: number;
  environment: 'indoor' | 'outdoor' | 'marine' | 'dusty';
}

export interface TestInput {
  oilType: OilType;
  properties: OilProperties;
  operatingConditions: OperatingConditions;
}

export interface PredictionResult {
  oilType: OilType;
  wear: number;
  friction: number;
  thermalDegradation: number;
  oxidationLevel: number;
  timestamp: string;
  testId: string;
  srvCOF: number;
  fourBallWear: number;
  filmThickness: number;
  viscosityStability?: number;
  thermalStability?: number;
  oxidationResistance?: number;
}

export interface TestHistory {
  id: string;
  input: TestInput;
  result: PredictionResult;
  createdAt: string;
}

export const defaultOilData: Record<OilType, OilProperties> = {
  engine: {
    name: "Engine Oil SAE 5W-30",
    viscosity40: 68,
    viscosity100: 11.2,
    viscosityIndex: 160,
    density: 850,
    pourPoint: -35,
    flashPoint: 215,
    zddp: 0.8,
    phenolicAO: 0.5,
    amineAO: 0.2,
    detergent: 2.5,
    dispersant: 3.0,
    frictionModifier: 1.0,
    viImprover: 8.5,
    baseTBN: 10.5
  },
  hydraulic: {
    name: "Hydraulic Oil ISO 46",
    viscosity40: 46,
    viscosity100: 6.8,
    viscosityIndex: 105,
    density: 870,
    pourPoint: -25,
    flashPoint: 225,
    antifoam: 0.002,
    demulsifier: 0.005,
    rustInhibitor: 0.2,
    wearProtection: 1.5,
    thermalStability: 92
  },
  compressed: {
    name: "Compressor Oil ISO 100",
    viscosity40: 100,
    viscosity100: 11.5,
    viscosityIndex: 95,
    density: 885,
    pourPoint: -20,
    flashPoint: 240,
    carbonResidue: 0.05,
    sulfurContent: 0.3,
    waterContent: 0.02,
    acidNumber: 0.1,
    oxidationStability: 88
  },
  transmission: {
    name: "Transmission Fluid ATF",
    viscosity40: 35,
    viscosity100: 7.2,
    viscosityIndex: 175,
    density: 845,
    pourPoint: -45,
    flashPoint: 195,
    frictionCoefficient: 0.12,
    shearStability: 95,
    sealCompatibility: 98,
    foamTendency: 0.1,
    copperCorrosion: 1
  }
};

export const defaultOperatingConditions: OperatingConditions = {
  temperature: 80,
  pressure: 1.0,
  loadCondition: 'medium',
  operatingHours: 1000,
  environment: 'indoor'
};

export const oilTypeLabels = {
  engine: "Engine Oil",
  hydraulic: "Hydraulic Oil", 
  compressed: "Compressor Oil",
  transmission: "Transmission Oil"
};

export const propertyLabels: Record<string, { label: string; unit: string; type: string; max?: number }> = {
  // Base properties
  name: { label: "Oil Name", unit: "", type: "text" },
  viscosity40: { label: "Viscosity @40°C", unit: "cSt", type: "number" },
  viscosity100: { label: "Viscosity @100°C", unit: "cSt", type: "number" },
  viscosityIndex: { label: "Viscosity Index", unit: "", type: "number" },
  density: { label: "Density", unit: "kg/m³", type: "number" },
  pourPoint: { label: "Pour Point", unit: "°C", type: "number" },
  flashPoint: { label: "Flash Point", unit: "°C", type: "number" },
  
  // Engine oil specific
  zddp: { label: "ZDDP", unit: "%", type: "number", max: 5 },
  phenolicAO: { label: "Phenolic AO", unit: "%", type: "number", max: 5 },
  amineAO: { label: "Amine AO", unit: "%", type: "number", max: 5 },
  detergent: { label: "Detergent", unit: "%", type: "number", max: 10 },
  dispersant: { label: "Dispersant", unit: "%", type: "number", max: 10 },
  frictionModifier: { label: "Friction Modifier", unit: "%", type: "number", max: 5 },
  viImprover: { label: "VI Improver", unit: "%", type: "number", max: 15 },
  baseTBN: { label: "Base TBN", unit: "mg KOH/g", type: "number", max: 20 },
  
  // Hydraulic oil specific
  antifoam: { label: "Antifoam Agent", unit: "%", type: "number", max: 1 },
  demulsifier: { label: "Demulsifier", unit: "%", type: "number", max: 1 },
  rustInhibitor: { label: "Rust Inhibitor", unit: "%", type: "number", max: 2 },
  wearProtection: { label: "Wear Protection", unit: "%", type: "number", max: 5 },
  thermalStability: { label: "Thermal Stability", unit: "%", type: "number", max: 100 },
  
  // Compressor oil specific
  carbonResidue: { label: "Carbon Residue", unit: "%", type: "number", max: 1 },
  sulfurContent: { label: "Sulfur Content", unit: "%", type: "number", max: 2 },
  waterContent: { label: "Water Content", unit: "%", type: "number", max: 0.1 },
  acidNumber: { label: "Acid Number", unit: "mg KOH/g", type: "number", max: 1 },
  oxidationStability: { label: "Oxidation Stability", unit: "%", type: "number", max: 100 },
  
  // Transmission oil specific
  frictionCoefficient: { label: "Friction Coefficient", unit: "", type: "number", max: 0.5 },
  shearStability: { label: "Shear Stability", unit: "%", type: "number", max: 100 },
  sealCompatibility: { label: "Seal Compatibility", unit: "%", type: "number", max: 100 },
  foamTendency: { label: "Foam Tendency", unit: "%", type: "number", max: 1 },
  copperCorrosion: { label: "Copper Corrosion", unit: "rating", type: "number", max: 4 }
};
