import { HAZARD_LABELS, type HazardKey } from "@/shared/hazards";

export function HazardBadge({ hazard }: { hazard: HazardKey }) {
  return (
    <span className="inline-block rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
      {HAZARD_LABELS[hazard]}
    </span>
  );
}
