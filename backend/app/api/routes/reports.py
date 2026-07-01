from fastapi import APIRouter

from app.schemas.report import ReportExportResponse
from app.services.reports import export_report

router = APIRouter()


@router.get("/export/{format}", response_model=ReportExportResponse)
def export(format: str) -> ReportExportResponse:
    return export_report(format=format)
