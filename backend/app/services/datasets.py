import json

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.climate import DatasetRecord
from app.schemas.dataset import DatasetItem, DatasetListResponse, DatasetUploadMeta, DatasetUploadResponse


def _to_item(record: DatasetRecord) -> DatasetItem:
    return DatasetItem(
        id=record.id,
        name=record.name,
        source=record.source,
        file_format=record.file_format,
        file_path=record.file_path,
        missing_values=record.missing_values,
        row_count=record.row_count,
        column_count=record.column_count,
        metadata_json=record.metadata_json,
        last_updated=record.created_at.date().isoformat(),
    )


def seed_datasets(db: Session) -> None:
    if db.execute(select(DatasetRecord).limit(1)).first():
        return

    records = [
        DatasetRecord(
            name="IMD Rainfall",
            source="IMD",
            file_format="NetCDF",
            file_path="datasets/seed/imd_rainfall.nc",
            missing_values=1.4,
            row_count=3650,
            column_count=6,
            metadata_json=json.dumps({"spatial_resolution": "0.25°", "temporal_resolution": "daily"}),
        ),
        DatasetRecord(
            name="INSAT Land Surface Temperature",
            source="INSAT",
            file_format="GeoTIFF",
            file_path="datasets/seed/insat_lst.tif",
            missing_values=0.7,
            row_count=1825,
            column_count=5,
            metadata_json=json.dumps({"layer": "LST", "sensor": "INSAT"}),
        ),
    ]
    db.add_all(records)
    db.commit()


def list_datasets(db: Session) -> DatasetListResponse:
    seed_datasets(db)
    items = db.scalars(select(DatasetRecord).order_by(DatasetRecord.created_at.desc())).all()
    return DatasetListResponse(items=[_to_item(record) for record in items])


def register_upload(
    db: Session,
    meta: DatasetUploadMeta,
    file_path: str,
    missing_values: float,
    row_count: int,
    column_count: int,
    metadata: dict[str, object],
) -> DatasetUploadResponse:
    record = DatasetRecord(
        name=meta.name,
        source=meta.source,
        file_format=meta.file_format,
        file_path=file_path,
        missing_values=missing_values,
        row_count=row_count,
        column_count=column_count,
        metadata_json=json.dumps(metadata),
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return DatasetUploadResponse(message="Upload accepted", upload_id=f"upload_{record.id:06d}", dataset=_to_item(record))
