from pydantic import BaseModel


class DatasetItem(BaseModel):
    id: int
    name: str
    source: str
    file_format: str
    file_path: str
    missing_values: float
    row_count: int
    column_count: int
    metadata_json: str
    last_updated: str


class DatasetListResponse(BaseModel):
    items: list[DatasetItem]


class DatasetUploadResponse(BaseModel):
    message: str
    upload_id: str
    dataset: DatasetItem


class DatasetUploadMeta(BaseModel):
    name: str
    source: str
    file_format: str


class DatasetUploadRequest(DatasetUploadMeta):
    file_path: str
    missing_values: float = 0.0
    row_count: int = 0
    column_count: int = 0
    metadata_json: str = "{}"
