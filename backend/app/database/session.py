from functools import lru_cache
from pathlib import Path

from redis import Redis
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings
from app.database.base import Base

_sqlite_path = Path("backend/.data/climate.db")
_sqlite_path.parent.mkdir(parents=True, exist_ok=True)


def _build_engine():
    try:
        return create_engine(settings.postgres_url, pool_pre_ping=True, future=True)
    except ModuleNotFoundError:
        return create_engine(f"sqlite:///{_sqlite_path.as_posix()}", connect_args={"check_same_thread": False}, future=True)
    except Exception:
        return create_engine(f"sqlite:///{_sqlite_path.as_posix()}", connect_args={"check_same_thread": False}, future=True)


engine = _build_engine()
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


@lru_cache(maxsize=1)
def get_redis_client() -> Redis | None:
    try:
        client = Redis.from_url(settings.redis_url, decode_responses=True)
        client.ping()
        return client
    except Exception:
        return None


def get_database_url() -> str:
    return str(engine.url)


def get_cache_url() -> str:
    return settings.redis_url


def get_db() -> Session:
    database = SessionLocal()
    try:
        yield database
    finally:
        database.close()


def init_db() -> None:
    from app import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
