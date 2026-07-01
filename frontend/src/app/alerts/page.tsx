<<<<<<< HEAD
import {
  AlertTriangle,
  CloudRain,
  Sun,
  CloudLightning,
  Wind,
  Waves,
} from "lucide-react";
=======
export const dynamic = "force-dynamic";
>>>>>>> 02d3f33 (Add frontend application)

import { PageHeading, Panel } from "@/components/page-panels";

const alerts = [
<<<<<<< HEAD
  {
    title: "Heavy Rainfall Alert",
    region: "Northeast India",
    level: "High",
    period: "20 May - 22 May 2025",
    description: "Very heavy rainfall expected over Assam, Meghalaya and Arunachal Pradesh.",
    icon: CloudRain,
    color: "border-blue-300 bg-blue-50 dark:bg-blue-500/10",
    badge: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  },
  {
    title: "Heatwave Warning",
    region: "Central India",
    level: "Medium",
    period: "20 May - 23 May 2025",
    description: "Day temperatures expected to exceed normal by 4–6°C.",
    icon: Sun,
    color: "border-orange-300 bg-orange-50 dark:bg-orange-500/10",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  },
  {
    title: "Thunderstorm Alert",
    region: "East India",
    level: "Low",
    period: "20 May - 21 May 2025",
    description: "Possibility of thunderstorms accompanied by lightning and gusty winds.",
    icon: CloudLightning,
    color: "border-violet-300 bg-violet-50 dark:bg-violet-500/10",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  {
    title: "Strong Wind Advisory",
    region: "Western Coast",
    level: "Medium",
    period: "21 May - 22 May 2025",
    description: "Wind speeds may reach up to 55 km/h along coastal districts.",
    icon: Wind,
    color: "border-cyan-300 bg-cyan-50 dark:bg-cyan-500/10",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  },
  {
    title: "Flood Watch",
    region: "Kerala",
    level: "High",
    period: "22 May - 24 May 2025",
    description: "Continuous rainfall may cause flooding in low-lying areas.",
    icon: Waves,
    color: "border-indigo-300 bg-indigo-50 dark:bg-indigo-500/10",
    badge: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  },
];

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <PageHeading
          title="Extreme Weather Alerts"
          subtitle="Real-time weather alerts and disaster warnings generated using AI-powered climate prediction."
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {alerts.map((alert) => {
            const Icon = alert.icon;

            return (
              <div
                key={alert.title}
                className={`rounded-3xl border p-5 shadow-sm ${alert.color}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white p-3 shadow dark:bg-slate-900">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">
                        {alert.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {alert.region}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${alert.badge}`}
                  >
                    {alert.level}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                  {alert.description}
                </p>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/70 p-3 text-sm dark:bg-slate-900/50">
                  <span className="font-medium">Alert Duration</span>
                  <span>{alert.period}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel>
        <PageHeading
          title="Alert Summary"
          subtitle="Overall climate warning statistics across India."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border p-5 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-red-500" />
            <h3 className="mt-3 text-3xl font-bold">2</h3>
            <p className="text-sm text-slate-500">
              High Severity
            </p>
          </div>

          <div className="rounded-2xl border p-5 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-amber-500" />
            <h3 className="mt-3 text-3xl font-bold">2</h3>
            <p className="text-sm text-slate-500">
              Medium Severity
            </p>
          </div>

          <div className="rounded-2xl border p-5 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-green-500" />
            <h3 className="mt-3 text-3xl font-bold">1</h3>
            <p className="text-sm text-slate-500">
              Low Severity
            </p>
          </div>

          <div className="rounded-2xl border p-5 text-center">
            <CloudRain className="mx-auto h-8 w-8 text-blue-500" />
            <h3 className="mt-3 text-3xl font-bold">5</h3>
            <p className="text-sm text-slate-500">
              Total Active Alerts
            </p>
          </div>
=======
  { title: "Heavy Rainfall Alert", region: "Northeast India", level: "High", span: 3 },
  { title: "Heatwave Warning", region: "Central India", level: "Medium", span: 4 },
  { title: "Thunderstorm Alert", region: "East India", level: "Low", span: 2 },
];

export default function AlertsPage() {
  const startDate = new Date();
  const titleDate = startDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-4">
      <Panel>
        <PageHeading title={`5. Extreme Weather Alerts · ${titleDate}`} subtitle="Prioritized active alerts with severity badges" />
        <div className="mt-4 grid gap-4 xl:grid-cols-3">
          {alerts.map((alert) => (
            <article key={alert.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">{alert.title}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{alert.region}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${alert.level === "High" ? "bg-rose-100 text-rose-700" : alert.level === "Medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{alert.level}</span>
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
                Active from {startDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} to {new Date(Date.now() + alert.span * 86400000).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </p>
            </article>
          ))}
>>>>>>> 02d3f33 (Add frontend application)
        </div>
      </Panel>
    </div>
  );
}
