import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib # For saving the model

def train_and_save_model(data_path: str, model_output_path: str):
    """
    Loads data, trains a Random Forest model, and saves it.

    Args:
        data_path (str): Path to the Excel data file.
        model_output_path (str): Path to save the trained model.
    """
    # Load the dataset
    try:
        df = pd.read_excel(data_path)
    except FileNotFoundError:
        print(f"Error: Data file not found at {data_path}")
        return

    # Define target and features
    target_cols = ['SRV_COF', 'FourBall_WSD_mm', 'EHD_Film_Thickness_nm', 'Friction_Torque_Nm']
    
    # Ensure 'Sample ID' exists before dropping, handle if not
    columns_to_drop = target_cols
    if 'Sample ID' in df.columns:
        columns_to_drop = columns_to_drop + ['Sample ID']
    
    X = df.drop(columns=columns_to_drop, errors='ignore') 
    y = df[target_cols]

    # Identify feature types
    categorical_features = ['Base_Oil'] 
    # Ensure 'Base_Oil' is in X's columns, otherwise handle
    if 'Base_Oil' not in X.columns:
        print("Error: 'Base_Oil' not found in features. Please check data.")
        # Potentially raise an error or handle as appropriate
        return

    numerical_features = X.drop(columns=categorical_features, errors='ignore').columns.tolist()

    # Preprocessing pipeline
    preprocessor = ColumnTransformer(transformers=[
        ('num', StandardScaler(), numerical_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ])

    # Complete pipeline with Random Forest
    # Using specific n_estimators and max_depth to match original notebook if needed, else default
    rf_model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', MultiOutputRegressor(RandomForestRegressor(random_state=42, n_estimators=100, max_depth=None))) 
    ])

    # 80-20 Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    print(f"Starting model training with data from {data_path}...")
    rf_model.fit(X_train, y_train)
    print("Model training complete.")

    # Evaluate (optional, but good for verification during training)
    y_pred = rf_model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred, multioutput='raw_values'))
    r2 = r2_score(y_test, y_pred, multioutput='raw_values')

    print("\nRandom Forest Model Evaluation on Test Set:")
    for i, col in enumerate(target_cols):
        print(f"{col} -> RMSE: {rmse[i]:.4f}, R²: {r2[i]:.4f}")

    # Save the trained model
    try:
        joblib.dump(rf_model, model_output_path)
        print(f"Trained model saved to {model_output_path}")
    except Exception as e:
        print(f"Error saving model: {e}")


if __name__ == "__main__":
    # This allows manual retraining.
    # Assuming the script is in python_backend, and the Excel file is one level up.
    train_and_save_model(
        data_path="../Lubricant_Tribology_200x27_SelectedConditions.xlsx",
        model_output_path="trained_rf_model.joblib" 
    )
