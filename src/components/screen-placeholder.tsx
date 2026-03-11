import { ArrowRight, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ScreenPlaceholder({
  eyebrow,
  title,
  description,
  bullets,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
      <Card className="rounded-[22px] border-[var(--app-border)] bg-[var(--app-panel)] shadow-none">
        <CardHeader className="space-y-4">
          <Badge variant="secondary" className="w-fit rounded-full bg-[var(--app-warning-soft)] px-3 py-1 text-[var(--app-warning-text)]">
            {eyebrow}
          </Badge>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">{title}</CardTitle>
            <CardDescription className="max-w-2xl text-base leading-7 text-slate-600">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {bullets.map((bullet) => (
               <div key={bullet} className="rounded-[18px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] px-4 py-4 text-sm leading-6 text-slate-700">
                 {bullet}
               </div>
             ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[22px] border-[var(--app-border)] bg-[var(--app-panel)] shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Next build step</CardTitle>
          <CardDescription className="text-slate-500">This screen is scaffolded and ready for detailed UI work.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 text-sm text-slate-700">
          <div className="rounded-[18px] border border-[var(--app-border)] bg-[var(--app-panel-muted)] p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Clock3 className="h-4 w-4" />
              Suggested next move
            </div>
            <p>Translate the corresponding section from `ux-sitemap-and-wireframes.md` into a full production screen.</p>
          </div>
          <Button className="h-11 w-full rounded-2xl bg-[var(--app-primary)] text-white hover:bg-[var(--app-primary-hover)]">
            Continue screen design
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
