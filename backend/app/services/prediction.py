import pandas as pd
import joblib

from pathlib import Path


MODEL_PATH = (Path(__file__).resolve().parents[2]
              / "models"
              / "autovalue_model.joblib"
        )

artifact = joblib.load(MODEL_PATH)

model = artifact["model"]
categories = artifact["categories"]
features = artifact["features"]

def predict_price(data: dict) -> float:

    for col, allowed_values in categories.items():
        if data[col] not in allowed_values:
            raise ValueError(f"Invalid value for {col}: {data[col]}")

    X = pd.DataFrame([data], columns=features)

    for col, allowed_values in categories.items():
        X[col] = pd.Categorical(
            X[col],
            categories=allowed_values
        )

    prediction = model.predict(X)[0]

    return float(prediction)