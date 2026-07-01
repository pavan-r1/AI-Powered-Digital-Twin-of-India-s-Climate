<<<<<<< HEAD
import {
  Thermometer,
  CloudRain,
  Droplets,
  Wind,
  Leaf,
  AlertTriangle,
} from "lucide-react";

import { IndiaClimateMap, ClimateTrendChart } from "@/components/climate-visuals";
import { PageHeading, Panel, StatPill } from "@/components/page-panels";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <PageHeading
          title="Dashboard Overview"
          subtitle="Real-time climate monitoring and quick insights across India."
        />

        {/* Statistics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatPill
            label="Temperature"
            value="32.6°C"
            delta="+1.2°C vs yesterday"
            trend="up"
            icon={<Thermometer className="h-5 w-5" />}
            tone="amber"
          />

          <StatPill
            label="Rainfall"
            value="18.7 mm"
            delta="+5.3 mm vs yesterday"
            trend="up"
            icon={<CloudRain className="h-5 w-5" />}
            tone="blue"
          />

          <StatPill
            label="Humidity"
            value="68%"
            delta="+3%"
            trend="up"
            icon={<Droplets className="h-5 w-5" />}
            tone="cyan"
          />

          <StatPill
            label="Wind"
            value="14.2 km/h"
            delta="+0.5 km/h"
            trend="up"
            icon={<Wind className="h-5 w-5" />}
            tone="emerald"
          />

          <StatPill
            label="AQI"
            value="67"
            delta="Moderate"
            trend="flat"
            icon={<Leaf className="h-5 w-5" />}
            tone="emerald"
          />
        </div>
      </Panel>

      {/* Map + Insights */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Panel>
          <PageHeading
            title="Live Temperature Map"
            subtitle="Current climate hotspots across India."
          />

          <div className="mt-4 rounded-3xl overflow-hidden">
            <IndiaClimateMap />
          </div>
        </Panel>

        <Panel>
          <PageHeading
            title="Quick Insights"
            subtitle="Key operational observations"
          />

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border p-4">
              Above normal temperature in North & Central India.
            </div>

            <div className="rounded-xl border p-4">
              Rainfall deficit in Western Rajasthan.
            </div>

            <div className="rounded-xl border p-4">
              High rainfall activity in Northeast India.
            </div>
          </div>
        </Panel>
      </div>

      {/* Trend + Alerts */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Panel>
          <PageHeading
            title="Climate Trend"
            subtitle="Temperature and rainfall during the last 30 days."
          />

          <div className="mt-4">
            <ClimateTrendChart />
          </div>
        </Panel>

        <Panel>
          <PageHeading
            title="Recent Alerts"
            subtitle="Latest active climate alerts"
          />

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-red-300 bg-red-50 p-4 dark:border-red-500/40 dark:bg-red-500/10">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Heavy Rainfall
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Northeast India
              </p>
            </div>

            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Heatwave Warning
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Central India
              </p>
            </div>

            <div className="rounded-xl border border-sky-300 bg-sky-50 p-4 dark:border-sky-500/40 dark:bg-sky-500/10">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4 text-sky-500" />
                Thunderstorm
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                East India
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
=======
import { DashboardPage } from "@/components/dashboard-page";

export default function DashboardRoute() {
  return <DashboardPage />;
>>>>>>> 02d3f33 (Add frontend application)
}
