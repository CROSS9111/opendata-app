import "server-only";

// サーバーの層（ルール）。絞り込み・並べ替え・「見つからない」の判断はここで行う。
// データの読み込みは repository に任せる。HTTPのことは知らない（Response は作らない）。

import { findAllShelters, findShelterById } from "@/backend/repositories/shelterRepository";
import type { HazardKey } from "@/shared/hazards";
import type { Shelter } from "@/shared/types";

export type ShelterSearchOptions = {
  hazard?: HazardKey;
  q?: string;
};

export async function listShelters(options: ShelterSearchOptions = {}): Promise<Shelter[]> {
  const all = await findAllShelters();
  const keyword = options.q?.trim();

  return all
    .filter((s) => (options.hazard ? s.hazards.includes(options.hazard) : true))
    .filter((s) => (keyword ? s.name.includes(keyword) || s.address.includes(keyword) : true))
    .sort((a, b) => a.nameKana.localeCompare(b.nameKana, "ja"));
}

// 見つからないときは null を返す（404にするかどうかは route 側が決める）
export async function getShelter(id: string): Promise<Shelter | null> {
  const shelter = await findShelterById(id);
  return shelter ?? null;
}
