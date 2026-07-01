from fastapi import APIRouter

from app.api.routes import auth, climate, datasets, models, reports, simulation

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(climate.router, prefix="/climate", tags=["climate"])
api_router.include_router(datasets.router, prefix="/datasets", tags=["datasets"])
api_router.include_router(models.router, prefix="/models", tags=["models"])
api_router.include_router(simulation.router, prefix="/simulation", tags=["simulation"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
