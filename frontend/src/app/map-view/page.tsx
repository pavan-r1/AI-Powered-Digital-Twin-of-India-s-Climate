<<<<<<< HEAD
import { IndiaClimateMap } from "@/components/climate-visuals";
import { PageHeading, Panel } from "@/components/page-panels";

export default function MapViewPage() {
  return (
    <div className="space-y-4">
      <Panel>
        <PageHeading title="2. Map View (Rainfall)" subtitle="Dedicated rainfall map card with layered geospatial focus." />
        <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
            <IndiaClimateMap />
          </div>
          <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>Rainfall</span><span>Daily</span></div>
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>Date</span><span>2 July 2026</span></div>
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>Layers</span><span>3 active</span></div>
=======
"use client";

import { useEffect, useMemo, useState } from "react";

import { IndiaClimateMap } from "@/components/climate-visuals";
import { PageHeading, Panel } from "@/components/page-panels";
import { Button } from "@/components/ui/button";
import { ChevronRight, CloudRainWind, Layers3, LocateFixed, Play, Search, Satellite, ThermometerSun, TimerReset, Waves, Wind } from "lucide-react";

type LayerKey = "temperature" | "rainfall" | "humidity" | "wind" | "satellite" | "terrain" | "heatmap" | "choropleth";

const layers: Array<{ key: LayerKey; label: string; icon: typeof ThermometerSun; summary: string }> = [
  { key: "temperature", label: "Temperature", icon: ThermometerSun, summary: "Heat stress and thermal hotspots" },
  { key: "rainfall", label: "Rainfall", icon: CloudRainWind, summary: "Daily precipitation intensity" },
  { key: "humidity", label: "Humidity", icon: Waves, summary: "Moisture corridors and comfort index" },
  { key: "wind", label: "Wind", icon: Wind, summary: "Wind speed and directional flow" },
  { key: "satellite", label: "Satellite", icon: Satellite, summary: "Imagery-backed monitoring context" },
  { key: "terrain", label: "Terrain", icon: LocateFixed, summary: "Elevation-aware risk clustering" },
  { key: "heatmap", label: "Heatmap", icon: Layers3, summary: "Live intensity surface" },
  { key: "choropleth", label: "Choropleth", icon: Layers3, summary: "State-level index shading" },
];

const timeline = ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];

export default function MapViewPage() {
  const [selectedLayer, setSelectedLayer] = useState<LayerKey>("heatmap");
  const [timeIndex, setTimeIndex] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("All India");

  useEffect(() => {
    if (!playing) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeIndex((value) => (value + 1) % timeline.length);
    }, 1700);

    return () => window.clearInterval(timer);
  }, [playing]);

  const activeLayer = useMemo(() => layers.find((item) => item.key === selectedLayer) ?? layers[0], [selectedLayer]);
  const activeTime = timeline[timeIndex];
  const layerStats = [
    { label: "Coverage", value: "98.6%", detail: "National monitoring grid" },
    { label: "Clarity", value: "92%", detail: "Satellite and ground fusion" },
    { label: "Clusters", value: "42", detail: "Active climate zones" },
  ];

  return (
    <div className="space-y-4">
      <Panel className="overflow-hidden">
        <div className="flex flex-col gap-4">
          <PageHeading
            title="2. Interactive Climate Map"
            subtitle="Full-screen spatial monitoring with layered views, live time controls, and a search-driven geo cockpit."
          />

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              {layers.map((layer) => {
                const Icon = layer.icon;
                const active = selectedLayer === layer.key;
                return (
                  <button
                    key={layer.key}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ${active ? "border-cyan-300/40 bg-cyan-400/15 text-cyan-50 shadow-[0_10px_30px_rgba(34,211,238,0.18)]" : "border-slate-200/80 bg-white/70 text-slate-700 hover:border-cyan-300/30 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"}`}
                    onClick={() => setSelectedLayer(layer.key)}
                    type="button"
                  >
                    <Icon className="h-4 w-4" />
                    {layer.label}
                  </button>
                );
              })}
            </div>

            <label className="flex items-center gap-3 rounded-[1.25rem] border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5" htmlFor="region-search">
              <Search className="h-4 w-4 text-slate-500 dark:text-slate-300" />
              <input
                id="region-search"
                className="w-full min-w-[12rem] bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search state or district"
                value={searchTerm}
              />
            </label>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/35 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                <IndiaClimateMap layer={selectedLayer} />
                <div className="absolute left-6 top-6 rounded-[1.25rem] border border-white/10 bg-slate-950/80 px-4 py-3 text-white shadow-[0_18px_60px_rgba(3,12,19,0.28)] backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Active Layer</p>
                  <p className="mt-1 text-lg font-semibold">{activeLayer.label}</p>
                  <p className="text-xs text-slate-300">{activeLayer.summary}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {layerStats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-300">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-300">Time Slider</p>
                    <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">{activeTime}</p>
                  </div>
                  <Button onClick={() => setPlaying((value) => !value)} size="sm" type="button" variant="secondary">
                    {playing ? <TimerReset className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {playing ? "Pause" : "Play"}
                  </Button>
                </div>
                <input className="mt-5 w-full accent-cyan-400" max={timeline.length - 1} min={0} onChange={(event) => setTimeIndex(Number(event.target.value))} type="range" value={timeIndex} />
                <div className="mt-3 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  {timeline.map((slot) => (
                    <span key={slot}>{slot}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br from-cyan-50 to-blue-50 p-4 shadow-sm dark:border-white/10 dark:from-white/5 dark:to-white/0">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">Legend</p>
                <div className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                  <div className="flex items-center justify-between">
                    <span>Low intensity</span>
                    <span className="h-3 w-24 rounded-full bg-gradient-to-r from-cyan-200 to-cyan-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Medium intensity</span>
                    <span className="h-3 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>High intensity</span>
                    <span className="h-3 w-24 rounded-full bg-gradient-to-r from-amber-400 to-rose-500" />
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-300">Geo Search</p>
                    <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{searchTerm}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Targeted monitoring zones, marker clustering, and playback are primed for state and district level operations.
                </p>
              </div>
            </div>
>>>>>>> 02d3f33 (Add frontend application)
          </div>
        </div>
      </Panel>
    </div>
  );
}
