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
          </div>
        </div>
      </Panel>
    </div>
  );
}
