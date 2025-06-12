import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Load the dataset
df = pd.read_excel("/content/sample_data/Lubricant_Tribology_200x27_SelectedConditions (1).xlsx")

# Define target and features
target_cols = ['SRV_COF', 'FourBall_WSD_mm', 'EHD_Film_Thickness_nm', 'Friction_Torque_Nm']
X = df.drop(columns=target_cols + ['Sample ID'])  # Exclude target and ID
y = df[target_cols]

# Identify feature types
categorical_features = ['Base_Oil']
numerical_features = X.drop(columns=categorical_features).columns.tolist()

# Preprocessing pipeline
preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numerical_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
])

# Complete pipeline with Random Forest
rf_model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', MultiOutputRegressor(RandomForestRegressor(random_state=42)))
])

# 80-20 Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
rf_model.fit(X_train, y_train)

# Predict on test set
y_pred = rf_model.predict(X_test)

# Evaluate
rmse = np.sqrt(mean_squared_error(y_test, y_pred, multioutput='raw_values'))
r2 = r2_score(y_test, y_pred, multioutput='raw_values')

# Print Results
print("\nRandom Forest Model Evaluation:")
for i, col in enumerate(target_cols):
    print(f"{col} → RMSE: {rmse[i]:.4f}, R²: {r2[i]:.4f}")


# Define a new sample (must match the structure of training features)
new_sample = pd.DataFrame([{
    'Viscosity_40C_cSt': 46.23,
    'Viscosity_100C_cSt': 4.33,
    'Viscosity_Index': 150,
    'Density_g_per_cm3': 0.89,
    'Base_Oil': 'Group IV',  # must match known categories
    'Flash_Point_C': 184,
    'Pour_Point_C': -18,
    'Shear_Stability_Index': 18.47,
    'ZDDP': 0.00,
    'MoDTC': 0.00,
    'Calcium Sulfonate': 0.65,
    'Magnesium Sulfonate': 0.62,
    'Phenolic AO': 0.02,
    'Amine AO': 0.01,
    'Dispersant': 0.86,
    'Boron Ester': 0.02,
    'Phosphite': 1.53,
    'Sulfurized Olefin': 0.005,
    'FM Oleamide': 0.003,
    'FM Glycerol': 1.57,
    'TCP': 0.01,
    'Polymer VM': 0.05,
    'Pour Point Depressant': 0.005,
    'Load,N': 200,
    'Speed, rpm': 1500,
    'Temperatue,C': 60,
    'Time, min': 60,
    'Time,min': 60,
    'Speed_m_per_s': 1.57
}])

# Predict using trained model
predicted_outputs = rf_model.predict(new_sample)

# Display results
pred_df = pd.DataFrame(predicted_outputs, columns=target_cols)
print("\nPredicted Tribological Properties for New Sample:")
print(pred_df)
