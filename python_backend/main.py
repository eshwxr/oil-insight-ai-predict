from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Lubricant Tribology Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
    Viscosity_40C_cSt: float = Field(..., example=46.23)
    Viscosity_100C_cSt: float = Field(..., example=4.33)
    Viscosity_Index: float = Field(..., example=150)
    Density_g_per_cm3: float = Field(..., example=0.89)
    Base_Oil: str = Field(..., example="Group IV")
    Flash_Point_C: float = Field(..., example=184)
    Pour_Point_C: float = Field(..., example=-18)
    Shear_Stability_Index: float = Field(..., example=18.47)
    ZDDP: float = Field(..., example=0.00)
    MoDTC: float = Field(..., example=0.00)
    Calcium_Sulfonate: float = Field(..., alias="Calcium Sulfonate", example=0.65)
    Magnesium_Sulfonate: float = Field(..., alias="Magnesium Sulfonate", example=0.62)
    Phenolic_AO: float = Field(..., alias="Phenolic AO", example=0.02)
    Amine_AO: float = Field(..., alias="Amine AO", example=0.01)
    Dispersant: float = Field(..., example=0.86)
    Boron_Ester: float = Field(..., alias="Boron Ester", example=0.02)
    Phosphite: float = Field(..., example=1.53)
    Sulfurized_Olefin: float = Field(..., alias="Sulfurized Olefin", example=0.005)
    FM_Oleamide: float = Field(..., alias="FM Oleamide", example=0.003)
    FM_Glycerol: float = Field(..., alias="FM Glycerol", example=1.57)
    TCP: float = Field(..., example=0.01)
    Polymer_VM: float = Field(..., alias="Polymer VM", example=0.05)
    Pour_Point_Depressant: float = Field(..., alias="Pour Point Depressant", example=0.005)
    Load_N: float = Field(..., alias="Load,N", example=200)
    Speed_rpm: float = Field(..., alias="Speed, rpm", example=1500)
    Temperatue_C: float = Field(..., alias="Temperatue,C", example=60)
    Time_min_1: float = Field(..., alias="Time, min", example=60)
    Time_min_2: float = Field(..., alias="Time,min", example=60)
    Speed_m_per_s: float = Field(..., example=1.57)

    class Config:
        populate_by_name = True

class PredictionOutput(BaseModel):
    SRV_COF: float
    FourBall_WSD_mm: float
    EHD_Film_Thickness_nm: float
    Friction_Torque_Nm: float

MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "trained_rf_model.joblib")
model = None
expected_features_in_order = []

@app.on_event("startup")
async def load_model_on_startup():
    global model, expected_features_in_order
    try:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
            print(f"Model loaded successfully from {MODEL_PATH}")

            try:
                preprocessor = model.named_steps['preprocessor']
                original_feature_names = []
                if hasattr(preprocessor, 'transformers_') and preprocessor.transformers_:
                    for name, trans_obj, feature_cols in preprocessor.transformers_:
                        if name == 'remainder' and trans_obj == 'drop':
                            continue
                        if trans_obj == 'passthrough':
                            original_feature_names.extend(feature_cols)
                            continue
                        original_feature_names.extend(feature_cols)

                seen = set()
                expected_features_in_order = [x for x in original_feature_names if not (x in seen or seen.add(x))]
                print(f"Input features order expected by model (from preprocessor.transformers_): {expected_features_in_order}")

                if not expected_features_in_order:
                    expected_features_in_order = [PredictionInput.model_fields[name].alias or name for name in PredictionInput.model_fields]
                    print(f"Warning: Could not reliably determine feature order from model. Falling back to Pydantic model field order: {expected_features_in_order}")

            except Exception as e:
                print(f"Could not determine feature order from model preprocessor: {e}")
                expected_features_in_order = [PredictionInput.model_fields[name].alias or name for name in PredictionInput.model_fields]
                print(f"Falling back to Pydantic model field order for features: {expected_features_in_order}")
        else:
            print(f"Error: Model file not found at {MODEL_PATH}. Train model first.")
            model = None
    except Exception as e:
        print(f"Error loading model: {e}")
        model = None

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Lubricant Tribology Prediction API."}

@app.post("/predict", response_model=PredictionOutput)
async def predict_endpoint(input_data: PredictionInput):
    global model, expected_features_in_order
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded.")

    input_dict_aliased = input_data.model_dump(by_alias=True)

    try:
        if not expected_features_in_order:
            print("CRITICAL WARNING: expected_features_in_order is empty. Using input_dict keys order.")
            ordered_input_data = {key: [input_dict_aliased[key]] for key in input_dict_aliased}
            payload_df = pd.DataFrame.from_dict(ordered_input_data)
        else:
            ordered_input_data = {}
            missing_from_payload = []
            for feature_name in expected_features_in_order:
                if feature_name not in input_dict_aliased:
                    missing_from_payload.append(feature_name)
                    ordered_input_data[feature_name] = [np.nan]
                else:
                    ordered_input_data[feature_name] = [input_dict_aliased[feature_name]]

            if missing_from_payload:
                print(f"Warning: Features missing from payload, filled with NaN: {missing_from_payload}")
            payload_df = pd.DataFrame.from_dict(ordered_input_data)
            payload_df = payload_df[expected_features_in_order]

    except Exception as e:
        print(f"Error constructing DataFrame: {e}")
        raise HTTPException(status_code=422, detail=f"Error in input data structure: {e}")

    print(f"DataFrame columns for prediction: {payload_df.columns.tolist()}")

    try:
        predicted_outputs = model.predict(payload_df)
        results = predicted_outputs[0]
        return PredictionOutput(
            SRV_COF=results[0], FourBall_WSD_mm=results[1],
            EHD_Film_Thickness_nm=results[2], Friction_Torque_Nm=results[3]
        )
    except Exception as e:
        print(f"Error during model.predict: {e}")
        print(f"Problematic payload_df structure: \n{payload_df.to_string()}")
        raise HTTPException(status_code=500, detail=f"Prediction processing error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    async def main_startup():
        await load_model_on_startup()
        if model:
            print("Starting Uvicorn server directly...")
            uvicorn.run(app, host="0.0.0.0", port=8000)
        else:
            print("Uvicorn server not started: model could not be loaded.")

    import asyncio
    asyncio.run(main_startup())