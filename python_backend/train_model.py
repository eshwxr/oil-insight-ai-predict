from ml_pipeline import train_and_save_model
import os

if __name__ == "__main__":
    # Construct paths relative to this script's location
    current_script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(current_script_dir) # Goes up one level to project root

    data_file_path = os.path.join(project_root, "Lubricant_Tribology_200x27_SelectedConditions.xlsx")
    model_output_path = os.path.join(current_script_dir, "trained_rf_model.joblib")
    
    print(f"train_model.py: Looking for data file at: {data_file_path}")
    print(f"train_model.py: Will save model to: {model_output_path}")

    train_and_save_model(data_path=data_file_path, model_output_path=model_output_path)
    print("\nModel training complete (called from train_model.py).")