import os
from dataclasses import dataclass, field


@dataclass(slots=True)
class Settings:
    app_name: str = "AI-Powered Digital Twin of India's Climate"
    api_v1_prefix: str = "/api/v1"
    frontend_url: str = field(default_factory=lambda: os.getenv("FRONTEND_URL", "http://localhost:3000"))
    secret_key: str = field(default_factory=lambda: os.getenv("SECRET_KEY", "change-me-in-production"))
    algorithm: str = field(default_factory=lambda: os.getenv("JWT_ALGORITHM", "HS256"))
    access_token_expire_minutes: int = field(default_factory=lambda: int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")))
    postgres_url: str = field(default_factory=lambda: os.getenv("POSTGRES_URL", "postgresql+psycopg2://climate:climate@localhost:5432/climate"))
    redis_url: str = field(default_factory=lambda: os.getenv("REDIS_URL", "redis://localhost:6379/0"))
    dataset_storage_dir: str = field(default_factory=lambda: os.getenv("DATASET_STORAGE_DIR", "datasets/ingested"))
    cors_origins: list[str] = field(default_factory=lambda: [origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",") if origin.strip()])


settings = Settings()
