from pydantic import BaseModel


class ClimateSummaryResponse(BaseModel):
    region: str
    district: str | None = None
    rainfall_anomaly_percent: float
    max_temperature_c: float
    min_temperature_c: float
    prediction_confidence: float
    alert_level: str
    source: str | None = None
    cache_status: str | None = None


class PredictionPoint(BaseModel):
    label: str
    rainfall_mm: float
    max_temperature_c: float
    min_temperature_c: float
    confidence: float


class ClimatePredictionResponse(BaseModel):
    horizon: str
    variable: str
    predictions: list[PredictionPoint]
