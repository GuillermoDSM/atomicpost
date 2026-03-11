import { ScreenPlaceholder } from "@/components/screen-placeholder";

export default function ReconciliationPage() {
  return (
    <ScreenPlaceholder
      eyebrow="Screen scaffold"
      title="Reconciliation"
      description="Deterministic matching between on-chain evidence and off-ledger records should be fast, explainable, and exception-driven."
      bullets={[
        "Compare amount, sender, receiver, memo fields, and cycle references.",
        "Keep successful matches separate from unresolved mismatches.",
        "Provide direct handoff into exception review when matching fails.",
        "Preserve audit context for every reconciliation decision.",
      ]}
    />
  );
}
