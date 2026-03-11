# UX Sitemap and Wireframes

## Sitemap

### MVP Navigation

- `Dashboard`
- `Settlement Cycles`
- `Cycle Detail`

### Navigation Logic

- `Dashboard` is the operational entry point.
- `Settlement Cycles` is the main triage list.
- `Cycle Detail` is the core workspace where almost all operational work happens.

### Consolidation Decision

For the MVP, these are not separate screens:

- `Reserve & Issuance`
- `Inbound Monitoring`
- `Outbound Payments`
- `Reconciliation`
- `Exceptions`
- `Audit Trail`

They should live inside `Cycle Detail` as sections, blocks, or contextual drawers.

`Reports` can remain a future or secondary view, but it is not part of the core MVP architecture.

## Screen Inventory

### 1. Dashboard

Purpose:

- Immediate operational awareness.

Core modules:

- Open cycles summary
- Obligations by direction: `Receivable` / `Payable`
- Reserve capacity snapshot
- Cycles awaiting action
- Exceptions requiring attention
- Recently updated cycles

Primary actions:

- Open cycle
- Jump to triage list
- Resume the next blocked or pending cycle

### 2. Settlement Cycles

Purpose:

- Master list of all settlement cycles.

Default columns:

- `ClearingCycleID`
- Counterparty
- Amount
- Currency
- Direction
- Current status
- Last updated
- Next required action

Filters:

- Status
- Direction
- Counterparty
- Date range
- With exceptions only

Primary action:

- Open `Cycle Detail`

### 3. Cycle Detail

Purpose:

- Central workspace for one settlement cycle.

Core sections:

- Header summary
- Status and next action panel
- Cycle timeline
- Obligation details
- Issuance section
- Settlement section
- Reconciliation section
- Exceptions section
- Redemption and close section
- Technical evidence drawer
- Audit snapshot

Primary actions depend on state:

- Create issuance authorization
- Issue `USD-ST`
- Send settlement notification
- Prepare or confirm payment
- Confirm partial settlement
- Reconcile transaction
- Resolve exception
- Record redemption
- Close cycle

## Wireframes

### Core Screens

1. `Dashboard`
2. `Settlement Cycles List`
3. `Cycle Detail`

### Shared Layout Pattern

- Top bar: product title, search, current user, quick controls
- Left nav: only MVP sections
- Main content: current workspace
- Right-side drawer: technical evidence, memo payloads, audit detail

---

## 1. Dashboard

```text
+----------------------------------------------------------------------------------+
| Treasury Settlement Platform                           Search      User  Time    |
+----------------------------------------------------------------------------------+
| Dashboard | Cycles                                                             |
+----------------------------------------------------------------------------------+
| KPI: Open Cycles | KPI: Payables | KPI: Receivables | KPI: Exceptions | KPI: Cap |
+----------------------------------------------------------------------------------+
| Priority Queue                                                                  |
| [CYCLE_2026-02-05] Payable      Next: Issue USD-ST           Amount: 120,000     |
| [CYCLE_2026-02-06] Receivable   Next: Await Payment          Amount: 84,500      |
| [CYCLE_2026-02-07] Exception    Next: Review Missing Memo    Amount: 63,200      |
+--------------------------------------+-------------------------------------------+
| Reserve Snapshot                     | Recent Activity                           |
| Confirmed USD backing                | Cycle created                             |
| Outstanding USD-ST supply            | Payment settled                           |
| Available issuance capacity          | Reconciliation completed                  |
| Utilization %                        | Redemption recorded                       |
+--------------------------------------+-------------------------------------------+
| Exceptions Requiring Action                                                      |
| Missing memo | Amount mismatch | Duplicate tx | Partial undeclared               |
+----------------------------------------------------------------------------------+
```

Notes:

- Every row in the priority queue should include a visible `Next action`.
- This page should feel like a command center, not a reporting dashboard.
- The goal is to route the user into the right cycle quickly.

---

## 2. Settlement Cycles List

