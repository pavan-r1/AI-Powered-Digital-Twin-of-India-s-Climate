import type { ReactNode } from "react";

import { ArrowDownRight, ArrowUpRight, Minus, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type TrendDirection = "up" | "down" | "flat";

export function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-500/90 dark:text-cyan-300/90">Climate Intelligence</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-[2rem]">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-300">{subtitle}</p>
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={cn("glass-panel animate-fade-in-up rounded-[2rem] p-5 text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_100px_rgba(3,12,19,0.22)] dark:text-white sm:p-6", className)}>{children}</section>;
}

export function StatPill({
  label,
  value,
  trend = "flat",
  delta = "Stable",
  icon,
  tone = "cyan",
}: {
  label: string;
  value: string;
  trend?: TrendDirection;
  delta?: string;
  icon?: ReactNode;
  tone?: "cyan" | "blue" | "emerald" | "amber" | "rose";
}) {
  const trendTone = trend === "up" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : trend === "down" ? "bg-rose-500/15 text-rose-700 dark:text-rose-300" : "bg-slate-500/10 text-slate-600 dark:text-slate-300";
  const accentTone = tone === "emerald" ? "from-emerald-400/20 to-cyan-400/10" : tone === "blue" ? "from-sky-400/20 to-cyan-400/10" : tone === "amber" ? "from-amber-400/20 to-orange-400/10" : tone === "rose" ? "from-rose-400/20 to-pink-400/10" : "from-cyan-400/20 to-sky-400/10";

  return (
    <div className={cn("group rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-br p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 dark:border-white/10 dark:shadow-none", accentTone)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-slate-700 shadow-sm dark:bg-white/10 dark:text-white">
          {icon ?? <Sparkles className="h-5 w-5" />}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", trendTone)}>
          {trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : trend === "down" ? <ArrowDownRight className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
          {delta}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-300">Live</span>
      </div>
    </div>
  );
}
