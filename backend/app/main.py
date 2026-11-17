"""
FastAPI backend for the House Price Predictor.

Loads the LinearRegression model trained by model/train_model.py
(same algorithm and same 3 features as the user's original notebook:
Area (sqft), Bedrooms, Age -> Price in lakhs) and exposes a single
prediction endpoint consumed by the Next.js frontend.
"""

import json
import os
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "model" / "house_price_model.joblib"
METRICS_PATH = BASE_DIR / "model" / "metrics.json"

app = FastAPI(
    title="House Price Predictor API",
    description="Serves predictions from a LinearRegression model (Area, Bedrooms, Age -> Price in lakhs).",
    version="1.0.0",
)

# Allow the deployed frontend (and local dev) to call this API.
# Set FRONTEND_ORIGIN in the backend's environment to your exact
# Vercel URL once deployed, e.g. https://house-price-ai.vercel.app
allowed_origins = [
    "http://localhost:3000",
    os.environ.get("FRONTEND_ORIGIN", ""),
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in allowed_origins if o],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_bundle = None
_metrics = None


def get_model_bundle():
    global _bundle
    if _bundle is None:
        if not MODEL_PATH.exists():
            raise HTTPException(
                status_code=503,
                detail="Model file not found. Run model/train_model.py during build.",
            )
        _bundle = joblib.load(MODEL_PATH)
    return _bundle


def get_metrics():
    global _metrics
    if _metrics is None and METRICS_PATH.exists():
        _metrics = json.loads(METRICS_PATH.read_text())
    return _metrics or {}


class PredictionRequest(BaseModel):
    area_sqft: float = Field(..., gt=0, le=20000, description="Built-up area in square feet")
    bedrooms: int = Field(..., ge=1, le=10, description="Number of bedrooms")
    age_years: float = Field(..., ge=0, le=150, description="Age of the property in years")


class PredictionResponse(BaseModel):
    predicted_price_lakhs: float
    predicted_price_inr: float


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": MODEL_PATH.exists()}


@app.get("/model-info")
def model_info():
    """Real, computed metrics from training -- never hand-typed."""
    metrics = get_metrics()
    if not metrics:
        raise HTTPException(status_code=503, detail="Metrics not available.")
    return metrics


@app.post("/predict", response_model=PredictionResponse)
def predict(payload: PredictionRequest):
    bundle = get_model_bundle()
    model = bundle["model"]
    feature_order = bundle["feature_order"]

    # Build a single-row DataFrame with the exact column names/order
    # the model was trained on: Area (sqft), Bedrooms, Age.
    row = pd.DataFrame(
        [[payload.area_sqft, payload.bedrooms, payload.age_years]],
        columns=feature_order,
    )

    prediction_lakhs = float(model.predict(row)[0])
    prediction_lakhs = max(prediction_lakhs, 0.0)

    return PredictionResponse(
        predicted_price_lakhs=round(prediction_lakhs, 2),
        predicted_price_inr=round(prediction_lakhs * 100000, 2),
    )
