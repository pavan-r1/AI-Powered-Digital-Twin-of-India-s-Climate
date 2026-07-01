"use client";

import { useState } from "react";

import { PageHeading, Panel } from "@/components/page-panels";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState("5 minutes");
  const [notifications, setNotifications] = useState(true);
  const lastSync = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-4">
      <Panel>
        <PageHeading title="Settings" subtitle="Theme, region, refresh cadence, and platform preferences." />
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-300">Theme</p>
            <label className="mt-3 flex items-center justify-between gap-4 text-xl font-semibold text-slate-950 dark:text-white">
              <span>{darkMode ? "Dark" : "Light"}</span>
              <input checked={darkMode} className="h-5 w-5 accent-slate-900 dark:accent-white" onChange={(event) => setDarkMode(event.target.checked)} type="checkbox" />
            </label>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-300">Default Region</p>
            <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">All India</p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-300">Auto Refresh</p>
            <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-lg font-semibold text-slate-950 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" value={autoRefresh} onChange={(event) => setAutoRefresh(event.target.value)}>
              <option>1 minute</option>
              <option>5 minutes</option>
              <option>15 minutes</option>
            </select>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">Last sync {lastSync}</p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-300">Notifications</p>
            <label className="mt-3 flex items-center justify-between gap-4 text-xl font-semibold text-slate-950 dark:text-white">
              <span>{notifications ? "Enabled" : "Disabled"}</span>
              <input checked={notifications} className="h-5 w-5 accent-slate-900 dark:accent-white" onChange={(event) => setNotifications(event.target.checked)} type="checkbox" />
            </label>
          </div>
        </div>
      </Panel>
    </div>
  );
}
