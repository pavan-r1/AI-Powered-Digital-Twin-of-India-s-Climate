"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Bot,
  Download,
  LayoutDashboard,
  Map,
  Search,
  Settings2,
  BellRing,
  ChartSpline,
  Database,
  Maximize2,
  FlaskConical,
  Radar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Map View", href: "/map-view", icon: Map },
  { label: "Forecast", href: "/forecast", icon: Radar },
  { label: "Analytics", href: "/analytics", icon: ChartSpline },
  { label: "What-If Simulation", href: "/simulation", icon: FlaskConical },
  { label: "Alerts", href: "/alerts", icon: BellRing },
  { label: "Data Sources", href: "/data-sources", icon: Database },
  { label: "Settings", href: "/settings", icon: Settings2 },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const today = new Date();
  const dateLabel = today.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const activePage = navigation.find((item) => pathname === item.href || (item.href === "/dashboard" && pathname === "/")) ?? navigation[0];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#edf2ff_100%)] text-slate-950 dark:bg-[linear-gradient(180deg,#08111f_0%,#0d1626_100%)] dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-4 p-3 sm:p-4 lg:p-5">
        <aside
          className={cn(
            "fixed inset-y-3 left-3 z-40 w-[18rem] rounded-[2rem] border border-slate-700/30 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-5 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)] transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"
          )}
        >
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/20 text-lg">🌍</div>
            <div>
              <p className="font-semibold">ClimaTwin India</p>
              <p className="text-xs text-slate-300">Climate Digital Twin</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2 text-sm">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition duration-300",
                    active ? "bg-cyan-400/15 text-white ring-1 ring-cyan-300/25" : "text-slate-300 hover:bg-white/8 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
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

        {isOpen ? <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden" onClick={() => setIsOpen(false)} type="button" /> : null}

        <div className="flex min-w-0 flex-1 flex-col gap-4 pt-16 lg:pt-0 lg:pl-0">
          <header className="glass-panel-strong rounded-[2rem] px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3 lg:hidden">
                <Button aria-label="Open menu" onClick={() => setIsOpen(true)} size="sm" type="button" variant="secondary">
                  <span className="text-base leading-none">☰</span>
                </Button>
                <div>
                  <p className="text-lg font-semibold text-slate-950 dark:text-white">AI-Powered Climate Digital Twin of India</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">Real-time Climate Monitoring, Prediction & Simulation</p>
                </div>
              </div>

              <div className="hidden xl:block">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">AI-Powered Climate Digital Twin of India</h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Real-time Climate Monitoring, Prediction & Simulation</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
                  <span>Home</span>
                  <span>/</span>
                  <span className="font-medium text-slate-950 dark:text-white">{activePage.label}</span>
                </div>
              </div>

              <div className="hidden min-w-[20rem] flex-1 items-center gap-3 xl:flex">
                <label className="flex flex-1 items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/70 px-4 py-3 shadow-sm backdrop-blur dark:bg-white/5" htmlFor="global-search">
                  <Search className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                  <input
                    id="global-search"
                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100"
                    placeholder="Search region, alert, dataset, model..."
                    type="search"
                  />
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/60 px-3 py-2 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-200">Date: {dateLabel}</span>
                  <span className="rounded-full border border-white/10 bg-white/60 px-3 py-2 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-200">State: India</span>
                  <span className="rounded-full border border-white/10 bg-white/60 px-3 py-2 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-200">District: All</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 lg:hidden">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">{dateLabel}</div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">All India</div>
              </div>

              <div className="hidden flex-wrap items-center gap-2 xl:flex">
                <Button size="sm" variant="secondary">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button size="sm" variant="secondary">
                  <Maximize2 className="h-4 w-4" />
                  Full Screen
                </Button>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 pb-24 xl:pb-6">{children}</main>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50">
        {assistantOpen ? (
          <div className="mb-3 w-[20rem] rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-4 text-white shadow-[0_24px_90px_rgba(3,12,19,0.35)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">AI Assistant</p>
                <p className="mt-1 text-xs text-slate-300">Quick climate guidance and workflow shortcuts.</p>
              </div>
              <button className="text-slate-300 transition hover:text-white" onClick={() => setAssistantOpen(false)} type="button">
                ×
              </button>
            </div>
            <div className="mt-4 space-y-2 text-xs text-slate-200">
              <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left transition hover:bg-white/10" type="button">Summarize today&apos;s climate risk</button>
              <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left transition hover:bg-white/10" type="button">Compare rainfall anomalies by state</button>
            </div>
          </div>
        ) : null}
        <button
          aria-label="Open AI Assistant"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400 to-sky-500 text-white shadow-[0_20px_60px_rgba(34,211,238,0.35)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
          onClick={() => setAssistantOpen((value) => !value)}
          type="button"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
