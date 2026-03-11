import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleDot, Clock3, FileText, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSettlementCycle } from "@/lib/settlement-cycles";

const toneByDirection = {
  Payable: "bg-[var(--app-warning-soft)] text-[var(--app-warning-text)]",
  Receivable: "bg-[var(--app-primary-soft)] text-[var(--app-primary-text)]",
};

const toneByStatus = {
  Pending_Settlement: "bg-[var(--app-warning-soft)] text-[var(--app-warning-text)]",
  In_Transit: "bg-[var(--app-primary-soft)] text-[var(--app-primary-text)]",
  Received: "bg-[var(--app-success-soft)] text-[var(--app-success-text)]",
  Partial_Received: "bg-[var(--app-warning-soft)] text-[var(--app-warning-text)]",
  Settled: "bg-[var(--app-success-soft)] text-[var(--app-success-text)]",
  Reconciled: "bg-[var(--app-success-soft)] text-[var(--app-success-text)]",
  Exception: "bg-[var(--app-danger-soft)] text-[var(--app-danger-text)]",
};

export default async function SettlementCycleDetailPage({
  params,
}: {
  params: Promise<{ cycleId: string }>;
}) {
  const { cycleId } = await params;
  const cycle = getSettlementCycle(cycleId);

  if (!cycle) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/settlement-cycles" className="inline-flex items-center gap-2 rounded-full px-2 py-1 hover:bg-white">
          <ArrowLeft className="h-4 w-4" />
          Back to cycles
        </Link>
      </div>

      <Card className="rounded-[22px] border-[var(--app-border)] bg-[var(--app-panel)] shadow-none">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`rounded-full px-3 py-1 ${toneByDirection[cycle.direction]}`}>{cycle.direction}</Badge>
              <Badge className={`rounded-full px-3 py-1 ${toneByStatus[cycle.status]}`}>{cycle.status}</Badge>
            </div>
            <div>
              <CardTitle className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">{cycle.id}</CardTitle>
              <CardDescription className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
                {cycle.counterparty} · {cycle.amount} {cycle.currency} · {cycle.note}
              </CardDescription>
            </div>
          </div>

          <div className="rounded-[20px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] p-4 text-sm text-slate-600">
            <div className="mb-3 flex items-center gap-2 text-slate-500">
              <Clock3 className="h-4 w-4" />
              Next action
            </div>
            <p className="text-lg font-medium text-slate-950">{cycle.nextAction}</p>
            <Button className="mt-4 h-10 rounded-2xl bg-[var(--app-primary)] text-white hover:bg-[var(--app-primary-hover)]">
              Continue workflow
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <Card className="rounded-[22px] border-[var(--app-border)] bg-[var(--app-panel)] shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Cycle timeline</CardTitle>
            <CardDescription className="text-slate-500">The detail view absorbs issuance, settlement, reconciliation, exceptions, and close actions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {[
              ["Clearing agreed", "Approved package received and recorded."],
              ["Direction set", `${cycle.direction} workflow activated for this cycle.`],
              ["Settlement action", cycle.nextAction],
              ["Reconciliation state", cycle.status === "Settled" || cycle.status === "Reconciled" ? "Ready for deterministic matching." : "Awaiting settlement progression."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-[18px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-950">
                  <CircleDot className="h-4 w-4 text-[var(--app-primary-text)]" />
                  {title}
                </div>
                <p className="text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="rounded-[22px] border-[var(--app-border)] bg-[var(--app-panel)] shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Operational summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-[18px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] px-4 py-3">
                <span>Counterparty</span>
                <span className="font-medium text-slate-950">{cycle.counterparty}</span>
              </div>
              <div className="flex items-center justify-between rounded-[18px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] px-4 py-3">
                <span>Amount</span>
                <span className="font-medium text-slate-950">{cycle.amount}</span>
              </div>
              <div className="flex items-center justify-between rounded-[18px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] px-4 py-3">
                <span>Last updated</span>
                <span className="font-medium text-slate-950">{cycle.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[22px] border-[var(--app-border)] bg-[var(--app-panel)] shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Evidence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="rounded-[18px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-950">
                  <Wallet className="h-4 w-4 text-[var(--app-primary-text)]" />
                  Wallet references
                </div>
                Treasury wallet, operator wallet, and trustline summary live here.
              </div>
              <div className="rounded-[18px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-950">
                  <FileText className="h-4 w-4 text-[var(--app-primary-text)]" />
                  Memo and audit data
                </div>
                Memo payload, transaction hashes, and action log appear as contextual evidence.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
