# Stablecoin-based Settlement for Cross-Border e-Commerce Parcels

## PoC EPICs - Cross-Border Postal Settlement Using USD-ST Stablecoin

## Narrative Summary

Three operators (A, B, C) exchange e-commerce parcels over a few days. They provide raw transaction data via CSV. The CSV files are parsed off-ledger to calculate net obligations. Treasury issues USD-ST to operator wallets based on pre-funded USD. Operators settle net obligations on XRPL. After settlement, operators return USD-ST, which treasury burns to release USD. All balances and transactions are reconciled, providing a fully auditable settlement process.

## Scope Boundaries

- Settlement mechanics only; existing clearing rules remain unchanged.
- 2-3 participating operators, limited transaction volumes.
- Simulation based on historical/projected CSV data.

## Starting Point: Clearing to Settlement Handover

Receives final clearing package:

- Net amount
- Currency
- Counterparty details
- Supporting schedules

Conditions:

- Clearing position officially approved and agreed with counterparty (e.g. Emirates Post).
- Process moves to payment execution (get paid or pay) on an agreed clearing cycle.

## EPIC 0 - Settlement Readiness

### User Story 0.1 - Receive Official/Final Clearing Position

As a Treasury & Settlement Manager, I want to get an approved final clearing position so that I can initiate the settlement process.

Approved clearing position package contains:

- Clearing cycle ID
- Counterparty ID
- Net amount
- Currency
- Supporting schedules (CSV references), if appropriate
- Status = `Clearing_Agreed`

On-chain settlement anchor (later stage): `ClearingCycleID` will appear in Memo.

#### Acceptance Criteria

1. Clearing package completeness:
   - Marked `Clearing_Agreed`
2. Currency validation:
   - `NetAmount` must be greater than 0.
   - Currency must be supported (`USD` for USD-ST PoC).
3. Audit trail:
   - Timestamp of receipt is recorded.

### User Story 0.2 - Determine Settlement Direction

As a Treasury & Settlement Manager, I want to know if La Poste CI is net creditor (money to receive) or net debtor (money to pay), so that I know whether to initiate or await payment.

Requirements:

- System clearly labels position as `Receivable` or `Payable`.
- Amount and currency are visible.
- Settlement initiator is clearly identified and counterparty settlement responsibility is clear.
- Direction drives next workflow steps:
  - Debtor -> Prepare Payment
  - Creditor -> Await Payment

#### Acceptance Criteria

- System automatically labels:
  - `Receivable` if counterparty owes La Poste CI
  - `Payable` if La Poste CI owes counterparty
- UI clearly displays:
  - Amount
  - Currency
  - Counterparty
- Workflow gating:
  - If `Receivable` -> EPIC 3 is enabled
  - If `Payable` -> EPIC 4 is enabled

### User Story 0.3 - Record Settlement Obligation

As a Treasury & Settlement Manager, I want to record the settlement obligation in treasury and accounting systems so that financial exposure is visible and tracked.

Settlement record created with:

- Counterparty uniquely identified
- Currency and amount correctly recorded
- Direction labeled (`Receivable` / `Payable`)
- Status defaults to `Pending_Settlement`
- Linked to `ClearingCycleID`

#### Acceptance Criteria

A settlement record is created containing:

- `ClearingCycleID`
- `CounterpartyID`
- `Amount`
- `Currency`
- `Direction` (`Receivable` / `Payable`)
- `Status = Pending_Settlement`

Additional requirements:

- Obligation appears in treasury exposure dashboard.
- Audit trail updated with creator and timestamp.

## Governance -> Issuance -> Payments -> Redemption

### EPIC Lineup

1. EPIC - Reserve governance & issuance authorization
2. EPIC - USD-ST issuance & redemption
3. EPIC - Inbound settlement monitoring (net creditor)
4. EPIC - Outbound settlement execution (net debtor via XRPL payment)
5. EPIC - Reconciliation & exception handling

### Canonical Actor Map for PoC

- Issuer wallet (token issuer)
- Treasury wallet (distribution/settlement execution)
- Counterparty wallet (beneficiary/payer)
- Optional operator wallet only if distinct from treasury

## EPIC 1 - USD-ST Reserve Management & Treasury Control

### User Story 1.1 - Manage USD-ST Reserve Availability

As a Treasury & Settlement Manager, I want to define how much USD backing is available for USD-ST issuance per settlement cycle so that total issued USD-ST never exceeds confirmed treasury liquidity.

Treasury dashboard shows:

- Total USD backing
- USD-ST issued
- Remaining issuance capacity

