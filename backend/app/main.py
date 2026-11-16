from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import CarInput, PredictionResponse, MileageInsightsInput, MileageInsightsResponse
from app.services.prediction import predict_price, predict_mileage_insights


app = FastAPI(
    title="AutoValue API",
    description="Backend API for AutoValue",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"]
)

@app.get("/")
def home():
    return {"message":"Welcome to AutoValue API"}

@app.get("/api/health")
def health():
    return {"status":"ok"}


@app.post("/api/predict", response_model=PredictionResponse)
def predict(car: CarInput):

    try:
        estimated_price = predict_price(car.model_dump())

        return PredictionResponse(estimated_price=round(estimated_price, 2))
    except ValueError as error:
        raise HTTPException(
            status_code=422,
            deatil=str(error)
        ) from error


@app.post(
    "/api/insights/mileage",
    response_model=MileageInsightsResponse
)
def mileage_insights(car: MileageInsightsInput):

    try:
        insights = predict_mileage_insights(
            car.model_dump()
        )

        return MileageInsightsResponse(**insights)

    except ValueError as error:
        raise HTTPException(
            status_code=422,
            detail=str(error)
        ) from error