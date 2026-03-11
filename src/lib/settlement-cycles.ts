export type SettlementDirection = "Payable" | "Receivable";
export type SettlementStatus =
  | "Pending_Settlement"
  | "In_Transit"
  | "Received"
  | "Partial_Received"
  | "Settled"
  | "Reconciled"
  | "Exception";

export type CheckStatus = "ok" | "warning" | "blocked";

export type OperationalCheck = {
  label: string;
  status: CheckStatus;
};

export type CyclePriority = "Critical" | "High" | "Normal";

export type SettlementCycle = {
  id: string;
  slug: string;
  counterparty: string;
  counterpartyId: string;
  amount: string;
  amountValue: number;
  currency: string;
  direction: SettlementDirection;
  status: SettlementStatus;
  lastUpdated: string;
  nextAction: string;
  actionReason: string;
  priority: CyclePriority;
  treasuryApprovalId: string;
  paymentInstructionId?: string;
  issuanceAuthorizationId?: string;
  settlementUpdatedAt: string;
  blockingChecks: OperationalCheck[];
  recentEvent: string;
  hasException: boolean;
  note: string;
};

export const reserveSnapshot = {
  confirmedUsdBacking: "$2,400,000",
  issuedSupply: "$1,860,000",
  availableCapacity: "$540,000",
  utilization: 78,
  alert: "Capacity is available for the next payable cycle. No trustline headroom alert is active.",
};

export const settlementCycles: SettlementCycle[] = [
  {
    id: "CYCLE_2026-02-05",
    slug: "cycle-2026-02-05",
    counterparty: "Operator A",
    counterpartyId: "OP-A",
    amount: "$120,000",
    amountValue: 120000,
    currency: "USD-ST",
    direction: "Payable",
    status: "Pending_Settlement",
    lastUpdated: "10 Mar 2026, 14:12",
    nextAction: "Issue USD-ST",
    actionReason: "Cycle is payable and no issued balance is linked to this obligation yet.",
    priority: "High",
    treasuryApprovalId: "TA-20341",
    paymentInstructionId: "PI-88014",
    issuanceAuthorizationId: "AUTH-1450",
    settlementUpdatedAt: "14:12",
    blockingChecks: [
      { label: "Authorization active", status: "ok" },
      { label: "Capacity available", status: "ok" },
      { label: "Trustline ready", status: "ok" },
    ],
    recentEvent: "Authorization confirmed for outbound issuance.",
    hasException: false,
    note: "Authorization is active and reserve capacity is available.",
  },
  {
    id: "CYCLE_2026-02-06",
    slug: "cycle-2026-02-06",
    counterparty: "Operator B",
    counterpartyId: "OP-B",
    amount: "$84,500",
    amountValue: 84500,
    currency: "USD-ST",
    direction: "Receivable",
    status: "In_Transit",
    lastUpdated: "10 Mar 2026, 12:48",
    nextAction: "Await payment",
    actionReason: "Counterparty has been notified and the inbound transfer is still awaiting ledger finality.",
    priority: "Normal",
    treasuryApprovalId: "TA-20329",
    paymentInstructionId: "PI-87963",
    settlementUpdatedAt: "12:48",
    blockingChecks: [
      { label: "Notification sent", status: "ok" },
      { label: "Ledger finality", status: "warning" },
    ],
    recentEvent: "Inbound transfer detected and moved to in-transit monitoring.",
    hasException: false,
    note: "Counterparty notified. Payment reference received but not final yet.",
  },
  {
    id: "CYCLE_2026-02-07",
    slug: "cycle-2026-02-07",
    counterparty: "Operator C",
    counterpartyId: "OP-C",
    amount: "$63,200",
    amountValue: 63200,
    currency: "USD-ST",
    direction: "Payable",
    status: "Exception",
    lastUpdated: "10 Mar 2026, 11:21",
    nextAction: "Review missing memo",
    actionReason: "Submitted payment exists on-chain but reconciliation is blocked by incomplete memo fields.",
    priority: "Critical",
    treasuryApprovalId: "TA-20310",
    paymentInstructionId: "PI-87911",
    issuanceAuthorizationId: "AUTH-1438",
    settlementUpdatedAt: "11:21",
    blockingChecks: [
      { label: "Memo payload", status: "blocked" },
      { label: "Duplicate check", status: "ok" },
      { label: "Amount match", status: "ok" },
    ],
    recentEvent: "Exception raised after memo validation failed.",
    hasException: true,
    note: "Submitted payment detected but required memo fields are incomplete.",
  },
  {
    id: "CYCLE_2026-02-08",
    slug: "cycle-2026-02-08",
    counterparty: "Operator A",
    counterpartyId: "OP-A",
    amount: "$22,100",
    amountValue: 22100,
    currency: "USD-ST",
    direction: "Payable",
    status: "Settled",
    lastUpdated: "10 Mar 2026, 10:04",
    nextAction: "Reconcile",
    actionReason: "Ledger finality is confirmed and the cycle now needs deterministic matching.",
    priority: "High",
    treasuryApprovalId: "TA-20288",
    paymentInstructionId: "PI-87840",
    issuanceAuthorizationId: "AUTH-1426",
    settlementUpdatedAt: "10:04",
    blockingChecks: [
      { label: "Ledger finality", status: "ok" },
      { label: "Memo validation", status: "warning" },
    ],
    recentEvent: "Payment settled on XRPL and is queued for reconciliation.",
    hasException: false,
    note: "Ledger finality confirmed. Waiting for deterministic reconciliation.",
  },
  {
    id: "CYCLE_2026-02-09",
    slug: "cycle-2026-02-09",
    counterparty: "Operator D",
    counterpartyId: "OP-D",
    amount: "$40,900",
    amountValue: 40900,
    currency: "USD-ST",
    direction: "Receivable",
    status: "Received",
    lastUpdated: "09 Mar 2026, 18:32",
    nextAction: "Reconcile",
    actionReason: "Funds are credited, but the cycle still needs memo-linked reconciliation before closure.",
    priority: "Normal",
    treasuryApprovalId: "TA-20271",
    paymentInstructionId: "PI-87793",
    settlementUpdatedAt: "18:32",
    blockingChecks: [
      { label: "Funds received", status: "ok" },
      { label: "Memo validation", status: "warning" },
    ],
    recentEvent: "Inbound amount matched and moved to received state.",
    hasException: false,
    note: "Funds were credited and matched on amount, pending full memo validation.",
  },
  {
    id: "CYCLE_2026-02-10",
    slug: "cycle-2026-02-10",
    counterparty: "Operator E",
    counterpartyId: "OP-E",
    amount: "$96,300",
    amountValue: 96300,
    currency: "USD-ST",
    direction: "Payable",
    status: "Reconciled",
    lastUpdated: "09 Mar 2026, 15:07",
    nextAction: "Record redemption",
    actionReason: "Settlement is reconciled, but the cycle cannot close until issued tokens are redeemed.",
    priority: "High",
    treasuryApprovalId: "TA-20244",
    paymentInstructionId: "PI-87702",
    issuanceAuthorizationId: "AUTH-1402",
    settlementUpdatedAt: "15:07",
    blockingChecks: [
      { label: "Reconciliation complete", status: "ok" },
      { label: "Redemption recorded", status: "warning" },
    ],
    recentEvent: "Reconciliation completed; redemption remains outstanding.",
    hasException: false,
    note: "Settlement reconciled successfully. Issued tokens still need redemption closure.",
  },
];

export function getSettlementCycle(slug: string) {
  return settlementCycles.find((cycle) => cycle.slug === slug);
}
