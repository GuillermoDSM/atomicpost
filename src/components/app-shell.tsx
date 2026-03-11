"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, CornerDownRight, LayoutDashboard, Rows3, Search, UserRound } from "lucide-react";

import { Input } from "@/components/ui/input";
import { settlementCycles } from "@/lib/settlement-cycles";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/settlement-cycles", label: "Settlement Cycles", icon: Rows3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routeMeta = getRouteMeta(pathname);
  const nextCycle = getNextCycle();

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] gap-3 px-3 py-3 lg:px-4">
        <aside className="sticky top-3 hidden h-[calc(100vh-1.5rem)] w-[248px] shrink-0 flex-col rounded-[24px] border border-[var(--app-border)] bg-[var(--app-sidebar)] p-3.5 lg:flex">
          <div className="mb-5 px-1.5 py-1">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Treasury workspace</p>
              <h1 className="text-[24px] font-semibold tracking-[-0.04em] text-slate-950">AtomicPost</h1>
            </div>
          </div>

          <div className="mb-2 px-2">
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm transition-all",
                    active
                      ? "bg-[var(--app-panel)] text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.05)] ring-1 ring-[var(--app-border)]"
                      : "text-slate-500 hover:bg-[var(--app-panel)] hover:text-slate-950",
                  )}
                >
                  <Icon className={cn("h-4 w-4", active ? "text-[var(--app-primary-text)]" : "text-slate-400")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 rounded-[18px] border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--app-primary-text)]">Resume next cycle</p>
            <p className="mt-2 text-sm font-medium text-slate-950">{nextCycle.id}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{nextCycle.nextAction} for {nextCycle.counterparty}</p>
            <Link
              href={`/settlement-cycles/${nextCycle.slug}`}
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-panel)] px-3 py-2 text-sm text-slate-700 transition hover:bg-white hover:text-slate-950"
            >
              <CornerDownRight className="h-4 w-4 text-[var(--app-primary-text)]" />
              Open blocked cycle
            </Link>
          </div>

          <div className="mt-auto space-y-1 px-1 pb-3">
            {[
              ["PoC live", "Offline"],
              ["XRPL Testnet", "Offline"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl px-2 py-1">
                <span className="text-[12px] text-slate-500">{label}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--app-neutral-soft)] px-2 py-0.75 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--app-neutral-text)]">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 rounded-[20px] border border-[var(--app-border)] bg-[var(--app-panel)] p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--app-panel-strong)] text-slate-500">
                <UserRound className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-950">Treasury &amp; Settlement</p>
                <p className="truncate text-xs text-slate-500">ops@atomicpost.io</p>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-slate-400" />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <header className="rounded-[24px] border border-[var(--app-border)] bg-[var(--app-panel)] px-4 py-3 md:px-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-slate-950">{routeMeta.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{routeMeta.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2 xl:max-w-[620px] xl:flex-row xl:items-center xl:justify-end">
                <div className="flex items-center gap-2 lg:hidden">
                  {navigation.map((item) => {
                    const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "inline-flex h-9 items-center rounded-2xl border px-3 text-sm transition",
                          active
                            ? "border-[var(--app-border)] bg-[var(--app-panel)] text-slate-950"
                            : "border-[var(--app-border)] bg-[var(--app-panel-muted)] text-slate-600 hover:bg-[var(--app-panel)] hover:text-slate-950",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="relative w-full xl:max-w-xs">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input className="h-10 rounded-2xl border-[var(--app-border)] bg-[var(--app-panel)] pl-9 shadow-none" placeholder="Search cycles, IDs or counterparties" />
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/settlement-cycles/${nextCycle.slug}`}
                    className="inline-flex h-10 items-center rounded-2xl bg-[var(--app-primary)] px-4 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:bg-[var(--app-primary-hover)]"
                  >
                    Resume cycle
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1">{children}</main>
        </div>
    </div>
  );
}

function getNextCycle() {
  return [...settlementCycles].sort((a, b) => priorityRank(a) - priorityRank(b))[0];
}

function priorityRank(cycle: (typeof settlementCycles)[number]) {
  if (cycle.priority === "Critical") return 0;
  if (cycle.priority === "High") return 1;
  return 2;
}

function getRouteMeta(pathname: string) {
  if (pathname.startsWith("/settlement-cycles/") && pathname !== "/settlement-cycles") {
    return {
      breadcrumb: "Cycle Detail",
      title: "Cycle Detail",
      description: "Review status, evidence, and the exact next action for one settlement cycle.",
    };
  }

  if (pathname === "/settlement-cycles") {
    return {
      breadcrumb: "Settlement Cycles",
      title: "Settlement Cycles",
      description: "Triage all active cycles by status, direction, and next required action.",
    };
  }

  return {
    breadcrumb: "Dashboard",
    title: "Dashboard",
    description: "Operational command center for open cycles, reserve capacity, and exceptions.",
  };
}
