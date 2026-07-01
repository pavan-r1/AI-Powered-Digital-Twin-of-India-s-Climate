from pydantic import BaseModel


class ReportExportResponse(BaseModel):
    format: str
    download_url: str
    message: str
