from pydantic import BaseModel, Field


class ModelTrainingRequest(BaseModel):
    model_name: str = Field(pattern="^(LSTM|GRU|CNN|Transformer|Random Forest|XGBoost)$")
    dataset_name: str
    target_variable: str
    epochs: int = Field(default=25, ge=1, le=1000)


class TrainingMetrics(BaseModel):
    model_name: str
    mae: float
    rmse: float
    r2: float


class ModelTrainingResponse(BaseModel):
    job_id: str
    status: str
    metrics: TrainingMetrics
