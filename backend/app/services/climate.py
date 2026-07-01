import json
from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.session import get_redis_client
from app.models.climate import ClimateObservation
from app.schemas.climate import ClimatePredictionResponse, ClimateSummaryResponse, PredictionPoint


def _seed_observation(db: Session, state: str) -> ClimateObservation:
    observation = ClimateObservation(
        observation_date=date.today(),
        region=state,
        source="IMD/INSAT",
        rainfall_mm=34.2,
        max_temperature_c=38.8,
        min_temperature_c=24.1,
    )
    db.add(observation)
    db.commit()
    db.refresh(observation)
    return observation


def build_summary(db: Session, state: str, district: str | None) -> ClimateSummaryResponse:
    redis_client = get_redis_client()
    cache_key = f"climate:summary:{state}:{district or 'all'}"
    if redis_client is not None:
        cached = redis_client.get(cache_key)
        if cached:
            payload = json.loads(cached)
            return ClimateSummaryResponse(**payload, cache_status="hit")

    observation = db.scalars(select(ClimateObservation).where(ClimateObservation.region == state).order_by(ClimateObservation.created_at.desc())).first()
    if observation is None:
        observation = _seed_observation(db, state)

    payload = {
        "region": state,
        "district": district,
        "rainfall_anomaly_percent": 12.4,
        "max_temperature_c": observation.max_temperature_c,
        "min_temperature_c": observation.min_temperature_c,
        "prediction_confidence": 0.92,
        "alert_level": "high",
        "source": observation.source,
    }
    if redis_client is not None:
        redis_client.setex(cache_key, 600, json.dumps(payload))
    return ClimateSummaryResponse(**payload, cache_status="miss")


def build_prediction_response(horizon: str, variable: str) -> ClimatePredictionResponse:
    predictions = [
        PredictionPoint(label="Day 1", rainfall_mm=24.5, max_temperature_c=36.8, min_temperature_c=24.3, confidence=0.94),
        PredictionPoint(label="Day 2", rainfall_mm=31.2, max_temperature_c=35.9, min_temperature_c=23.7, confidence=0.91),
        PredictionPoint(label="Day 3", rainfall_mm=28.4, max_temperature_c=34.8, min_temperature_c=23.1, confidence=0.89),
    ]
    return ClimatePredictionResponse(horizon=horizon, variable=variable, predictions=predictions)
