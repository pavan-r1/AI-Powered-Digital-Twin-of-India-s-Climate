from app.schemas.report import ReportExportResponse


def export_report(format: str) -> ReportExportResponse:
    return ReportExportResponse(
        format=format,
        download_url=f"/api/v1/reports/downloads/climate-report.{format}",
        message="Report generated successfully",
    )
