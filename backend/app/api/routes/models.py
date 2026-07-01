from fastapi import APIRouter

from app.schemas.model import ModelTrainingRequest, ModelTrainingResponse
from app.services.models import start_training_job

router = APIRouter()


@router.post("/train", response_model=ModelTrainingResponse)
def train_model(payload: ModelTrainingRequest) -> ModelTrainingResponse:
    return start_training_job(payload)
