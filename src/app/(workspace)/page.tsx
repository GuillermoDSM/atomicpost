import Link from "next/link";
import { AlertTriangle, ArrowRight, Clock3, Layers3, ShieldCheck, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reserveSnapshot, settlementCycles } from "@/lib/settlement-cycles";

const directionTone = {
  Payable: "bg-[#fff1e3] text-[#c26a18]",
  Receivable: "bg-[#eef3ff] text-[#4d6dd1]",
};

const statusTone = {
  Pending_Settlement: "bg-[#fff6eb] text-[#b76a1c]",
  In_Transit: "bg-[#eef3ff] text-[#4d6dd1]",
  Received: "bg-[#eef7ee] text-[#4f7a3f]",
  Partial_Received: "bg-[#fff1e3] text-[#c26a18]",
  Settled: "bg-[#eef7ee] text-[#4f7a3f]",
  Reconciled: "bg-[#eef7ee] text-[#4f7a3f]",
  Exception: "bg-[#fbeaea] text-[#b04b4b]",
};

const checkTone = {
  ok: "bg-[#eef7ee] text-[#4f7a3f]",
  warning: "bg-[#fff6eb] text-[#b76a1c]",
  blocked: "bg-[#fbeaea] text-[#b04b4b]",
};

const priorityQueue = [...settlementCycles].sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority));

const recentlyUpdated = settlementCycles.slice(0, 3);

const recentActivity = [...settlementCycles]
  .map((cycle) => ({
    id: cycle.id,
    slug: cycle.slug,
    event: cycle.recentEvent,
    time: cycle.lastUpdated,
  }))
  .slice(0, 4);

const summary = {
  open: settlementCycles.length,
  payables: settlementCycles.filter((cycle) => cycle.direction === "Payable").length,
  receivables: settlementCycles.filter((cycle) => cycle.direction === "Receivable").length,
  exceptions: settlementCycles.filter((cycle) => cycle.hasException).length,
  capacity: reserveSnapshot.availableCapacity,
};