```text
+----------------------------------------------------------------------------------+
| Settlement Cycles                                                                |
+----------------------------------------------------------------------------------+
| Search [____________]  Status [All v] Direction [All v] Counterparty [All v]    |
| Date [____] to [____]  Exceptions only [ ]                                       |
+----------------------------------------------------------------------------------+
| ClearingCycleID | Counterparty | Amount   | Dir.       | Status    | Next Action |
|----------------------------------------------------------------------------------|
| CYCLE_0205      | Operator A   | 120,000  | Payable    | Pending   | Issue USD-ST|
| CYCLE_0206      | Operator B   | 84,500   | Receivable | In_Transit| Await funds |
| CYCLE_0207      | Operator C   | 63,200   | Payable    | Exception | Review memo |
| CYCLE_0208      | Operator A   | 22,100   | Payable    | Settled   | Reconcile   |
| CYCLE_0209      | Operator B   | 40,900   | Receivable | Received  | Reconcile   |
+----------------------------------------------------------------------------------+
| Rows clickable -> opens Cycle Detail                                             |
+----------------------------------------------------------------------------------+
```

Notes:

- `Next action` is as important as status.
- Dense tables are acceptable here because this is the triage screen.
- The list should never replace the detail workflow; it only helps pick the right cycle.

---

## 3. Cycle Detail

```text
+----------------------------------------------------------------------------------+
| CYCLE_2026-02-05                                     Payable   Pending_Settlement |
| Counterparty: Operator A                             Amount: 120,000 USD-ST       |
| Last updated: 10 Mar 2026, 14:12                                                  |
+----------------------------------------------------------------------------------+
| Next Action Panel                                                              X |
| Action required: Issue USD-ST                                                    |
| Why: Cycle is payable and no issued balance is linked to this obligation          |
| Blocking checks: Authorization active [yes] | Capacity available [yes]            |
| Primary CTA: [Issue USD-ST]    Secondary CTA: [View details]                      |
+------------------------------------------+---------------------------------------+
| Timeline                                 | Obligation Details                    |
| 1. Clearing agreed                       | ClearingCycleID                       |
| 2. Settlement record created             | CounterpartyID                        |
| 3. Direction set: Payable                | Amount / Currency                     |
| 4. Authorization created                 | Direction                             |
| 5. Issuance pending                      | Current status                        |
+------------------------------------------+---------------------------------------+
| Issuance Section                         | Settlement Section                    |
| Auth ID                                  | PaymentInstructionID                  |
| Amount issued                            | Amount                                |
| Control reference                        | PartialPaymentFlag                    |
| XRPL tx hash                             | XRPL tx hash                          |
+------------------------------------------+---------------------------------------+
| Reconciliation Section                   | Redemption / Close                    |
| Match status                             | Redeemed amount                       |
| Match evidence                           | Outstanding supply after redemption   |
| Exception link if needed                 | Close checklist                       |
+----------------------------------------------------------------------------------+
| Technical Evidence Drawer (collapsed by default)                                  |
| Wallets | Memo payload | Hashes | Audit log excerpt                               |
+----------------------------------------------------------------------------------+
```

Notes:

- `Next Action Panel` should always stay above the fold.
- `Cycle Detail` replaces several separate modules by grouping actions into sections.
- `Settled`, `Reconciled`, and `Closed` must be visually distinct.
- Technical evidence should be accessible but secondary.

## Shared Components

### Next Action Panel

Used in:

- `Dashboard`
- `Cycle Detail`

Must contain:

- current action needed
- reason the action is needed
- blocking checks
- primary CTA

### Timeline

Used in:

- `Cycle Detail`

Must contain:

- state changes
- transaction milestones
- timestamps
- exception markers

### Technical Evidence Drawer

Used in:

- `Cycle Detail`

Must contain:

- wallet addresses
- XRPL tx hashes
- memo payloads
- audit snippets

### Embedded Action Blocks

Used in:

- `Cycle Detail`

Examples:

- issuance block
- inbound monitoring block
- outbound payment block
- reconciliation block
- exception block
- redemption and close block
