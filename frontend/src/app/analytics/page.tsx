import { ClimateTrendChart } from "@/components/climate-visuals";
import { PageHeading, Panel, StatPill } from "@/components/page-panels";
import {
  Activity,
  TrendingUp,
  BarChart3,
  Thermometer,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <PageHeading
          title="Climate Analytics"
          subtitle="Analyze climate trends, rainfall patterns, temperature variations, and AI prediction performance."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatPill
            label="Prediction Accuracy"
            value="96.4%"
            trend="up"
            delta="+1.2%"
            icon={<Activity className="h-5 w-5" />}
            tone="emerald"
          />

          <StatPill
            label="Temperature Trend"
            value="+1.8°C"
            trend="up"
            delta="Last 30 Days"
            icon={<Thermometer className="h-5 w-5" />}
            tone="amber"
          />

          <StatPill
            label="Rainfall Anomaly"
            value="-8%"
            trend="down"
            delta="Below Normal"
            icon={<TrendingUp className="h-5 w-5" />}
            tone="blue"
          />

          <StatPill
            label="Climate Index"
            value="82"
            trend="up"
            delta="Stable"
            icon={<BarChart3 className="h-5 w-5" />}
            tone="cyan"
          />
        </div>
      </Panel>

      <Panel>
        <PageHeading
          title="Climate Trend Analysis"
          subtitle="Temperature and rainfall trends over the last 30 days."
        />

        <div className="mt-6">
          <ClimateTrendChart />
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel>
          <PageHeading
            title="Temperature Analysis"
            subtitle="Average regional temperature variation."
          />

          <div className="mt-6 rounded-2xl border p-6">
            <ul className="space-y-4 text-sm">
              <li>• North India: 36.4°C (+2.3°C)</li>
              <li>• South India: 30.2°C (+0.8°C)</li>
              <li>• East India: 31.4°C (+1.1°C)</li>
              <li>• West India: 34.1°C (+1.9°C)</li>
              <li>• Northeast India: 27.8°C (+0.5°C)</li>
            </ul>
          </div>
        </Panel>

        <Panel>
          <PageHeading
            title="Rainfall Analytics"
            subtitle="Rainfall distribution and anomalies."
          />

          <div className="mt-6 rounded-2xl border p-6">
            <ul className="space-y-4 text-sm">
              <li>• Total Rainfall: 87.4 mm</li>
              <li>• Maximum Rainfall: 28.6 mm</li>
              <li>• Rainfall Deficit: -8%</li>
              <li>• Flood Risk Regions: 3</li>
              <li>• Drought Risk Regions: 2</li>
            </ul>
          </div>
        </Panel>
      </div>

      <Panel>
        <PageHeading
          title="AI Model Performance"
          subtitle="Performance of the climate prediction model."
        />

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border rounded-xl">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="p-3 text-left">Metric</th>
                <th className="p-3 text-left">Value</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-3">Model Accuracy</td>
                <td className="p-3">96.4%</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">RMSE</td>
                <td className="p-3">0.82</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">MAE</td>
                <td className="p-3">0.41</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">Last Updated</td>
                <td className="p-3">2 July 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
