import { ScreenPlaceholder } from "@/components/screen-placeholder";

export default function ReserveIssuancePage() {
  return (
    <ScreenPlaceholder
      eyebrow="Screen scaffold"
      title="Reserve & Issuance"
      description="Liquidity readiness, active authorizations, and issuance controls live here before any payable cycle moves into execution."
      bullets={[
        "Show confirmed backing, issued supply, and available capacity in one place.",
        "Create and inspect issuance authorizations with clear state labels.",
        "Use a validation-first flow before token issuance is confirmed.",
        "Surface trustline headroom and blocking rules without ambiguity.",
      ]}
    />
  );
}
