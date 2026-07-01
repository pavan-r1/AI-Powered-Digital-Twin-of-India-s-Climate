import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.dataset import DatasetListResponse, DatasetUploadRequest, DatasetUploadResponse
from app.services.datasets import list_datasets
from app.services.datasets import register_upload

router = APIRouter()


@router.get("", response_model=DatasetListResponse)
def get_datasets(db: Session = Depends(get_db)) -> DatasetListResponse:
    return list_datasets(db)


@router.post("/upload", response_model=DatasetUploadResponse)
def upload_dataset(payload: DatasetUploadRequest, db: Session = Depends(get_db)) -> DatasetUploadResponse:
    return register_upload(
        db=db,
        meta=payload,
        file_path=payload.file_path,
        missing_values=payload.missing_values,
        row_count=payload.row_count,
        column_count=payload.column_count,
        metadata=json.loads(payload.metadata_json or "{}"),
    )
