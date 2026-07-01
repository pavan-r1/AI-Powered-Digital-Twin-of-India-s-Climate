import { ClimateTrendChart, IndiaClimateMap } from "@/components/climate-visuals";
import { Button } from "@/components/ui/button";

const sidebarItems = ["Dashboard", "Map View", "Forecast", "Analytics", "What-If Simulation", "Alerts", "Data Sources", "Settings"];

const overviewStats = [
  { label: "Average Temperature", value: "32.6°C", detail: "+1.2°C vs yesterday", accent: "from-rose-500/20 to-rose-400/5" },
  { label: "Total Rainfall (Today)", value: "18.7 mm", detail: "+5.3 mm vs yesterday", accent: "from-sky-500/20 to-sky-400/5" },
  { label: "Humidity", value: "68%", detail: "+3% vs yesterday", accent: "from-emerald-500/20 to-emerald-400/5" },
  { label: "Wind Speed", value: "14.2 km/h", detail: "+0.5 km/h vs yesterday", accent: "from-violet-500/20 to-violet-400/5" },
  { label: "AQI (Average)", value: "67", detail: "Moderate", accent: "from-amber-500/20 to-amber-400/5" },
];

const quickInsights = [
  "Above normal temperature in North & Central India.",
  "Rainfall deficit in Western Rajasthan.",
  "High rainfall activity in Northeast India.",
];

const forecastTabs = ["Temperature", "Rainfall", "Humidity", "Wind"];

const forecastBars = [
  { label: "20 May", value: 56 },
  { label: "21 May", value: 148 },
  { label: "22 May", value: 44 },
  { label: "23 May", value: 71 },
  { label: "24 May", value: 58 },
  { label: "25 May", value: 63 },
  { label: "26 May", value: 76 },
];

const scenarioControls = [
  { label: "Select Scenario", value: "Increase Temperature" },
  { label: "Temperature Increase", value: "+2.0°C" },
  { label: "Time Period", value: "2030-2040" },
];

const alerts = [
  { title: "Heavy Rainfall Alert", region: "Northeast India", level: "High", range: "20 May - 22 May 2025" },
  { title: "Heatwave Warning", region: "Central India", level: "Medium", range: "20 May - 23 May 2025" },
  { title: "Thunderstorm Alert", region: "East India", level: "Low", range: "20 May - 21 May 2025" },
];

const dataSources = [
  { name: "IMD Rainfall Datasets", status: "Active", detail: "Rainfall, min temperature, max temperature (1901 - Present)" },
  { name: "INSAT Satellite Data (MOSDAC)", status: "Active", detail: "Rainfall, LST, SST (2003 - Present)" },
  { name: "Reanalysis Data (NCMRWF)", status: "Active", detail: "Wind, Humidity, Pressure etc. (1979 - Present)" },
  { name: "Additional Datasets", status: "Queued", detail: "Ground observations, land use, DEM, etc." },
];

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{subtitle}</p> : null}
    </div>
  );
}

