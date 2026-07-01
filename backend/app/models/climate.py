from datetime import date, datetime, timezone

from sqlalchemy import Date, DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class ClimateObservation(Base):
    __tablename__ = "climate_observations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    observation_date: Mapped[date] = mapped_column(Date, index=True)
    region: Mapped[str] = mapped_column(String(120), index=True)
    source: Mapped[str] = mapped_column(String(80), index=True)
    rainfall_mm: Mapped[float] = mapped_column(Float, default=0.0)
    max_temperature_c: Mapped[float] = mapped_column(Float, default=0.0)
    min_temperature_c: Mapped[float] = mapped_column(Float, default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class DatasetRecord(Base):
    __tablename__ = "dataset_records"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(180), index=True)
    source: Mapped[str] = mapped_column(String(80), index=True)
    file_format: Mapped[str] = mapped_column(String(40), index=True)
    file_path: Mapped[str] = mapped_column(Text)
    missing_values: Mapped[float] = mapped_column(Float, default=0.0)
    row_count: Mapped[int] = mapped_column(Integer, default=0)
    column_count: Mapped[int] = mapped_column(Integer, default=0)
    metadata_json: Mapped[str] = mapped_column(Text, default="{}")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
