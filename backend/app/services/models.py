from app.schemas.model import ModelTrainingRequest, ModelTrainingResponse, TrainingMetrics


def start_training_job(payload: ModelTrainingRequest) -> ModelTrainingResponse:
    metrics = TrainingMetrics(model_name=payload.model_name, mae=1.6, rmse=2.2, r2=0.93)
    return ModelTrainingResponse(job_id="job_01J4TRAIN", status="queued", metrics=metrics)