function MetricCard({ label, value, detail, accent }: { label: string; value: string; detail: string; accent: string }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
          <h3 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{detail}</p>
        </div>
        <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${accent} border border-white/40 dark:border-white/10`} />
      </div>
    </article>
  );
}

function Sidebar() {
  return (
    <aside className="flex h-full flex-col rounded-[2rem] bg-slate-950 px-4 py-5 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/20 text-lg">🌍</div>
        <div>
          <p className="font-semibold">ClimaTwin India</p>
          <p className="text-xs text-slate-300">Climate Digital Twin</p>
        </div>
      </div>

      <nav className="mt-8 space-y-2 text-sm">
        {sidebarItems.map((item, index) => (
          <a
            key={item}
            href={`#section-${index + 1}`}
            className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition ${index === 0 ? "bg-indigo-500/80 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"}`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-current opacity-70" />
            <span>{item}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        <p className="font-medium text-white">System Status</p>
        <p className="mt-2 text-slate-300">All modules online</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-slate-400">Backend</p>
            <p className="mt-1 text-emerald-300">Running</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-slate-400">Frontend</p>
            <p className="mt-1 text-emerald-300">Running</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ForecastBars() {
  return (
    <div className="h-[18rem] rounded-[1.5rem] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/60">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-sm">
          {forecastTabs.map((tab, index) => (
            <button key={tab} className={`rounded-full px-4 py-1.5 ${index === 1 ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500 dark:bg-white/8 dark:text-slate-300"}`} type="button">
              {tab}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-300">All India</div>
      </div>
      <div className="mt-6 flex h-[12rem] items-end gap-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white px-4 pb-4 dark:from-white/5 dark:to-transparent">
        {forecastBars.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="w-full rounded-t-xl bg-indigo-500/85 shadow-[0_0_30px_rgba(79,70,229,0.2)]" style={{ height: `${bar.value}%` }} />
            <span className="text-xs text-slate-500 dark:text-slate-300">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClimateDashboard() {
  return (
    <main className="space-y-4">
        <div className="space-y-4">
          <header className="rounded-[2rem] border border-slate-200/90 bg-white px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/60">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">AI-Powered Climate Digital Twin of India</h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Real-time Climate Monitoring, Prediction & Simulation</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">20 May 2025</div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">All India</div>
                <Button variant="secondary" size="sm">Profile</Button>
              </div>
            </div>
          </header>

          <section id="section-1" className="space-y-4 rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/50">
            <SectionTitle title="1. Dashboard (Overview)" subtitle="Overview metrics, maps, trend analysis, and quick insights in one split panel." />
            <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {overviewStats.map((metric) => (
                    <MetricCard key={metric.label} {...metric} />
                  ))}
                </div>

                <div className="grid gap-4 xl:grid-cols-3">
                  <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/60 xl:col-span-1">
                    <SectionTitle title="Live Temperature Map (°C)" subtitle="Hotspot distribution across India" />
                    <div className="mt-4 overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-amber-50 to-orange-100 p-3 dark:from-white/5 dark:to-white/0">
                      <IndiaClimateMap />
                    </div>
                  </article>

                  <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/60 xl:col-span-1">
                    <SectionTitle title="Rainfall (Today) Map (mm)" subtitle="Daily rainfall intensity" />
                    <div className="mt-4 overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-sky-50 to-blue-100 p-3 dark:from-white/5 dark:to-white/0">
                      <IndiaClimateMap />
                    </div>
                  </article>

                  <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/60 xl:col-span-1">
                    <SectionTitle title="Climate Trend (Last 30 Days)" subtitle="Temperature and rainfall movement" />
                    <div className="mt-4 overflow-hidden rounded-[1.25rem] p-1">
                      <ClimateTrendChart />
                    </div>
                  </article>
                </div>
              </div>

              <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/60">
                <SectionTitle title="Quick Insights" subtitle="Key operational observations" />
                <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-200">
                  {quickInsights.map((insight) => (
                    <div key={insight} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
                      • {insight}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button asChild className="w-full">
                    <a href="#section-5">View Full Report</a>
                  </Button>
                </div>
              </aside>
            </div>
          </section>

          <section id="section-2" className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/50">
            <SectionTitle title="2. Map View (Rainfall)" subtitle="Dedicated rainfall map card with layered geospatial focus." />
            <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
                <IndiaClimateMap />
              </div>
              <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>Rainfall</span><span>Daily</span></div>
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>Date</span><span>20 May 2025</span></div>
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300"><span>Layers</span><span>3 active</span></div>
                <Button variant="secondary" className="w-full">Toggle Layers</Button>
              </div>
            </div>
          </section>

          <section id="section-3" className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/50">
            <SectionTitle title="3. Forecast & Analytics" subtitle="7-day bar forecast plus comparison metrics." />
            <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
              <ForecastBars />
              <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-950/60">
                  <p className="text-sm text-slate-500 dark:text-slate-300">Total Rainfall (7 Days)</p>
                  <p className="mt-2 text-3xl font-semibold">87.4 mm</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-950/60">
                  <p className="text-sm text-slate-500 dark:text-slate-300">Max Rainfall Day</p>
                  <p className="mt-2 text-3xl font-semibold">21 May</p>
                  <p className="text-sm text-slate-500 dark:text-slate-300">28.6 mm</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-950/60">
                  <p className="text-sm text-slate-500 dark:text-slate-300">Rainfall Anomaly</p>
                  <p className="mt-2 text-3xl font-semibold">-8%</p>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Below Normal</p>
                </div>
              </div>
            </div>
          </section>

          <section id="section-4" className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/50">
            <SectionTitle title="4. What-If Scenario Simulation" subtitle="Scenario controls with a simulation result map" />
            <div className="mt-4 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                {scenarioControls.map((control) => (
                  <div key={control.label} className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-950/60">
                    <p className="text-sm text-slate-500 dark:text-slate-300">{control.label}</p>
                    <p className="mt-1 font-medium text-slate-950 dark:text-white">{control.value}</p>
                  </div>
                ))}
                <Button className="w-full">Run Simulation</Button>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
                <IndiaClimateMap />
              </div>
            </div>
          </section>

          <section id="section-5" className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/50">
            <SectionTitle title="5. Extreme Weather Alerts" subtitle="Prioritized active alerts with severity badges" />
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
                  <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">{alert.range}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="section-6" className="rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/50">
            <SectionTitle title="6. Data Sources" subtitle="Dataset inventory and integration status" />
            <div className="mt-4 grid gap-4 xl:grid-cols-2">
              {dataSources.map((source) => (
                <article key={source.name} className="flex items-center justify-between rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">{source.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{source.detail}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${source.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}>{source.status}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
    </main>
  );
}
