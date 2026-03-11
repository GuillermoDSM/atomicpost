import Link from "next/link";
import { ArrowRight, CircleAlert, Filter, Search, SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { settlementCycles } from "@/lib/settlement-cycles";

const statusTone = {
  Pending_Settlement: "bg-[#fff6eb] text-[#b76a1c]",
  In_Transit: "bg-[#eef3ff] text-[#4d6dd1]",
  Received: "bg-[#eef7ee] text-[#4f7a3f]",
  Partial_Received: "bg-[#fff1e3] text-[#c26a18]",
  Settled: "bg-[#eef7ee] text-[#4f7a3f]",
  Reconciled: "bg-[#eef7ee] text-[#4f7a3f]",
  Exception: "bg-[#fbeaea] text-[#b04b4b]",
};

const directionTone = {
  Payable: "bg-[#fff1e3] text-[#c26a18]",
  Receivable: "bg-[#eef3ff] text-[#4d6dd1]",
};

const summary = {
  open: settlementCycles.length,
  payables: settlementCycles.filter((cycle) => cycle.direction === "Payable").length,
  receivables: settlementCycles.filter((cycle) => cycle.direction === "Receivable").length,
  exceptions: settlementCycles.filter((cycle) => cycle.hasException).length,
};

export default function SettlementCyclesPage() {
  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[22px] border-[#ebebea] bg-white shadow-none">
          <CardHeader className="space-y-3">
            <Badge className="w-fit rounded-full bg-[#fff1e3] px-3 py-1 text-[#c26a18]">Settlement workspace</Badge>
            <div>
              <CardTitle className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">Settlement Cycles</CardTitle>
              <CardDescription className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
                Use this list to triage active cycles quickly. Status, direction, amount, and next action stay visible so the right cycle gets opened first.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Open cycles", summary.open],
              ["Payables", summary.payables],
              ["Receivables", summary.receivables],
              ["Exceptions", summary.exceptions],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[18px] border border-[#efefee] bg-[#fbfbfa] p-4">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[22px] border-[#ebebea] bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Triage rules</CardTitle>
            <CardDescription className="text-slate-500">The list should answer what needs action now and why.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Keep next action as visible as current status.",
              "Let exceptions rise to the top without hiding the rest of the queue.",
              "Support quick filtering by direction, status, and counterparty.",
            ].map((item) => (
              <div key={item} className="rounded-[18px] border border-[#efefee] bg-[#fbfbfa] px-4 py-3 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-[22px] border-[#ebebea] bg-white shadow-none">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Cycle list</CardTitle>
            <CardDescription className="mt-1 text-slate-500">Dense enough for triage, but still oriented around action.</CardDescription>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input className="h-10 rounded-2xl border-[#e8e8e7] bg-white pl-9 shadow-none" placeholder="Search cycles or counterparties" />
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
                  className="inline-flex h-10 items-center rounded-2xl border border-[#e8e8e7] bg-[#fbfbfa] px-4 text-sm text-slate-600 transition hover:bg-white hover:text-slate-950"
                >
                  {filter}
                </button>
              ))}
              <button className="inline-flex h-10 items-center gap-2 rounded-2xl border border-[#e8e8e7] bg-white px-4 text-sm text-slate-600 transition hover:bg-[#fbfbfa] hover:text-slate-950">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="hidden grid-cols-[1.25fr_1fr_0.7fr_0.95fr_1fr_1.1fr_auto] gap-4 rounded-[18px] bg-[#f7f7f6] px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-400 lg:grid">
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
              className="grid gap-4 rounded-[20px] border border-[#efefee] bg-[#fcfcfb] p-4 transition hover:border-[#e4ddd5] hover:bg-white lg:grid-cols-[1.25fr_1fr_0.7fr_0.95fr_1fr_1.1fr_auto] lg:items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-slate-950">{cycle.id}</p>
                  {cycle.hasException ? <CircleAlert className="h-4 w-4 text-[#b04b4b]" /> : null}
                </div>
                <p className="mt-1 text-sm text-slate-500">Updated {cycle.lastUpdated}</p>
              </div>

              <div className="text-sm text-slate-700">{cycle.counterparty}</div>

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

              <div className="text-sm text-slate-700">{cycle.nextAction}</div>

              <div className="flex justify-end">
                <Link
                  href={`/settlement-cycles/${cycle.slug}`}
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-2xl border border-[#e8e8e7] bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-[#f6f6f5] hover:text-slate-950"
                >
                  Open cycle
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between rounded-[20px] border border-[#ebebea] bg-white px-4 py-3 text-sm text-slate-500">
        <div className="inline-flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Showing all active settlement cycles for the current working period.
        </div>
        <span>{settlementCycles.length} cycles</span>
      </div>
    </div>
  );
}
