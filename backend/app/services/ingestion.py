from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.core.config import settings
from app.schemas.dataset import DatasetUploadMeta, DatasetUploadResponse
from app.services.datasets import register_upload


def _safe_filename(filename: str) -> str:
    return Path(filename).name.replace(" ", "_")


def ingest_dataset_upload(db: Session, meta: DatasetUploadMeta, upload_file: UploadFile) -> DatasetUploadResponse:
    try:
        import pandas as pd
    except Exception:  # pragma: no cover - optional runtime dependency
        pd = None

    try:
        import rasterio
    except Exception:  # pragma: no cover - optional runtime dependency
        rasterio = None

    try:
        import xarray as xr
    except Exception:  # pragma: no cover - optional runtime dependency
        xr = None

    storage_root = Path(settings.dataset_storage_dir)
    storage_root.mkdir(parents=True, exist_ok=True)

    stored_name = f"{uuid4().hex}_{_safe_filename(upload_file.filename or meta.name)}"
    stored_path = storage_root / stored_name
    file_bytes = upload_file.file.read()
    stored_path.write_bytes(file_bytes)

    metadata: dict[str, object] = {"original_filename": upload_file.filename, "stored_path": str(stored_path)}
    missing_values = 0.0
    row_count = 0
    column_count = 0

    normalized_format = meta.file_format.lower()
    file_suffix = stored_path.suffix.lower()
    if (normalized_format == "csv" or file_suffix == ".csv") and pd is not None:
        dataframe = pd.read_csv(stored_path)
        row_count = int(dataframe.shape[0])
        column_count = int(dataframe.shape[1])
        missing_values = float(dataframe.isna().sum().sum())
        metadata.update({"columns": list(dataframe.columns), "preview": dataframe.head(5).to_dict(orient="records")})
    elif (normalized_format in {"nc", "netcdf"} or file_suffix in {".nc", ".netcdf"}) and xr is not None:
        dataset = xr.open_dataset(stored_path)
        row_count = int(sum(int(size) for size in dataset.sizes.values()) or 0)
        column_count = int(len(dataset.data_vars))
        metadata.update({"variables": list(dataset.data_vars), "dimensions": dict(dataset.sizes)})
    elif (normalized_format in {"tif", "tiff", "geotiff"} or file_suffix in {".tif", ".tiff"}) and rasterio is not None:
        with rasterio.open(stored_path) as raster:
            row_count = int(raster.height)
            column_count = int(raster.width)
            missing_values = float(raster.nodata or 0.0)
            metadata.update({"bands": raster.count, "crs": str(raster.crs), "bounds": raster.bounds._asdict()})
    else:
        row_count = len(file_bytes)
        column_count = 1
        metadata.update({"format": meta.file_format, "note": "binary or unsupported structured format" if file_bytes else "empty upload"})

    metadata.update({"file_size_bytes": len(file_bytes)})
    upload_file.file.close()
    return register_upload(
        db=db,
        meta=meta,
        file_path=str(stored_path),
        missing_values=missing_values,
        row_count=row_count,
        column_count=column_count,
        metadata=metadata,
    )
