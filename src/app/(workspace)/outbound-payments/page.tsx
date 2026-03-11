import { ScreenPlaceholder } from "@/components/screen-placeholder";

export default function OutboundPaymentsPage() {
  return (
    <ScreenPlaceholder
      eyebrow="Screen scaffold"
      title="Outbound Payments"
      description="This view handles payable cycles, including instruction preparation, pre-flight validation, and final XRPL execution control."
      bullets={[
        "Keep balance, trustline, and issuance checks above the payment form.",
        "Support full and partial settlement in the same flow.",
        "Show memo payload and payment impact before confirmation.",
        "Prevent mistaken closure assumptions after partial settlement.",
      ]}
    />
  );
}
