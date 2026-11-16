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

def predict_mileage_insights(data: dict) -> dict:

    for col, allowed_values in categories.items():
        if data[col] not in allowed_values:
            raise ValueError(f"Invalid value for {col}: {data[col]}")

    mileage_values = list(range(0, 200001, 10000))

    observations = [
        {**data, "mileage": mileage}
        for mileage in mileage_values
    ]

    X = pd.DataFrame(observations, columns=features)


    for col, allowed_values in categories.items():
        X[col] = pd.Categorical(
            X[col],
            categories=allowed_values
        )


    predictions = model.predict(X)

    return {
        "mileage": mileage_values,
        "estimated_prices": [
            round(float(price), 2)
            for price in predictions
        ]
    }