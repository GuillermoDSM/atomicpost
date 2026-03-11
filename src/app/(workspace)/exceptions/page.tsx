import { ScreenPlaceholder } from "@/components/screen-placeholder";

export default function ExceptionsPage() {
  return (
    <ScreenPlaceholder
      eyebrow="Screen scaffold"
      title="Exceptions"
      description="Exceptions centralize the cases that need manual intervention without losing the full operational and audit trail."
      bullets={[
        "Organize by reason code, urgency, and affected cycle.",
        "Show linked transaction and memo evidence in context.",
        "Support correction, retry, or write-off where permitted.",
        "Log every exception action with actor and timestamp.",
      ]}
    />
  );
}