export default function DashboardPage() {
  return (
    <div className="space-y-3">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Open cycles", String(summary.open), "Cycles still in active settlement flow"],
          ["Payables", String(summary.payables), "Outbound obligations needing treasury action"],
          ["Receivables", String(summary.receivables), "Inbound obligations being monitored"],
          ["Exceptions", String(summary.exceptions), "Cycles blocked by validation or reconciliation"],
          ["Available capacity", summary.capacity, "Issuance headroom remaining against confirmed backing"],
        ].map(([label, value, detail]) => (
          <Card key={label} className="rounded-[20px] border-[#e8e7e2] bg-white shadow-none">
            <CardContent className="px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
              <p className="mt-2 text-[1.65rem] font-semibold tracking-[-0.05em] text-slate-950">{value}</p>
              <p className="mt-1 text-sm leading-5 text-slate-500">{detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.5fr_0.95fr]">
        <Card className="rounded-[20px] border-[#e8e7e2] bg-white shadow-none">
          <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
            <div>
              <CardTitle className="text-[1.45rem] font-semibold tracking-[-0.04em] text-slate-950">Priority queue</CardTitle>
              <CardDescription className="mt-1 text-sm text-slate-500">
                Open the next blocked or pending cycle fast. Reason, checks, and next action stay visible.
              </CardDescription>
            </div>
            <Link
              href="/settlement-cycles"
              className="inline-flex h-9 items-center rounded-2xl border border-[#e8e7e2] bg-[#fcfcf9] px-3 text-sm text-slate-700 transition hover:bg-white hover:text-slate-950"
            >
              View all cycles
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorityQueue.map((cycle) => (
              <div key={cycle.id} className="rounded-[18px] border border-[#ece9e4] bg-[#fcfcf9] p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-950">{cycle.id}</p>
                      <Badge className={`rounded-full px-2.5 py-1 text-xs ${directionTone[cycle.direction]}`}>{cycle.direction}</Badge>
                      <Badge className={`rounded-full px-2.5 py-1 text-xs ${statusTone[cycle.status]}`}>{cycle.status}</Badge>
                      {cycle.priority === "Critical" ? (
                        <Badge className="rounded-full bg-[#fbeaea] px-2.5 py-1 text-xs text-[#b04b4b]">Critical</Badge>
                      ) : null}
                    </div>
                    <div className="mt-2 grid gap-2 xl:grid-cols-[1.1fr_0.9fr]">
                      <div>
                        <p className="text-lg font-semibold tracking-[-0.04em] text-slate-950">{cycle.counterparty} · {cycle.amount}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{cycle.actionReason}</p>
                      </div>
                      <div className="rounded-[16px] border border-[#ece9e4] bg-white px-3 py-3 text-sm text-slate-600">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Next action</p>
                        <p className="mt-1 font-medium text-slate-950">{cycle.nextAction}</p>
                        <p className="mt-1 text-xs text-slate-500">Control ref {cycle.treasuryApprovalId}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cycle.blockingChecks.map((check) => (
                        <span key={check.label} className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${checkTone[check.status]}`}>
                          {check.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 lg:ml-4 lg:flex-col lg:items-end">
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Updated</p>
                      <p className="mt-1 text-sm font-medium text-slate-950">{cycle.lastUpdated}</p>
                    </div>
                    <Link
                      href={`/settlement-cycles/${cycle.slug}`}
                      className="inline-flex h-10 items-center gap-2 rounded-2xl bg-[#f28c28] px-4 text-sm font-medium text-white transition hover:bg-[#df7f20]"
                    >
                      Open cycle
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-3">
          <Card className="rounded-[20px] border-[#e8e7e2] bg-white shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-[#c26a18]">
                <Wallet className="h-4 w-4" />
                <CardTitle className="text-[1.35rem] font-semibold tracking-[-0.04em] text-slate-950">Reserve snapshot</CardTitle>
              </div>
              <CardDescription className="text-sm text-slate-500">Confirmed backing, issued supply, and current issuance headroom.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              {[
                ["Confirmed USD backing", reserveSnapshot.confirmedUsdBacking],
                ["Issued USD-ST supply", reserveSnapshot.issuedSupply],
                ["Available capacity", reserveSnapshot.availableCapacity],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-[16px] border border-[#ece9e4] bg-[#fcfcf9] px-3 py-3">
                  <span>{label}</span>
                  <span className="font-medium text-slate-950">{value}</span>
                </div>
              ))}
              <div className="rounded-[16px] border border-[#ece9e4] bg-[#fcfcf9] p-3">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Utilization</span>
                  <span className="font-medium text-slate-950">{reserveSnapshot.utilization}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-[#efede8]">
                  <div className="h-2.5 rounded-full bg-[#f28c28]" style={{ width: `${reserveSnapshot.utilization}%` }} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{reserveSnapshot.alert}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[20px] border-[#e8e7e2] bg-white shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-[#b04b4b]">
                <AlertTriangle className="h-4 w-4" />
                <CardTitle className="text-[1.35rem] font-semibold tracking-[-0.04em] text-slate-950">Exceptions requiring action</CardTitle>
              </div>
              <CardDescription className="text-sm text-slate-500">Keep blockers visible without turning the dashboard into a dense table.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {priorityQueue.filter((cycle) => cycle.hasException).map((cycle) => (
                <Link
                  key={cycle.id}
                  href={`/settlement-cycles/${cycle.slug}`}
                  className="block rounded-[16px] border border-[#f0dddd] bg-[#fff7f7] px-3 py-3 transition hover:border-[#e8caca]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-950">{cycle.id}</p>
                    <span className="text-xs font-medium text-[#b04b4b]">{cycle.nextAction}</span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{cycle.actionReason}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-[20px] border-[#e8e7e2] bg-white shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock3 className="h-4 w-4" />
              <CardTitle className="text-[1.35rem] font-semibold tracking-[-0.04em] text-slate-950">Recent activity</CardTitle>
            </div>
            <CardDescription className="text-sm text-slate-500">Latest updates across active settlement cycles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivity.map((item) => (
              <Link
                key={item.id}
                href={`/settlement-cycles/${item.slug}`}
                className="flex items-start justify-between gap-3 rounded-[16px] border border-[#ece9e4] bg-[#fcfcf9] px-3 py-3 transition hover:bg-white"
              >
                <div>
                  <p className="text-sm font-medium text-slate-950">{item.id}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.event}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-500">{item.time}</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[20px] border-[#e8e7e2] bg-white shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-slate-500">
              <Layers3 className="h-4 w-4" />
              <CardTitle className="text-[1.35rem] font-semibold tracking-[-0.04em] text-slate-950">Recently updated cycles</CardTitle>
            </div>
            <CardDescription className="text-sm text-slate-500">Quick access to active cycles that are moving through settlement or close.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentlyUpdated.map((cycle) => (
              <Link
                key={cycle.id}
                href={`/settlement-cycles/${cycle.slug}`}
                className="flex items-center justify-between gap-3 rounded-[16px] border border-[#ece9e4] bg-[#fcfcf9] px-3 py-3 transition hover:bg-white"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-slate-950">{cycle.id}</p>
                    <Badge className={`rounded-full px-2.5 py-1 text-xs ${statusTone[cycle.status]}`}>{cycle.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{cycle.counterparty} · {cycle.nextAction}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-950">{cycle.amount}</p>
                  <p className="mt-1 text-xs text-slate-500">{cycle.lastUpdated}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[20px] border-[#e8e7e2] bg-white shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-slate-500">
              <ShieldCheck className="h-4 w-4" />
              <CardTitle className="text-[1.35rem] font-semibold tracking-[-0.04em] text-slate-950">Operational checks</CardTitle>
            </div>
            <CardDescription className="text-sm text-slate-500">Keep core treasury controls visible before issuance, payment, reconciliation, and close.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 md:grid-cols-2">
            {[
              "Every active cycle keeps next action visible next to status.",
              "Blocking rules surface as checks instead of hidden detail tabs.",
              "Reserve capacity stays visible before any payable execution.",
              "Exceptions route directly into the relevant cycle detail workspace.",
            ].map((item) => (
              <div key={item} className="rounded-[16px] border border-[#ece9e4] bg-[#fcfcf9] px-3 py-3 text-sm leading-6 text-slate-600">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[20px] border-[#e8e7e2] bg-white shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-[1.35rem] font-semibold tracking-[-0.04em] text-slate-950">Resume next blocked cycle</CardTitle>
            <CardDescription className="text-sm text-slate-500">A single jump keeps the command center action-first.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/settlement-cycles/${priorityQueue[0].slug}`}
              className="block rounded-[18px] border border-[#ead9c5] bg-[#fff8ee] p-4 transition hover:bg-[#fffdf9]"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#9b6a37]">Highest priority</p>
              <p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-slate-950">{priorityQueue[0].id}</p>
              <p className="mt-1 text-sm text-slate-600">{priorityQueue[0].nextAction} · {priorityQueue[0].counterparty}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#c26a18]">
                Open cycle detail
                <ArrowRight className="h-4 w-4" />
              </p>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function priorityRank(priority: (typeof settlementCycles)[number]["priority"]) {
  if (priority === "Critical") return 0;
  if (priority === "High") return 1;
  return 2;
}