Rules:

- Issuance availability cannot exceed confirmed USD backing.
- Capacity is capped per `SettlementCycleID`.
- Reserve decision is logged with timestamp and settlement batch ID.

#### Acceptance Criteria

Dashboard displays:

- Total confirmed USD backing
- USD-ST issued (total supply outstanding)
- Available issuance capacity

Issuance capacity is calculated as:

- `Available = Confirmed USD backing - USD-ST issued`
- Issuance only enabled if `Available > 0`

Reserve decisions are logged with:

- `IssuanceAuthorizationID`
- `ClearingCycleID`
- `Timestamp`

### User Story 1.2 - Approve USD-ST Issuance

As a Treasury & Settlement Manager, I want to approve or cap USD-ST issuance per clearing cycle or batch so that liquidity usage is intentional, limited, and auditable.

Treasury can create an issuance authorization containing:

- `IssuanceAuthorizationID` referencing `ClearingCycleID`
- Maximum issuable USD-ST amount
- Partial issuance allowed (to be confirmed)

#### Acceptance Criteria

Issuance authorization must include:

- `IssuanceAuthorizationID` (unique)
- `ClearingCycleID`
- `MaximumIssuableAmount`

Authorization status values:

- `Created`
- `Active`
- `Fully utilized` (optional)
- `Expired`

No issuance is possible without a valid `Active` authorization.

### User Story 1.3 - Monitor Reserve Utilization

As a Treasury & Settlement Manager, I want real-time visibility of USD-ST reserve utilization so that I can anticipate liquidity stress or over-issuance risk.

Dashboard shows (read-only):

- Percentage of USD backing utilized
- USD-ST issued vs approved
- Trustline utilization by operator

Possible alerts:

- Threshold crossing at 70%
- Threshold crossing at 90%

Dependency:

- Outputs from this epic are mandatory inputs to EPIC 2.
- Output: `IssuanceAuthorizationID`

#### Acceptance Criteria

1. Dashboard shows:
   - Percentage of USD backing utilized
   - USD-ST issued vs approved
   - Trustline utilization by operator
2. Data reconciles with XRPL supply state.

## EPIC 2 - USD-ST Issuance & Redemption

XRPL primitive: `Payment` (issued currency)

Dependency: requires issuance authorization produced by EPIC 1.

This epic creates and destroys USD-ST supply.

### User Story 2.1 - Issue USD-ST Against Pre-Funded USD

As a Treasury Manager, I want to issue USD-ST only against confirmed pre-funded USD backing, and a valid issuance authorization, so that operators can settle net obligations on XRPL while preserving 1:1 backing.

#### Preconditions

- Operator trustline for USD-ST exists.
- Trustline limit is not exceeded.
- Valid `IssuanceAuthorizationID` exists.
- Remaining issuable USD amount under authorization is greater than or equal to issuance amount.

#### Requirements

- Treasury ledger shows USD deposited.
- USD-ST issued is less than or equal to USD backing.
- XRPL payment goes from Treasury to Operator.
- Issuance memo includes clearing cycle ID and treasury approval reference.

#### XRPL Transaction

- Type: `Payment` (issued currency)
- From: Treasury
- To: Operator
- Amount: USD-ST

More realistic PoC flow:

- From: PoC Operator Treasury Wallet
- To: PoC Operator Operator Wallet

#### Memo Fields

- Clearing/Settlement cycle ID or batch ID
- Issuance authorization ID
- FX reference ID (optional)

#### Included

- USD-ST issued only against confirmed USD backing
- Treasury manually approves issuance
- Issuance capped by:
  - USD backing
  - Operator trustline limit

#### USD-ST Trustlines

- Currency: `USD-ST`
- Issuer: Treasury issuer account
- Limits:
  - Operator: fixed max (e.g. 5M USD-ST)
  - Counterparty: fixed max (e.g. 5M USD-ST)
- Rules: trustlines are static; no dynamic limit changes in PoC

#### Acceptance Criteria

Preconditions validated before submission:

1. Valid `IssuanceAuthorizationID` exists and is active.
2. Remaining authorization is greater than or equal to issuance amount.
3. Confirmed USD backing is greater than or equal to issuance amount.
4. Operator trustline exists.
5. Trustline limit is not exceeded.

On execution:

6. XRPL transaction type = `Payment` (issued currency).
7. From: Treasury wallet; To: Operator wallet.
8. Amount = exact USD-ST issuance amount.

Memo must include:

- `ClearingCycleID`
- `IssuanceAuthorizationID`
- `TreasuryApprovalID`

