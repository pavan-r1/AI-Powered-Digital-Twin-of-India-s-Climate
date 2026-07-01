import { ClimateTrendChart, IndiaClimateMap } from "@/components/climate-visuals";
import { Button } from "@/components/ui/button";
import { PageHeading, Panel, StatPill } from "@/components/page-panels";
import { Activity, ArrowUpRight, BellRing, CloudRainWind, Download, Gauge, ThermometerSun, Wind } from "lucide-react";

const stats = [
  { label: "Average Temperature", value: "32.6°C", trend: "up" as const, delta: "+1.4°C", icon: <ThermometerSun className="h-5 w-5" />, tone: "amber" as const },
  { label: "Rainfall", value: "18.7 mm", trend: "down" as const, delta: "-8%", icon: <CloudRainWind className="h-5 w-5" />, tone: "blue" as const },
  { label: "Humidity", value: "68%", trend: "up" as const, delta: "+3%", icon: <Gauge className="h-5 w-5" />, tone: "cyan" as const },
  { label: "Wind Speed", value: "14.2 km/h", trend: "flat" as const, delta: "Stable", icon: <Wind className="h-5 w-5" />, tone: "emerald" as const },
  { label: "AQI", value: "67", trend: "down" as const, delta: "Improving", icon: <Activity className="h-5 w-5" />, tone: "rose" as const },
];

const weatherSummary = [
  { title: "North India", detail: "Heat stress elevated, cloud cover low.", tone: "from-amber-400/20 to-orange-400/10" },
  { title: "Northeast", detail: "Heavy rainfall band active with high moisture inflow.", tone: "from-cyan-400/20 to-sky-400/10" },
  { title: "Central Belt", detail: "Humidity rising, wind speeds remain moderate.", tone: "from-emerald-400/20 to-teal-400/10" },
];

const insights = [
  { title: "Heat signature climbing in North and Central India", message: "Recommend heat advisory escalation and cooling shelter readiness.", tone: "bg-amber-50 text-amber-800 dark:bg-amber-400/10 dark:text-amber-100" },
  { title: "Rainfall deficit in Western Rajasthan", message: "Bias toward dry anomalies suggests water stress monitoring.", tone: "bg-rose-50 text-rose-800 dark:bg-rose-400/10 dark:text-rose-100" },
  { title: "High rainfall activity in Northeast India", message: "Maintain flood watch and keep river basin alerts active.", tone: "bg-cyan-50 text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-100" },
];

export function DashboardPage() {
  const lastUpdated = new Date().toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-4">
      <Panel className="overflow-hidden">
        <div className="relative space-y-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <PageHeading
              title="1. Dashboard Overview"
              subtitle="Executive climate cockpit with live KPIs, map intelligence, trend analysis, and AI recommendations."
            />
            <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[24rem]">
              <div className="rounded-[1.35rem] border border-white/10 bg-white/70 px-4 py-3 shadow-sm backdrop-blur dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300">Last Updated</p>
                <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{lastUpdated}</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-white/70 px-4 py-3 shadow-sm backdrop-blur dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300">Coverage</p>
                <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">All India · 36 states and UTs</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button size="sm" variant="secondary">
              <ArrowUpRight className="h-4 w-4" />
              Download Predictions
            </Button>
            <Button size="sm" variant="secondary">
              <BellRing className="h-4 w-4" />
              Enable Alerts
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map((item) => (
              <StatPill key={item.label} {...item} />
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-4">
              <div className="grid gap-4 xl:grid-cols-2">
                <Panel className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <PageHeading title="Temperature Heatmap" subtitle="Interactive heat layer with regional hotspots." />
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-50">Heatmap</span>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-[1.35rem]">
                    <IndiaClimateMap layer="temperature" compact />
                  </div>
                </Panel>

                <Panel className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <PageHeading title="Rainfall Heatmap" subtitle="Daily rainfall intensity and cluster spread." />
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-50">Live</span>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-[1.35rem]">
                    <IndiaClimateMap layer="rainfall" compact />
                  </div>
                </Panel>
              </div>

              <Panel className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <PageHeading title="Climate Trend (Last 30 Days)" subtitle="Temperature and rainfall movement with enterprise analytics styling." />
                  <span className="rounded-full border border-white/10 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-200">Model ensemble</span>
                </div>
                <div className="mt-4 overflow-hidden rounded-[1.35rem] p-1">
                  <ClimateTrendChart />
                </div>
              </Panel>
            </div>

            <div className="space-y-4">
              <Panel className="p-4">
                <PageHeading title="Weather Summary" subtitle="Region-by-region operational snapshot." />
                <div className="mt-4 space-y-3">
                  {weatherSummary.map((item) => (
                    <article key={item.title} className={`rounded-[1.35rem] border border-white/10 bg-gradient-to-br ${item.tone} p-4`}>
                      <p className="text-sm font-semibold text-slate-950 dark:text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200">{item.detail}</p>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel className="p-4">
                <PageHeading title="AI Insights" subtitle="Color-coded recommendations generated from the live climate picture." />
                <div className="mt-4 space-y-3">
                  {insights.map((item) => (
                    <article key={item.title} className={`rounded-[1.35rem] border border-white/10 px-4 py-3 ${item.tone}`}>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-6">{item.message}</p>
                    </article>
                  ))}
                </div>
              </Panel>

              <Panel className="p-4">
                <PageHeading title="Model Snapshot" subtitle="Selected model, training progress, and validation state." />
                <div className="mt-4 space-y-3 rounded-[1.35rem] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-300">Currently selected model</p>
                      <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">ISRO Fusion Ensemble v4</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-200">94% accuracy</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10">
                    <div className="h-3 w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1rem] bg-white p-3 dark:bg-slate-950/60">
                      <p className="text-xs text-slate-500 dark:text-slate-300">Training status</p>
                      <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">Stable</p>
                    </div>
                    <div className="rounded-[1rem] bg-white p-3 dark:bg-slate-950/60">
                      <p className="text-xs text-slate-500 dark:text-slate-300">Validation loss</p>
                      <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">0.18</p>
                    </div>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
