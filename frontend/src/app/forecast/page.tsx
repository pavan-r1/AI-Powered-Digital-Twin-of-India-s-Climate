"use client";

import { useMemo, useState } from "react";

import { PageHeading, Panel } from "@/components/page-panels";
import { Button } from "@/components/ui/button";
import { CalendarRange, CloudRain, CloudSun, MoveRight, SunMedium, ThermometerSun, Waves } from "lucide-react";

type ForecastMode = "7-day" | "30-day";

const hourlyTimeline = [
  { time: "00:00", rainfall: 12, temperature: 28 },
  { time: "03:00", rainfall: 16, temperature: 27 },
  { time: "06:00", rainfall: 18, temperature: 29 },
  { time: "09:00", rainfall: 21, temperature: 31 },
  { time: "12:00", rainfall: 29, temperature: 34 },
  { time: "15:00", rainfall: 24, temperature: 33 },
  { time: "18:00", rainfall: 20, temperature: 31 },
  { time: "21:00", rainfall: 17, temperature: 29 },
];

const icons = [CloudRain, CloudSun, SunMedium, ThermometerSun, Waves, MoveRight];

function buildForecast(mode: ForecastMode) {
  const days = mode === "7-day" ? 7 : 30;
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return {
      label: date.toLocaleDateString("en-IN", { day: "numeric", month: mode === "7-day" ? "short" : undefined }),
      rainfall: 42 + ((index * 7) % 22) + (mode === "30-day" ? 5 : 0),
      temperature: 28 + (index % 6),
      confidence: 83 - (index % 5),
      icon: icons[index % icons.length],
    };
  });
}

export default function ForecastPage() {
  const [mode, setMode] = useState<ForecastMode>("7-day");
  const forecast = useMemo(() => buildForecast(mode), [mode]);
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + (mode === "7-day" ? 6 : 29));

  const totalRainfall = forecast.reduce((sum, item) => sum + item.rainfall, 0).toFixed(1);
  const topDay = forecast.reduce((best, item) => (item.rainfall > best.rainfall ? item : best), forecast[0]);

  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex flex-col gap-4">
          <PageHeading
            title="3. Forecast & Analytics"
            subtitle={`Switch between ${mode} forecasting, see model confidence, and compare projected rainfall from ${today.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} to ${endDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}.`}
          />

          <div className="flex flex-wrap gap-2">
            {(["7-day", "30-day"] as ForecastMode[]).map((item) => (
              <button
                key={item}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${mode === item ? "border-cyan-300/40 bg-cyan-400/15 text-cyan-50" : "border-slate-200/80 bg-white/70 text-slate-700 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"}`}
                onClick={() => setMode(item)}
                type="button"
              >
                {item === "7-day" ? <CalendarRange className="mr-2 inline h-4 w-4" /> : <MoveRight className="mr-2 inline h-4 w-4" />}
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-4">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/60">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-300">{mode} rainfall projection</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{totalRainfall} mm total</p>
                  </div>
                  <div className="rounded-2xl bg-cyan-400/15 px-4 py-3 text-right text-sm font-semibold text-cyan-700 dark:text-cyan-200">
                    <p>Prediction confidence</p>
                    <p className="text-2xl">{forecast[0].confidence}%</p>
                  </div>
                </div>

                <div className={`mt-5 ${mode === "7-day" ? "grid gap-3 sm:grid-cols-2 xl:grid-cols-7" : "grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"}`}>
                  {forecast.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.label} className="rounded-[1.35rem] border border-slate-200/80 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-950 dark:text-white">{item.label}</p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{item.confidence}% confidence</p>
                          </div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm dark:bg-white/10 dark:text-white">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="mt-4 h-28 rounded-[1rem] bg-gradient-to-b from-white to-cyan-50 p-3 dark:from-white/5 dark:to-transparent">
                          <div className="flex h-full items-end">
                            <div className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-500 to-sky-400 shadow-[0_10px_24px_rgba(34,211,238,0.2)]" style={{ height: `${Math.max(36, item.rainfall * 1.1)}px` }} />
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
                          <span>Rainfall</span>
                          <span>{item.rainfall} mm</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
                          <span>Temp</span>
                          <span>{item.temperature}°C</span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/60">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-300">Max Rainfall Day</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{topDay.label}</p>
                  </div>
                  <div className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-300">Average Confidence</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{Math.round(forecast.reduce((sum, item) => sum + item.confidence, 0) / forecast.length)}%</p>
                  </div>
                  <div className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-300">Forecast Bias</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">-8%</p>
                  </div>
                  <div className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-300">Model Blend</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Ensemble</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="rounded-[1.35rem] bg-white p-4 dark:bg-slate-950/60">
                <p className="text-sm text-slate-500 dark:text-slate-300">Hourly timeline</p>
                <div className="mt-4 grid gap-3">
                  {hourlyTimeline.map((item) => (
                    <div key={item.time} className="flex items-center justify-between rounded-2xl border border-slate-200/80 px-3 py-2.5 dark:border-white/10">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.time}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-300">{item.temperature}°C · {item.rainfall} mm</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.35rem] bg-white p-4 dark:bg-slate-950/60">
                <p className="text-sm text-slate-500 dark:text-slate-300">Forecast comparison</p>
                <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-200">
                  <div className="rounded-2xl bg-cyan-50 p-3 dark:bg-cyan-400/10">New run predicts slightly higher rainfall in East and Northeast India.</div>
                  <div className="rounded-2xl bg-amber-50 p-3 dark:bg-amber-400/10">30-day outlook remains stable with no extreme deviations.</div>
                  <div className="rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-400/10">Confidence remains above 80% across the first 10 days.</div>
                </div>
              </div>

              <div className="rounded-[1.35rem] bg-white p-4 dark:bg-slate-950/60">
                <p className="text-sm text-slate-500 dark:text-slate-300">Export</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary">Download PNG</Button>
                  <Button size="sm" variant="secondary">Download PDF</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