Post-conditions:

10. XRPL transaction hash stored off-ledger.
11. Total issued USD-ST updated.
12. Authorization remaining amount reduced.
13. Audit log created.
14. Issuance blocked if any validation fails.

### User Story 2.2 - Redeem and Burn USD-ST

As a Treasury Manager, I want to return USD-ST for burning after settlement completion so that USD backing is released and stablecoin supply matches finalized settlement.

Requirements:

- Operator returns USD-ST back to treasury.
- Tokens are burned on XRPL; supply is reduced (burned off-ledger with on-ledger evidence).
- Treasury USD backing balances are updated.
- Settlement cycle is marked as `Closed`.
- Full audit trail is preserved.

#### Transaction

- Type: `Payment`
- From: Operator
- To: Treasury
- Amount: USD-ST

PoC wallet flow:

- From: PoC Operator Operator Wallet
- To: PoC Operator Treasury Wallet

#### Effects

- Operator balance decreases.
- Treasury burns tokens off-ledger for PoC.
- USD backing released.
- Audit trail preserved for all redemptions.

#### Memo Fields

- Settlement cycle closure ID
- Redemption reference ID

#### Trustlines

- Static limits
- One-time trustline setup
- Fixed USD-ST limits per operator
- XRPL enforces hard cap

#### Acceptance Criteria

- Operator initiates XRPL payment:
  - From: Operator
  - To: Treasury
  - Amount = redemption amount
- Memo includes:
  - `SettlementCycleID`
  - `RedemptionReferenceID`
- Upon receipt:
  - Treasury marks tokens as redeemed
  - Off-ledger burn reduces outstanding supply
- USD backing availability increases accordingly.
- Settlement cycle marked `Closed` only if:
  - All obligations settled
  - All issued tokens redeemed
- Full traceability preserved: redemption linked to issuance and cycle.

## EPIC 3 - Inbound Settlement Monitoring

Applicable when La Poste CI is net creditor.

Typical concerns:

- When payment is initiated
- Which banks are used
- How many intermediaries are involved
- Whether payment was sent
- Whether it is stuck with a correspondent
- Whether fees were deducted

### Purpose

Manage settlement scenarios where the institution is a net creditor and relies on the counterparty to initiate payment.

This epic does not execute payments and does not assume ledger finality until funds are credited.

### User Story 3.1 - Notify Counterparty to Settle

As a Treasury & Settlement Manager, I want to notify the counterparty that settlement is due so that payment is initiated promptly.

Requirements:

- Settlement notification includes net amount, currency, and settlement reference.
- Notification is sent via agreed channel.
- Notification is logged and dispatch date is recorded.

#### Acceptance Criteria

- Notification includes:
  - Amount
  - Currency
  - Settlement reference (`ClearingCycleID`)
- Notification channel logged.
- Date/time of dispatch recorded.
- Notification linked to settlement record.

### User Story 3.2 - Monitor Incoming Payment

As a Treasury & Settlement Manager, I want to monitor expected incoming settlement payments so that I can anticipate cash inflows.

Rules:

- No value date is assumed until funds are credited.
- Track:
  - Net settlement amount
  - Currency
  - Settlement reference

Criteria:

- Incoming payment is tracked as expected, not confirmed.
- Treasury can record:
  - Partial receipt
  - Fee deductions
  - Delays or investigations
- Payment status supports:
  - `Not_Received`
  - `In_Transit`
  - `Received`

#### Acceptance Criteria

Settlement record supports statuses:

- `Not_Received`
- `In_Transit`
- `Received`
- `Partial_Received`
- `Exception`

Funds are marked received only after:

- XRPL ledger confirmation
- Transaction validated and final

Partial receipt:

- Remaining obligation auto-calculated.
- Status = `Partial_Received`.

Additional requirements:

- Fee deductions can be recorded off-ledger.
- All status changes logged with timestamp and user ID.

## EPIC 4 - Outbound Settlement Execution Using USD-ST

Applicable when La Poste CI is net debtor.

XRPL primitive: `Payment`

This epic executes settlement payments by transferring already-issued USD-ST between participants to settle obligations. It does not create or destroy USD-ST supply.

### Included

- One XRPL payment per net obligation (net debtor -> net creditor)
- Currency: `USD-ST` only
- XRPL executes exactly the instructed amount
- Memo includes:
  - Clearing/Settlement cycle ID
  - Treasury approval ID
- Ledger finality confirmed
- Partial settlement decisions made off-ledger

### User Story 4.1 - Prepare Payment Instruction

