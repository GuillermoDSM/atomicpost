<!--
========================================
PRD TEMPLATE STRUCTURE
========================================

SECTIONS:

1. Executive Summary
   - Explain what is being built, for whom, and why it matters. 1 short paragraph.

2. Context and Problem
   - Describe the current situation, pain points, and opportunity.1-3 short paragraphs or bullets.

3. Goals
   - Define clear outcomes for users and the business. Bullet list with measurable outcomes when possible.

4. Branding Brief
   - Define visual direction, tone, and UX criteria for interface proposals. Short bullets by category.
   - Example:
     - Brand direction: Confident, minimal, trustworthy.
     - Tone and personality: Clear, warm, expert.
     - UX principles to prioritize: Clarity first, low friction, fast feedback.
     - Visual or interaction references: Linear, Notion, Stripe.
     - UI constraints or non-negotiables: Mobile-first, accessible contrast, avoid dense tables.

5. Scope, Assumptions, and Dependencies
   - Clarify what is included, excluded, assumed, or externally dependent. Split into `Includes`, `Excludes`, `Assumptions`, and `Dependencies`.

6. Users and Stakeholders
   - Identify main user types, decision makers, and key contributors. Create a user persona for each type of user.

7. Use Cases / User Stories
   - Capture core user intents, tasks, and motivations.

8. Functional Requirements
   - List features and behaviors the product must support.
   - Format: One requirement per line using IDs like `FR-01`.

9. Business Rules
   - Document mandatory rules, constraints, and validations.
   - Format: One rule per line using IDs like `BR-01`.

10. Non-Functional Requirements
    - Define quality expectations like performance, security, and accessibility.

11. Main Flow, Secondary Flows, and Exceptions
    - Describe the ideal primary journey, relevant secondary journeys, and key failure or alternate paths.

12. States, Content, and Edge Cases
    - Define shared UI states plus any flow-specific states that materially affect the experience.

13. Success Metrics
    - Explain how success will be measured.

14. Risks and Open Questions
    - Capture uncertainties, blockers, tradeoffs, and pending decisions.

15. Appendix
    - Store references, links, diagrams, and supporting material.
-->

# PRD

## 1. Executive Summary

This product is a treasury-facing settlement application for cross-border postal e-commerce flows that uses a USD-backed stablecoin (`USD-ST`) on XRPL to execute and reconcile net obligations between postal operators. It is built for a Treasury & Settlement Manager who needs a faster, fully auditable alternative to correspondent-bank settlement, while preserving existing clearing logic and providing clear, low-risk workflows for issuance, payment execution, monitoring, redemption, and reconciliation.

## 2. Context and Problem

Today, clearing and settlement are operationally fragmented. Postal operators exchange parcel data, clearing outputs are agreed off-ledger, and the Treasury & Settlement Manager then moves into payment execution with limited visibility, manual coordination, slow timelines, and reconciliation overhead.

Key pain points:

- Settlement status is hard to track once clearing is approved.
- Incoming payments require manual follow-up with counterparties and intermediaries.
- Outbound settlement depends on liquidity visibility, control checkpoints, and exact execution discipline.
- Auditability is weak when references across clearing files, control records, on-chain transactions, and reports are not consistently linked.
- The Treasury & Settlement Manager needs strong safeguards so issuance never exceeds confirmed USD backing and settlement actions are always explainable.

The opportunity is to keep the existing clearing process intact while replacing the settlement layer with a structured, traceable XRPL workflow that is faster, easier to monitor, and materially better for audit, treasury control, and operational confidence.

## 3. Goals

- Reduce settlement completion time from multi-day bank coordination to near real-time XRPL finality for PoC settlement payments.
- Ensure 100% of issued `USD-ST` is backed by confirmed USD and no issuance exceeds the active authorization or trustline limits.
- Enable the Treasury & Settlement Manager to move from approved clearing position to settlement decision in under 2 minutes for standard cases.
- Provide deterministic reconciliation so 100% of successful XRPL settlement transactions can be matched to off-ledger records without manual override.
- Make every transaction traceable across `ClearingCycleID`, authorization, payment instruction, redemption reference, and reporting artifacts.
- Reduce settlement ambiguity by giving users explicit states for payable, receivable, in transit, partial, settled, reconciled, exception, and closed.
- Support safe partial-settlement handling when liquidity is insufficient, without losing audit continuity.

## 4. Branding Brief

