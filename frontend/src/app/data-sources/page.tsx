import { PageHeading, Panel } from "@/components/page-panels";

const dataSources = [
  { name: "IMD Rainfall Datasets", status: "Active", detail: "Rainfall, min temperature, max temperature (1901 - Present)" },
  { name: "INSAT Satellite Data (MOSDAC)", status: "Active", detail: "Rainfall, LST, SST (2003 - Present)" },
  { name: "Reanalysis Data (NCMRWF)", status: "Active", detail: "Wind, Humidity, Pressure etc. (1979 - Present)" },
  { name: "Additional Datasets", status: "Queued", detail: "Ground observations, land use, DEM, etc." },
];

export default function DataSourcesPage() {
  return (
    <div className="space-y-4">
      <Panel>
        <PageHeading title="6. Data Sources" subtitle="Dataset inventory and integration status" />
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
      </Panel>
    </div>
  );
}
