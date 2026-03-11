import { ScreenPlaceholder } from "@/components/screen-placeholder";

export default function ReportsPage() {
  return (
    <ScreenPlaceholder
      eyebrow="Screen scaffold"
      title="Reports"
      description="Cycle-level and portfolio-level reporting will support PoC review, audit preparation, and operational performance tracking."
      bullets={[
        "Export issued vs redeemed supply and outstanding balances.",
        "Filter by cycle, date range, and status.",
        "Track settlement time, partial frequency, and exception summaries.",
        "Keep reports reproducible from the same source inputs.",
      ]}
    />
  );
}