- Brand direction: Institutional, modern, trustworthy, operationally precise.
- Tone and personality: Clear, sober, expert, reassuring under pressure.
- UX principles to prioritize: Clarity first, progressive disclosure, explicit status, auditability by default, low-error execution.
- Visual or interaction references: Stripe Dashboard, Linear, modern treasury/ops tooling.
- Information design: Favor status cards, guided steps, action summaries, and timeline views over dense spreadsheet-like screens.
- Primary interaction model: Workflow-driven with clear next actions based on settlement direction.
- Accessibility criteria: High contrast, keyboard-friendly, readable numeric formatting, strong error visibility, no status conveyed by color alone.
- UI constraints or non-negotiables: Desktop-first for operations teams, responsive down to tablet, avoid ambiguous labels, always show IDs and timestamps on critical records.

## 5. Scope, Assumptions, and Dependencies

### Includes

- Ingestion of final approved clearing package metadata needed for settlement handover.
- Direction classification as `Receivable` or `Payable`.
- Creation and lifecycle tracking of settlement records.
- Treasury reserve visibility and issuance authorization controls.
- `USD-ST` issuance against confirmed USD backing.
- Inbound settlement monitoring for expected receipts.
- Outbound on-chain settlement execution via XRPL `Payment`.
- Partial settlement support with explicit confirmation and carry-forward logic.
- Redemption intake, off-ledger burn tracking, and settlement close.
- Deterministic reconciliation and exception management.
- Audit trail and exportable reporting for PoC outcomes.

### Excludes

- Changes to existing clearing rules or clearing calculation logic.
- Full banking rails orchestration outside agreed inbound monitoring needs.
- Dynamic trustline limit management in the PoC.
- Production-scale multi-currency treasury operations beyond optional FX reference capture.
- Automated regulatory filing workflows beyond exportable reports.
- End-customer parcel tracking or non-settlement postal operations.

### Assumptions

- Clearing positions are already approved before entering this product.
- The PoC involves 2-3 operators and limited transaction volumes.
- Settlement is simulated using historical or projected CSV data.
- The Treasury & Settlement Manager can confirm USD prefunding off-ledger.
- Operator and counterparty wallets are provisioned before execution.
- XRPL memos are the canonical bridge between on-chain and off-ledger references.
- Control checkpoints remain required before issuance and payment execution, even when completed by the same user.

### Dependencies

- Approved clearing package with `ClearingCycleID`, amount, currency, and counterparty data.
- XRPL wallets, trustlines, and network connectivity.
- Off-ledger treasury ledger or source of truth for confirmed USD backing.
- Internal confirmation and control rules for issuance and settlement instructions.
- Counterparty readiness to receive and/or send `USD-ST` on XRPL.
- Reporting exports and audit consumers downstream.

## 6. Users and Stakeholders

### Primary User

#### Persona - Treasury & Settlement Manager

- Role: Single operational user for the PoC, responsible for receiving clearing positions, validating direction, managing liquidity readiness, issuing `USD-ST`, monitoring inbound payments, executing outbound settlements, handling exceptions, and closing cycles.
- Goals: Understand what is owed, what action is required next, whether liquidity and control checkpoints are in place, and whether each cycle is fully settled and traceable.
- Pain points: Fragmented references, manual coordination, uncertainty around payment state, and reconciliation work split across too many tools.
- Needs from the product: One clear workspace that surfaces the current state, required next action, exact amount, counterparty, wallet references, and audit evidence without forcing context switching.

### Stakeholders

- Finance, audit, and compliance stakeholders will consume outputs from this product later, primarily through reports, audit trails, and exported evidence.

## 7. Use Cases / User Stories

- As a Treasury & Settlement Manager, I want to receive an approved clearing position so I can start settlement without revalidating clearing logic.
- As a Treasury & Settlement Manager, I want the system to label each obligation as `Receivable` or `Payable` so I immediately know the right next workflow.
- As a Treasury & Settlement Manager, I want every settlement obligation recorded with status, counterparty, amount, and cycle ID so exposure is visible from the start.
- As a Treasury & Settlement Manager, I want to see confirmed USD backing, issued supply, and remaining capacity so I can authorize issuance safely.
- As a Treasury & Settlement Manager, I want to create issuance authorizations per cycle or batch so liquidity usage is capped and auditable.
- As a Treasury & Settlement Manager, I want issuance blocked when backing, authorization, or trustline conditions fail so I cannot create invalid supply.
- As a Treasury & Settlement Manager, I want to notify counterparties of due settlements and track inbound payments so I can manage receivables proactively.
- As a Treasury & Settlement Manager, I want to prepare and execute exact settlement payments on XRPL so obligations settle quickly and finally.
- As a Treasury & Settlement Manager, I want to approve partial settlements when liquidity is constrained so operations continue without losing control.
- As a Treasury & Settlement Manager, I want to match XRPL transactions to off-ledger records automatically so exceptions are isolated and explainable.
- As a Treasury & Settlement Manager, I want exportable audit and performance reports so the PoC can be reviewed later by audit and compliance stakeholders.

