from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.climate import ClimatePredictionResponse, ClimateSummaryResponse
from app.services.climate import build_prediction_response, build_summary

router = APIRouter()


@router.get("/summary", response_model=ClimateSummaryResponse)
def summary(state: str = Query(default="India"), district: str | None = None, db: Session = Depends(get_db)) -> ClimateSummaryResponse:
    return build_summary(db=db, state=state, district=district)


@router.get("/predictions", response_model=ClimatePredictionResponse)
def predictions(horizon: str = Query(default="daily"), variable: str = Query(default="rainfall")) -> ClimatePredictionResponse:
    return build_prediction_response(horizon=horizon, variable=variable)
