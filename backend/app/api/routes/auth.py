from fastapi import APIRouter

from app.core.security import create_access_token
from app.schemas.auth import ForgotPasswordRequest, LoginRequest, RegisterRequest, TokenResponse

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    token = create_access_token(subject=payload.email, roles=["researcher"])
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        role="researcher",
        message="Login successful",
    )


@router.post("/register", response_model=TokenResponse)
def register(payload: RegisterRequest) -> TokenResponse:
    token = create_access_token(subject=payload.email, roles=[payload.role])
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        role=payload.role,
        message="Account created",
    )


@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest) -> dict[str, str]:
    return {"message": f"Password reset link queued for {payload.email}"}
