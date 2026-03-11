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
      <div className="flex min-h-[calc(100vh-1.5rem)] w-full gap-3 rounded-[28px] border border-white/70 bg-[#f4f4f1] p-3 shadow-[0_24px_80px_rgba(15,23,42,0.06)] lg:p-3.5">
        <aside className="hidden w-[248px] shrink-0 rounded-[24px] border border-[#e8e7e2] bg-[#f8f7f3] p-3.5 lg:flex lg:flex-col">
          <div className="mb-5 px-1.5 py-1">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Treasury workspace</p>
              <h1 className="text-[24px] font-semibold tracking-[-0.04em] text-slate-950">AtomicPost</h1>
            </div>
          </div>

          <div className="mb-5 rounded-[18px] border border-[#e8e7e2] bg-white px-3 py-3 shadow-[0_1px_0_rgba(255,255,255,0.9)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-950">Treasury Ops Desk</p>
                <p className="mt-0.5 text-xs text-slate-500">Settlement manager workspace</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div className="mb-2 px-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">MVP navigation</p>
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
                      ? "bg-white text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.05)] ring-1 ring-[#ece7de]"
                      : "text-slate-500 hover:bg-white hover:text-slate-950",
                  )}
                >
                  <Icon className={cn("h-4 w-4", active ? "text-[#f28c28]" : "text-slate-400")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 rounded-[18px] border border-[#e8e7e2] bg-[#fff9f2] p-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9b6a37]">Resume next cycle</p>
            <p className="mt-2 text-sm font-medium text-slate-950">{nextCycle.id}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{nextCycle.nextAction} for {nextCycle.counterparty}</p>
            <Link
              href={`/settlement-cycles/${nextCycle.slug}`}
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#ead9c5] bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-[#fffdf9] hover:text-slate-950"
            >
              <CornerDownRight className="h-4 w-4 text-[#c26a18]" />
              Open blocked cycle
            </Link>
          </div>

          <div className="mt-auto rounded-[20px] border border-[#e8e8e7] bg-white p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f3f3f2] text-slate-500">
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
          <header className="rounded-[24px] border border-[#e8e7e2] bg-[#fcfcf9] px-4 py-3 md:px-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  <span>AtomicPost</span>
                  <span>/</span>
                  <span>Stablecoin Settlement</span>
                  <span>/</span>
                  <span className="text-slate-500">{routeMeta.breadcrumb}</span>
                </div>
                <div className="mt-2 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
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
                            ? "border-[#e7d8c4] bg-white text-slate-950"
                            : "border-[#e8e8e7] bg-[#f7f7f4] text-slate-600 hover:bg-white hover:text-slate-950",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="relative w-full xl:max-w-xs">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input className="h-10 rounded-2xl border-[#e8e7e2] bg-white pl-9 shadow-none" placeholder="Search cycles, IDs or counterparties" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-2xl border border-[#e8e7e2] bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    PoC live
                  </div>
                  <Link
                    href={`/settlement-cycles/${nextCycle.slug}`}
                    className="inline-flex h-10 items-center rounded-2xl bg-[#f28c28] px-4 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:bg-[#df7f20]"
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
