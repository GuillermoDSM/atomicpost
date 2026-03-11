import { ScreenPlaceholder } from "@/components/screen-placeholder";

export default function AuditTrailPage() {
  return (
    <ScreenPlaceholder
      eyebrow="Screen scaffold"
      title="Audit Trail"
      description="Immutable evidence should be searchable by cycle and easy to export without mixing operational decisions with low-level technical noise."
      bullets={[
        "Show user actions, state changes, memo payloads, and hashes.",
        "Make cycle-level filtering fast and obvious.",
        "Expose exact timestamps for every critical control step.",
        "Keep evidence exportable for later audit review.",
      ]}
    />
  );
}