## 8. Functional Requirements

- `FR-01` The system must ingest or register an approved clearing package containing `ClearingCycleID`, `CounterpartyID`, `Amount`, `Currency`, and status `Clearing_Agreed`.
- `FR-02` The system must timestamp receipt of each clearing package.
- `FR-03` The system must classify each settlement obligation as `Receivable` or `Payable`.
- `FR-04` The system must create a settlement record with amount, currency, direction, counterparty, cycle ID, and initial status `Pending_Settlement`.
- `FR-05` The system must display settlement direction and expose the next valid workflow based on that direction.
- `FR-06` The system must provide a reserve dashboard showing confirmed USD backing, total issued `USD-ST`, available issuance capacity, and utilization percentage.
- `FR-07` The system must allow the Treasury & Settlement Manager to create an issuance authorization with unique ID, cycle ID, and maximum issuable amount.
- `FR-08` The system must track authorization status values including `Created`, `Active`, optional `Fully utilized`, and `Expired`.
- `FR-09` The system must validate backing availability, authorization validity, trustline existence, and trustline limits before issuing `USD-ST`.
- `FR-10` The system must execute issuance as an XRPL issued-currency `Payment` from treasury wallet to operator wallet.
- `FR-11` The system must persist issuance memo data including `ClearingCycleID`, `IssuanceAuthorizationID`, and `TreasuryApprovalID` as the control reference recorded within the same user flow.
- `FR-12` The system must store the XRPL transaction hash for each issuance event.
- `FR-13` The system must reduce authorization remaining amount after successful issuance.
- `FR-14` The system must support outbound settlement instruction creation with `PaymentInstructionID`, beneficiary wallet, amount, currency, and `ClearingCycleID`.
- `FR-15` The system must require an explicit user confirmation step before executing a settlement payment.
- `FR-16` The system must validate sender balance, trustline status, and prior issuance availability before settlement execution.
- `FR-17` The system must execute outbound settlement as a single XRPL `Payment` per net obligation unless explicitly confirmed as partial.
- `FR-18` The system must store settlement memo data including `ClearingCycleID`, `PaymentInstructionID`, `TreasuryApprovalID`, and `PartialPaymentFlag`, with `TreasuryApprovalID` treated as the control reference of the same user flow.
- `FR-19` The system must confirm ledger finality before marking a settlement as `Settled`.
- `FR-20` The system must support partial settlement workflows with remaining obligation recalculation.
- `FR-21` The system must support inbound settlement notifications with logged channel and dispatch timestamp.
- `FR-22` The system must track expected inbound settlements using statuses `Not_Received`, `In_Transit`, `Received`, `Partial_Received`, and `Exception`.
- `FR-23` The system must allow the Treasury & Settlement Manager to record off-ledger notes for fee deductions, delays, and investigations on inbound payments.
- `FR-24` The system must support redemption intake as an XRPL `Payment` from operator wallet to treasury wallet.
- `FR-25` The system must record redemption memo data including `SettlementCycleID` and `RedemptionReferenceID`.
- `FR-26` The system must update outstanding supply and backing availability after redemption is recorded and burned off-ledger.
- `FR-27` The system must close a settlement cycle only when all obligations are settled and all issued tokens are redeemed.
- `FR-28` The system must reconcile XRPL transaction hashes deterministically against amount, sender, receiver, and memo-linked cycle ID.
- `FR-29` The system must flag exceptions for memo mismatch, amount mismatch, undeclared partial payment, trustline breach, and duplicate transactions.
- `FR-30` The system must create exception records with reason code, transaction hash, settlement reference, status, and action log.
- `FR-31` The system must maintain an immutable audit log of user actions, timestamps, control confirmations, and state changes.
- `FR-32` The system must export reports for issued vs redeemed supply, outstanding supply, settlement times, settlement completion rate, partial frequency, trustline utilization, and exceptions summary.
- `FR-33` The system must support filtering of reports by `ClearingCycleID`.
- `FR-34` The system must preserve exact on-chain memo fields off-ledger for audit and reconciliation.

## 9. Business Rules

