from app.schemas.simulation import SimulationRequest, SimulationResponse


def run_simulation(payload: SimulationRequest) -> SimulationResponse:
    temperature_index = round((payload.temperature_c / 45.0) * 100, 2)
    rainfall_index = round(min(payload.rainfall_percent * 1.2, 100.0), 2)
    drought_risk = "medium" if payload.rainfall_percent > 0 else "high"
    flood_risk = "high" if payload.rainfall_percent > 20 else "medium"
    summary = f"Scenario for {payload.simulation_year} indicates a {flood_risk} flood signal and {drought_risk} drought pressure."
    return SimulationResponse(
        summary=summary,
        temperature_index=temperature_index,
        rainfall_index=rainfall_index,
        drought_risk=drought_risk,
        flood_risk=flood_risk,
    )
