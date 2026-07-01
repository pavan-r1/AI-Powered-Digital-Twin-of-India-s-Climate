from datetime import datetime, timedelta, timezone

from jose import jwt

from app.core.config import settings


def create_access_token(subject: str, roles: list[str]) -> str:
    payload = {
        "sub": subject,
        "roles": roles,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes),
    }
    return jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)
