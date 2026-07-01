"use client";

import { useState } from "react";

import { IndiaClimateMap } from "@/components/climate-visuals";
import { Button } from "@/components/ui/button";
import { PageHeading, Panel } from "@/components/page-panels";

export default function SimulationPage() {
  const [temperatureRise, setTemperatureRise] = useState("+2.0°C");
  const [timePeriod, setTimePeriod] = useState("2030-2040");
  const [result, setResult] = useState("Ready to run a scenario.");
  const currentStamp = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const runScenario = () => {
    const heatIndex = temperatureRise === "+3.0°C" ? "very high" : temperatureRise === "+2.0°C" ? "high" : "moderate";
    const rainfallShift = temperatureRise === "+3.0°C" ? "12-18%" : temperatureRise === "+2.0°C" ? "8-12%" : "4-7%";
    setResult(`As of ${currentStamp}, the ${timePeriod} scenario at ${temperatureRise} indicates ${heatIndex} heat stress and a projected rainfall shift of ${rainfallShift} across Central and North India.`);
  };

  return (
    <div className="space-y-4">
      <Panel>
        <PageHeading title="4. What-If Scenario Simulation" subtitle="Scenario controls with a simulation result map" />
        <div className="mt-4 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="rounded-2xl bg-white p-3 dark:bg-slate-950/60">
              <p className="text-sm text-slate-500 dark:text-slate-300">Select Scenario</p>
              <p className="mt-1 font-medium">Increase Temperature</p>
            </div>
            <div className="rounded-2xl bg-white p-3 dark:bg-slate-950/60">
              <p className="text-sm text-slate-500 dark:text-slate-300">Temperature Increase</p>
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-950 dark:border-white/10 dark:text-white" value={temperatureRise} onChange={(event) => setTemperatureRise(event.target.value)}>
                <option value="+1.0°C">+1.0°C</option>
                <option value="+2.0°C">+2.0°C</option>
                <option value="+3.0°C">+3.0°C</option>
              </select>
            </div>
            <div className="rounded-2xl bg-white p-3 dark:bg-slate-950/60">
              <p className="text-sm text-slate-500 dark:text-slate-300">Time Period</p>
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-950 dark:border-white/10 dark:text-white" value={timePeriod} onChange={(event) => setTimePeriod(event.target.value)}>
                <option value="2025-2030">2025-2030</option>
                <option value="2030-2040">2030-2040</option>
                <option value="2040-2050">2040-2050</option>
              </select>
            </div>
            <Button
              className="w-full"
              onClick={runScenario}
              type="button"
            >
              Run Simulation
            </Button>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-3 text-sm text-slate-600 dark:border-white/15 dark:bg-slate-950/40 dark:text-slate-200">
              {result}
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
            <IndiaClimateMap />
          </div>
        </div>
      </Panel>
    </div>
  );
}
