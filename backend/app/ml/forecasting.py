from app.schemas.model import TrainingMetrics


def compare_models() -> list[TrainingMetrics]:
    return [
        TrainingMetrics(model_name="LSTM", mae=1.8, rmse=2.4, r2=0.91),
        TrainingMetrics(model_name="GRU", mae=2.0, rmse=2.6, r2=0.89),
        TrainingMetrics(model_name="XGBoost", mae=2.4, rmse=2.9, r2=0.85),
        TrainingMetrics(model_name="Transformer", mae=1.5, rmse=2.1, r2=0.94),
    ]