- `BR-01` A clearing package can enter settlement only if its status is `Clearing_Agreed`.
- `BR-02` `NetAmount` must be greater than zero.
- `BR-03` Supported currency for the PoC is `USD` / `USD-ST` only.
- `BR-04` Settlement direction is `Receivable` when the counterparty owes La Poste CI and `Payable` when La Poste CI owes the counterparty.
- `BR-05` Every settlement obligation must be linked to a unique `ClearingCycleID`.
- `BR-06` `USD-ST` issuance must never exceed confirmed USD backing.
- `BR-07` No issuance is allowed without a valid `Active` issuance authorization.
- `BR-08` Issuance must not exceed remaining authorization amount.
- `BR-09` Issuance must not exceed the target wallet trustline limit.
- `BR-10` Trustlines are static for the PoC and are not changed dynamically during operations.
- `BR-11` Every XRPL transaction in scope must contain a memo.
- `BR-12` Required memo fields must be present for the relevant transaction type or reconciliation fails.
- `BR-13` Settlement execution must use the exact confirmed `USD-ST` amount.
- `BR-14` Partial settlement is allowed only when explicitly confirmed by the Treasury & Settlement Manager and marked with `PartialPaymentFlag = Y`.
- `BR-15` Funds must not be marked as received until XRPL ledger confirmation is validated and final.
- `BR-16` Settlement status can be marked `Reconciled` only when deterministic matching succeeds.
- `BR-17` Duplicate or conflicting transactions must be marked as exceptions.
- `BR-18` A settlement cycle can be marked `Closed` only when all obligations are settled and all issued tokens are redeemed.
- `BR-19` Audit records must capture creator or actor identity and timestamp for all critical actions.
- `BR-20` Reports must be reproducible from the same underlying inputs.

## 10. Non-Functional Requirements

- Performance: Standard operational screens should load in under 2 seconds for PoC data volumes.
- Performance: Critical status changes after XRPL confirmation should appear to users in under 5 seconds from confirmed ingest.
- Reliability: The system must prevent duplicate execution for issuance, settlement, and redemption actions.
- Security: Only the authenticated Treasury & Settlement Manager can create authorizations, confirm issuance, confirm payment instructions, or resolve exceptions.
- Security: Wallet addresses, hashes, control records, and audit logs must be protected from unauthorized modification.
- Auditability: Every state transition and critical user action must be logged with timestamp and actor ID.
- Data integrity: Memo fields stored off-ledger must match on-chain values exactly.
- Accessibility: UI must support keyboard navigation, visible focus states, high contrast, and numeric readability.
- Usability: High-risk actions must present concise confirmation summaries with amount, counterparty, wallet, cycle ID, and control reference.
- Localization readiness: Numeric formatting and timestamps should be structured for future locale formatting, even if PoC runs in one locale.
- Maintainability: Business rules and status models should be implemented in a way that can support future phases, including multi-currency and stronger compliance reporting.

## 11. Main Flow, Secondary Flows, and Exceptions

### Main Flow

1. The Treasury & Settlement Manager receives an approved clearing package.
2. System validates basic completeness and supported currency.
3. System creates a settlement record and labels it `Receivable` or `Payable`.
4. The Treasury & Settlement Manager reviews reserve capacity and creates or uses an issuance authorization if settlement will require outbound `USD-ST` liquidity.
5. The Treasury & Settlement Manager issues `USD-ST` to the operator wallet after validations pass.
6. The Treasury & Settlement Manager either monitors inbound payment or prepares an outbound payment instruction depending on direction.
7. XRPL payment executes with required memo references.
8. System waits for ledger finality, stores the transaction hash, and updates settlement status.
9. The Treasury & Settlement Manager reconciles the cycle through deterministic on-chain and off-ledger matching.
10. Operator redeems remaining `USD-ST`, the Treasury & Settlement Manager records the burn off-ledger, and the cycle closes.

### Secondary Flows

- Receivable flow: The Treasury & Settlement Manager sends settlement notification, tracks expected payment, updates status from `Not_Received` to `In_Transit` to `Received`, and records any deductions or delays.
- Partial settlement flow: The Treasury & Settlement Manager confirms a smaller amount, the system marks the payment as partial, recalculates the remaining obligation, and keeps the cycle open until final payment lands.
- Reporting flow: The Treasury & Settlement Manager filters by `ClearingCycleID` and exports cycle-level performance and traceability reports for later audit review.
- Redemption flow: After settlement completion, operator returns `USD-ST`, the Treasury & Settlement Manager marks redemption received, reduces outstanding supply, and releases backing capacity.

### Exceptions

