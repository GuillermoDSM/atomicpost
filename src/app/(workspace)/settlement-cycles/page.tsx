import Link from "next/link";
import { ArrowRight, CircleAlert, Filter, Search, SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { settlementCycles } from "@/lib/settlement-cycles";

const statusTone = {
  Pending_Settlement: "bg-[var(--app-warning-soft)] text-[var(--app-warning-text)]",
  In_Transit: "bg-[var(--app-primary-soft)] text-[var(--app-primary-text)]",
  Received: "bg-[var(--app-success-soft)] text-[var(--app-success-text)]",
  Partial_Received: "bg-[var(--app-warning-soft)] text-[var(--app-warning-text)]",
  Settled: "bg-[var(--app-success-soft)] text-[var(--app-success-text)]",
  Reconciled: "bg-[var(--app-success-soft)] text-[var(--app-success-text)]",
  Exception: "bg-[var(--app-danger-soft)] text-[var(--app-danger-text)]",
};

const directionTone = {
  Payable: "bg-[var(--app-warning-soft)] text-[var(--app-warning-text)]",
  Receivable: "bg-[var(--app-primary-soft)] text-[var(--app-primary-text)]",
};

const summary = {
  total: settlementCycles.length,
  exceptions: settlementCycles.filter((cycle) => cycle.hasException).length,
  highPriority: settlementCycles.filter((cycle) => cycle.priority !== "Normal").length,
};

export default function SettlementCyclesPage() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-[20px] border border-[var(--app-border)] bg-[var(--app-panel)] px-4 py-3 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--app-panel-strong)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
            Master list
          </span>
          <span>{summary.total} active cycles</span>
          <span className="text-slate-300">/</span>
          <span>{summary.highPriority} high-priority</span>
          <span className="text-slate-300">/</span>
          <span>{summary.exceptions} with exceptions</span>
        </div>
        <p className="max-w-2xl text-sm text-slate-500">
          Use this screen to filter, scan, and open any cycle. The dashboard handles priority routing; this page stays list-first.
        </p>
      </div>

      <Card className="rounded-[20px] border-[var(--app-border)] bg-[var(--app-panel)] shadow-none">
        <CardHeader className="flex flex-col gap-3 pb-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-[1.45rem] font-semibold tracking-[-0.04em] text-slate-950">Cycle list</CardTitle>
            <CardDescription className="mt-1 text-sm text-slate-500">
              Dense enough for triage, with next action visible on every row.
            </CardDescription>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input className="h-10 rounded-2xl border-[var(--app-border)] bg-[var(--app-panel)] pl-9 shadow-none" placeholder="Search cycles or counterparties" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                "All statuses",
                "Payable",
                "Receivable",
                "Exceptions only",
              ].map((filter) => (
                <button
                  key={filter}
                  className="inline-flex h-10 items-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel-muted)] px-4 text-sm text-slate-600 transition hover:bg-[var(--app-panel)] hover:text-slate-950"
                >
                  {filter}
                </button>
              ))}
              <button className="inline-flex h-10 items-center gap-2 rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] px-4 text-sm text-slate-600 transition hover:bg-[var(--app-panel-muted)] hover:text-slate-950">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="hidden grid-cols-[1.1fr_0.9fr_0.7fr_0.9fr_0.95fr_1.2fr_auto] gap-4 rounded-[16px] bg-[var(--app-panel-strong)] px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 lg:grid">
            <span>Cycle</span>
            <span>Counterparty</span>
            <span>Amount</span>
            <span>Direction</span>
            <span>Status</span>
            <span>Next action</span>
            <span className="text-right">Open</span>
          </div>

          {settlementCycles.map((cycle) => (
            <div
              key={cycle.id}
              className="grid gap-4 rounded-[18px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] p-4 transition hover:border-[var(--app-border-strong)] hover:bg-[var(--app-panel)] lg:grid-cols-[1.1fr_0.9fr_0.7fr_0.9fr_0.95fr_1.2fr_auto] lg:items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-slate-950">{cycle.id}</p>
                  {cycle.hasException ? <CircleAlert className="h-4 w-4 text-[var(--app-danger-text)]" /> : null}
                  {cycle.priority !== "Normal" ? (
                    <span className="rounded-full bg-[var(--app-warning-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--app-warning-text)]">
                      {cycle.priority}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-slate-500">Updated {cycle.lastUpdated}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-950">{cycle.counterparty}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{cycle.counterpartyId}</p>
              </div>

              <div>
                <p className="text-lg font-semibold tracking-[-0.04em] text-slate-950">{cycle.amount}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{cycle.currency}</p>
              </div>

              <div>
                <Badge className={`rounded-full px-3 py-1 ${directionTone[cycle.direction]}`}>{cycle.direction}</Badge>
              </div>

              <div>
                <Badge className={`rounded-full px-3 py-1 ${statusTone[cycle.status]}`}>{cycle.status}</Badge>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-950">{cycle.nextAction}</p>
                <p className="mt-1 text-sm text-slate-500">{cycle.actionReason}</p>
              </div>

              <div className="flex justify-end">
                <Link
                  href={`/settlement-cycles/${cycle.slug}`}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] px-3 text-sm font-medium text-slate-700 transition hover:bg-[var(--app-panel-muted)] hover:text-slate-950"
                >
                  Open cycle
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between rounded-[20px] border border-[var(--app-border)] bg-[var(--app-panel)] px-4 py-3 text-sm text-slate-500">
        <div className="inline-flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Settlement cycles remain the searchable triage workspace for the current period.
        </div>
        <span>{settlementCycles.length} rows</span>
      </div>
    </div>
  );
}
