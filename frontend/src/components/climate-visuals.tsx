"use client";

import dynamic from "next/dynamic";
import type { ComponentType, ReactNode } from "react";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type MapContainerProps = {
  center: [number, number];
  zoom: number;
  scrollWheelZoom?: boolean;
  className?: string;
  children?: ReactNode;
};

type TileLayerProps = {
  attribution?: string;
  url: string;
};

type CircleMarkerProps = {
  center: [number, number];
  radius?: number;
  pathOptions?: {
    color?: string;
    fillColor?: string;
    fillOpacity?: number;
    weight?: number;
  };
  children?: ReactNode;
};

type PopupProps = {
  children?: ReactNode;
};

type ClimateLayer = "temperature" | "rainfall" | "humidity" | "wind" | "satellite" | "terrain" | "heatmap" | "choropleth";

const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), { ssr: false }) as ComponentType<MapContainerProps>;
const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), { ssr: false }) as ComponentType<TileLayerProps>;
const CircleMarker = dynamic(() => import("react-leaflet").then((module) => module.CircleMarker), { ssr: false }) as ComponentType<CircleMarkerProps>;
const Popup = dynamic(() => import("react-leaflet").then((module) => module.Popup), { ssr: false }) as ComponentType<PopupProps>;

const trendData = [
  { label: "Mon", rainfall: 32, temperature: 28 },
  { label: "Tue", rainfall: 38, temperature: 29 },
  { label: "Wed", rainfall: 54, temperature: 31 },
  { label: "Thu", rainfall: 45, temperature: 30 },
  { label: "Fri", rainfall: 68, temperature: 33 },
  { label: "Sat", rainfall: 52, temperature: 32 },
  { label: "Sun", rainfall: 61, temperature: 34 },
];

const heatPoints = [
  { name: "North-West", lat: 29.0, lng: 75.0, value: 78 },
  { name: "Central", lat: 23.5, lng: 78.5, value: 66 },
  { name: "East", lat: 23.1, lng: 86.7, value: 84 },
  { name: "South", lat: 13.1, lng: 78.3, value: 61 },
  { name: "North-East", lat: 26.2, lng: 91.7, value: 72 },
];

const layerPalette: Record<ClimateLayer, { title: string; subtitle: string; tint: string; accent: string; tile: string }> = {
  temperature: { title: "Temperature Layer", subtitle: "Urban and heat stress clusters", tint: "#ff9f68", accent: "#f97316", tile: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  rainfall: { title: "Rainfall Layer", subtitle: "Precipitation intensity and spread", tint: "#37d3c3", accent: "#14b8a6", tile: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  humidity: { title: "Humidity Layer", subtitle: "Moisture corridors across India", tint: "#6cc7ff", accent: "#38bdf8", tile: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  wind: { title: "Wind Layer", subtitle: "Directional wind field over key corridors", tint: "#c4f1ff", accent: "#7dd3fc", tile: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  satellite: { title: "Satellite Layer", subtitle: "Synthetic satellite texture view", tint: "#dbeafe", accent: "#60a5fa", tile: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  terrain: { title: "Terrain Layer", subtitle: "Topography and elevation context", tint: "#a7f3d0", accent: "#22c55e", tile: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  heatmap: { title: "Heatmap Layer", subtitle: "Climate intensity hotspots", tint: "#fbbf24", accent: "#fb923c", tile: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  choropleth: { title: "Choropleth Layer", subtitle: "Regional index by state", tint: "#c084fc", accent: "#8b5cf6", tile: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
};

export function ClimateTrendChart() {
  return (
    <div className="h-[20rem] rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-3 sm:p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="rainfallFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#37d3c3" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#37d3c3" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="temperatureFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6cc7ff" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#6cc7ff" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <XAxis dataKey="label" stroke="rgba(226,232,240,0.6)" tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(226,232,240,0.6)" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "rgba(4, 15, 23, 0.95)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              color: "white",
            }}
          />
          <Legend />
          <Area type="monotone" dataKey="rainfall" name="Rainfall" stroke="#37d3c3" fill="url(#rainfallFill)" strokeWidth={2} />
          <Area type="monotone" dataKey="temperature" name="Temperature" stroke="#6cc7ff" fill="url(#temperatureFill)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function IndiaClimateMap({ layer = "heatmap", compact = false }: { layer?: ClimateLayer; compact?: boolean } = {}) {
  const palette = useMemo(() => layerPalette[layer], [layer]);

  return (
    <div className={compact ? "relative h-[22rem] overflow-hidden rounded-[2rem]" : "relative h-[34rem] overflow-hidden rounded-[2rem]"}>
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-slate-950/70 via-slate-950/45 to-cyan-950/40" />
      <MapContainer center={[22.5, 79.0]} zoom={4.5} scrollWheelZoom={false} className="relative z-10 h-full w-full rounded-[1.5rem]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={palette.tile}
        />
        {heatPoints.map((point) => (
          <CircleMarker
            key={point.name}
            center={[point.lat, point.lng]}
            radius={Math.max(8, point.value / 8)}
            pathOptions={{
              color: palette.accent,
              fillColor: palette.tint,
              fillOpacity: 0.36,
              weight: 2.2,
            }}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{point.name}</p>
                <p>Climate intensity score: {point.value}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div className="absolute left-4 top-4 z-20 max-w-xs rounded-[1.25rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-white shadow-[0_18px_60px_rgba(3,12,19,0.3)] backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Live Map</p>
        <p className="mt-1 text-sm font-semibold">{palette.title}</p>
        <p className="mt-1 text-xs text-slate-300">{palette.subtitle}</p>
      </div>
      <div className="absolute bottom-4 left-4 z-20 rounded-[1.25rem] border border-white/10 bg-white/85 px-4 py-3 text-xs text-slate-700 shadow-[0_18px_60px_rgba(3,12,19,0.18)] backdrop-blur-xl dark:bg-slate-950/80 dark:text-slate-200">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.tint }} />
          <span>Intensity</span>
        </div>
        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">Higher values represent stronger climate signal density.</p>
      </div>
    </div>
  );
}
