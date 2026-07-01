from pydantic import BaseModel


class SimulationRequest(BaseModel):
    temperature_c: float
    rainfall_percent: float
    humidity_percent: float
    wind_speed_kmh: float
    co2_ppm: float
    simulation_year: int


class SimulationResponse(BaseModel):
    summary: str
    temperature_index: float
    rainfall_index: float
    drought_risk: str
    flood_risk: str
