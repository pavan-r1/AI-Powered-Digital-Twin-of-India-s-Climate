from fastapi import APIRouter

from app.schemas.simulation import SimulationRequest, SimulationResponse
from app.services.simulation import run_simulation

router = APIRouter()


@router.post("/run", response_model=SimulationResponse)
def simulate(payload: SimulationRequest) -> SimulationResponse:
    return run_simulation(payload)
