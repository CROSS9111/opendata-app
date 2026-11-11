// 1件分のカード。データは props で受け取るだけで、自分では取りに行かない。
import Link from "next/link";
import type { Shelter } from "@/shared/types";
import { HazardBadge } from "./HazardBadge";

export function ShelterCard({ shelter }: { shelter: Shelter }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">
        <Link href={`/shelters/${shelter.id}`} className="hover:underline">
          {shelter.name}
        </Link>
      </h2>
      <p className="text-sm text-slate-600">{shelter.address}</p>
      <p className="text-sm text-slate-700">
        想定収容人数：{shelter.capacity.toLocaleString("ja-JP")}人
      </p>
      <ul className="flex flex-wrap gap-1.5" aria-label="対応する災害">
        {shelter.hazards.map((hazard) => (
          <li key={hazard}>
            <HazardBadge hazard={hazard} />
          </li>
        ))}
      </ul>
    </article>
  );
}
