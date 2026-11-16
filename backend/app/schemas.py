from pydantic import BaseModel, Field
from typing import Literal


class CarInput(BaseModel):
    brand: str = Field(min_length=1)
    model: str = Field(min_length=1)
    year: int = Field(ge=1967,le=2026)
    fuel: Literal["Diesel","Electric","Gasoline","Hybrid"]
    transmission: Literal["Automatic","Manual"]
    power: float = Field(gt=5, le=1050)
    mileage: float = Field(ge=0, le=1000000)

class PredictionResponse(BaseModel):
    estimated_price: float