As a Treasury & Settlement Manager, I want to prepare payment instructions for settlement so that I can settle the agreed obligation.

Requirements:

- Payment instruction includes amount, currency, settlement reference, and beneficiary account details.
- System checks:
  - Cut-off times
  - Value date
  - FX conversion rate (if applicable)

#### Acceptance Criteria

Payment instruction includes:

- `PaymentInstructionID`
- `ClearingCycleID`
- `Amount`
- `Currency` (`USD-ST`)
- Beneficiary wallet address

System validates:

- Sufficient USD-ST balance
- Trustline active
- Authorization completed

Rules:

- Instruction must be approved before execution.
- Instruction is immutable once executed.

### User Story 4.2 - Execute On-Chain Settlement via XRPL Payment

As a Treasury & Settlement Manager, I want to execute settlement payments via XRPL so that settlement is fast, final, and auditable.

#### High-Level Acceptance Criteria

- Payment amount in USD-ST
- One XRPL payment per debtor -> creditor
- Memo includes:
  - Settlement cycle ID
  - Approval ID reference
  - FX reference (if applicable)
- Ledger confirms finality

#### Preconditions

- Sender holds sufficient USD-ST balance.
- Trustline limits are not exceeded.
- USD-ST was previously issued under EPIC 2.

#### XRPL Transaction

- Type: `Payment` (issued currency)
- From: Settling participant
- To: Beneficiary
- Amount: USD-ST

#### Memo Fields

- Settlement/Clearing cycle ID
- `PaymentInstructionID`
- FX reference ID (if applicable)

#### Acceptance Criteria

- Exactly one XRPL payment per net obligation, unless partial.
- XRPL transaction:
  - Type: `Payment`
  - Amount: exact approved USD-ST
  - Sender: debtor wallet
  - Receiver: creditor wallet
- Memo must include:
  - `ClearingCycleID`
  - `PaymentInstructionID`
  - `TreasuryApprovalID`
  - `PartialPaymentFlag` (`Y/N`)
- Ledger finality confirmed before status update.
- Settlement status updated to `Settled` upon confirmation.
- XRPL transaction hash stored.

### User Story 4.3 - Decide Full vs Partial Settlement

As a Treasury Manager, I want partial settlements when liquidity is insufficient so that operations continue safely.

Requirements:

- Partial amount settled.
- Remaining obligation carried forward.
- XRPL executes exactly that amount.
- All partials traceable on-chain and off-ledger.

#### Net Debtor -> Net Creditor Settlement

- Operator B owes Operator A

Transaction:

- Type: `Payment`
- From: Operator B
- To: Operator A
- Amount: net USD-ST obligation

#### Acceptance Criteria

- Partial settlement allowed only if approved by treasury.
- Must be explicitly marked `PartialPaymentFlag = Y`.
- Remaining obligation auto-calculated.
- Each partial payment:
  - Has unique `PaymentInstructionID`
  - Is traceable to the same `ClearingCycleID`
- Final payment automatically closes obligation.

## EPIC 5 - Reconciliation & Exception Handling

Reconciliation is manual + deterministic.

Core reconciliation activities:

- Match XRPL transaction hash to off-ledger records
- Update settlement status to:
  - `Reconciled`
  - `Exception`

### User Story 5.1 - Reconcile XRPL Transactions

As a Treasury & Settlement Manager, I want to match XRPL transactions to off-ledger clearing records so that I can confirm all obligations are settled correctly.

XRPL hash matched to:

- Amount
- Counterparties
- Cycle ID
- Memos

Status updates to `Reconciled`.

#### Acceptance Criteria

System matches XRPL transaction hash with:

- Amount
- Sender
- Receiver
- `ClearingCycleID` (from Memo)

If all match:

- Status = `Reconciled`

Additional requirements:

- Reconciliation must be deterministic, with no manual override required for match.
- Reconciliation timestamp recorded.

### User Story 5.2 - Flag Exceptions

As a Treasury & Settlement Manager, I want the system to automatically flag partial payments, retries, or batch issues so that manual intervention can resolve exceptions and maintain audit compliance.

XRPL primitives:

- Transaction hash
- Memo
- Ledger timestamp

Conditions:

- Mismatch, delays, or partials are flagged.
- Exception reason is recorded.
- Retry or manual resolution is supported.

#### Reconciliation Logic

Off-ledger system matches:

- XRPL transaction hash
- Amount
- Sender / Receiver
- Memo fields

Example exceptions:

- Missing or incorrect memo reference
- Partial settlement
- Trustline limit breach