- Clearing package missing required fields or unsupported currency.
- Issuance requested without active authorization.
- Issuance exceeds confirmed backing or trustline limits.
- Settlement execution attempted with insufficient `USD-ST` balance.
- Incoming or outgoing transaction missing required memo fields.
- Amount mismatch between off-ledger obligation and XRPL transaction.
- Duplicate transaction detected for the same obligation.
- Partial payment executed without being explicitly declared and approved.
- Reconciliation cannot deterministically match sender, receiver, amount, and cycle ID.

## 12. States, Content, and Edge Cases

### Shared States

- `Clearing_Agreed`
- `Pending_Settlement`
- `Receivable`
- `Payable`
- `Not_Received`
- `In_Transit`
- `Received`
- `Partial_Received`
- `Settled`
- `Reconciled`
- `Exception`
- `Closed`
- Authorization states: `Created`, `Active`, `Fully utilized`, `Expired`

### Core Content to Surface in UI

- `ClearingCycleID`
- `CounterpartyID`
- Counterparty name
- Amount and currency
- Direction
- Wallet addresses
- `IssuanceAuthorizationID`
- `PaymentInstructionID`
- `TreasuryApprovalID` (control reference)
- `RedemptionReferenceID`
- XRPL transaction hash
- Current status and last updated timestamp
- Actor name/ID

### UX-Critical Edge Cases

- A user opens a cycle with multiple linked records and needs a clear timeline view rather than fragmented tabs.
- A payment is final on-chain but still waiting for off-ledger reconciliation; the UI must distinguish `Settled` from `Reconciled`.
- An inbound payment arrives with fee deductions; the user must capture the discrepancy without incorrectly closing the obligation.
- A user attempts issuance when capacity exists globally but not for the active authorization; the system must explain the exact blocking rule.
- A partial settlement leaves a small remainder; the UI must clearly show what remains open and what was already settled.
- Memo fields are malformed or incomplete; the transaction may exist on-chain but must remain unresolved off-ledger.
- A cycle has all payments settled but not all tokens redeemed; the UI must prevent closure and explain the dependency.
- Users need to compare multiple operators; dashboards must prioritize clarity without relying on dense tables as the only view.

## 13. Success Metrics

- 100% of issuance events comply with backing and authorization rules.
- 100% of successful XRPL settlement transactions include required memo fields.
- 100% of settled transactions can be traced through memo -> cycle -> control record -> report.
- At least 95% of successful XRPL transactions reconcile automatically without manual intervention in the PoC.
- Median time from approved clearing package to settlement direction decision is under 2 minutes.
- Median time from confirmed outbound instruction to on-chain finality is under 1 minute in test conditions.
- 0 settlement cycles are marked `Closed` while obligations or token redemptions remain open.
- Exception rate stays low enough to demonstrate operational viability, with every exception carrying a recorded reason code and action log.
- Users can export all required cycle reports without manual data stitching.

## 14. Risks and Open Questions

- The document references some optional or to-be-confirmed items, including threshold alerts and partial issuance behavior; these need final product decisions.
- The PoC mixes operational monitoring concepts from bank rails with XRPL finality; the UX must clearly separate expected receipt, confirmed receipt, settlement, and reconciliation.
- Redemption is described as burned off-ledger with on-ledger evidence; the exact control model and evidence format should be finalized.
- The canonical actor map mentions both treasury and optional operator wallets; wallet ownership boundaries need to be explicit in the product model.
- The degree of real-time reserve visibility depends on how often backing and supply states are synchronized.
- It remains open whether reports must support side-by-side bank vs XRPL comparison in the first product version or only export fields for later analysis.
- The product should define how users resolve exceptions such as write-off, correction, or retry without undermining audit integrity.
- There is a UX risk of overloading users with IDs and technical data; the interface should prioritize the operational question first and expose technical evidence contextually.

## 15. Appendix

- Source document: `User Journey simplified with acceptance criteria (3).md`
- Original PDF: `User Journey simplified with acceptance criteria (3).pdf`
- Core workflow: `Daily CSV Parcel Data -> Off-Ledger Clearing -> Netting & Direction -> Optional Multi-Day Batch Aggregation -> USD-ST Issuance -> XRPL Settlement -> Partial Settlement & Retry -> Reconciliation -> Settlement Close -> Reporting & Audit`
- Canonical memo keys: `SettlementCycleID`, `BatchID`, `TreasuryApprovalID`, `IssuanceAuthorizationID`, `PaymentInstructionID`, `PartialPaymentFlag`, `FXReference`
- PoC success definition:
  - Full cycle confirmed, issued, settled, reconciled, and closed
  - No issuance exceeds confirmed USD backing
  - All XRPL settlements reach deterministic finality
  - Full traceability across memo-linked entities
  - No correspondent-bank involvement in the settlement layer
