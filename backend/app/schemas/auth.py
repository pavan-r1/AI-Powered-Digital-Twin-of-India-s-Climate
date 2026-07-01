from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    email: str
    password: str = Field(min_length=8)


class RegisterRequest(LoginRequest):
    full_name: str
    role: str = Field(default="viewer")


class ForgotPasswordRequest(BaseModel):
    email: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str
    message: str