#### Acceptance Criteria

System flags exception if:

- Memo missing or incorrect
- Amount mismatch
- Partial payment not declared
- Trustline limit breach
- Duplicate transaction detected

Exception record includes:

- Reason code
- XRPL transaction hash
- Settlement reference

Additional requirements:

- Status updated to `Exception`.
- Manual resolution possible:
  - Correct reference
  - Retry payment
  - Write-off (if permitted)
- All exception actions logged.

## EPIC 6 - Audit, Reporting & Compliance

Potentially phase 2.

Each step is linked via IDs embedded in XRPL memos.

### User Story 6.1 - Full Traceability

As Treasury Manager, I want a complete audit trail so that auditors and regulators can verify all settlements.

Every XRPL transaction linked to:

- CSV batch
- Clearing cycle
- Treasury approval

Immutable audit trail preserved.

#### Acceptance Criteria

Every XRPL transaction linked to:

- `ClearingCycleID`
- `IssuanceAuthorizationID` (if issuance)
- `PaymentInstructionID`
- `RedemptionReferenceID` (if redemption)

Additional requirements:

- Memo fields stored off-ledger exactly as on-chain.
- Immutable transaction hash stored.
- Audit trail exportable.

### User Story 6.2 - Generate Treasury & Regulatory Reports

As a Treasury & Settlement Manager, I want exportable reports showing USD-ST issuance vs backing, FX exposure avoided, percentage of obligations settled, retries, and batch efficiency so that performance and compliance are measurable.

Reports include:

- Issued vs redeemed USD-ST
- Settlement times (bank vs XRPL comparison)
- Trustline utilization

#### Acceptance Criteria

Reports must include:

1. Issued vs redeemed USD-ST per cycle
2. Outstanding supply
3. Settlement time (instruction -> ledger finality)
4. Percentage of obligations settled
5. Partial settlement frequency
6. Trustline utilization
7. Exceptions summary

Reports must be:

- Exportable as CSV
- Filterable by `ClearingCycleID`
- Reproducible (same inputs -> same report)

## Canonical Memo Standard (PoC Requirement)

A single memo could include:

- `Clearing/SettlementCycleID` - e.g. `CYCLE_2026-02-05`
- `BatchID` - e.g. `BATCH_03` if multi-day batching is used
- `PartialPaymentFlag` - e.g. `Y` or `N`
- `TreasuryApprovalID` - internal approval reference
- `ReferenceTransactionIDs` - optional list linking back to original CSV rows
- `FXReference` - if multi-currency conversion applied
- `Adjustment/Fee Info` - optional for reconciled transactions

```json
{
  "SettlementCycleID": "CYCLE_2026-02-05",
  "BatchID": "BATCH_03",
  "TreasuryApprovalID": "TA_88421",
  "IssuanceAuthorizationID": "IA_55219",
  "PaymentInstructionID": "PI_77102",
  "PartialPayment": "N",
  "FXReference": "FXREF_Optional"
}
```

### Acceptance Criteria

- Every XRPL transaction must include a Memo.
- Memo must contain at minimum:
  - `ClearingCycleID`
  - `TreasuryApprovalID` or `IssuanceAuthorizationID`
- If partial:
  - `PartialPaymentFlag = Y`
- Memo structure is consistent across issuance, settlement, and redemption.
- Reconciliation must fail if required memo fields are missing.

## High-Level Workflow (Integrated)

Daily CSV Parcel Data -> Off-Ledger Clearing -> Netting & Direction -> Optional Multi-Day Batch Aggregation -> USD-ST Issuance -> XRPL Settlement -> Partial Settlement & Retry (if needed) -> Treasury Risk Rules & Dynamic Limits -> Reconciliation -> Settlement Close -> Reporting & Audit

## Workflow Outcome

- Efficient and auditable USD-ST stablecoin lifecycle
- Automated reconciliation, exception handling, and retry logic
- Safe treasury control using trustlines and dynamic limits
- Transparent reporting for regulators and internal management
- Support for realistic postal operator scenarios: batching, FX, partial settlement, and retry logic
- XRPL settlement reduces timeline from days to seconds with finality and immutability

## PoC Success Criteria

The PoC is considered successful if:

1. A full clearing cycle is:
   - Authorized
   - Issued
   - Settled
   - Reconciled
   - Closed
2. No issuance exceeds confirmed USD backing.
3. All XRPL settlements reach deterministic finality.
4. 100% of transactions are traceable via Memo -> Cycle -> Authorization -> Report.
5. No correspondent bank involvement in settlement layer.
