import "server-only";

// サーバーの層（データの出し入れ）。data/shelters.json を読むのは、このファイルだけ。
// 将来DBに替えるときは、このファイルの中身だけを書き換える（関数の形は変えない）。

import rawShelters from "@/data/shelters.json";
import { isHazardKey } from "@/shared/hazards";
import type { Shelter } from "@/shared/types";

// JSON の1件を Shelter に変換する。知らない災害の種類は捨てる（画面が壊れないように）。
function toShelter(raw: (typeof rawShelters)[number]): Shelter {
  const shelter: Shelter = {
    id: raw.id,
    name: raw.name,
    nameKana: raw.nameKana,
    address: raw.address,
    lat: raw.lat,
    lng: raw.lng,
    hazards: raw.hazards.filter(isHazardKey),
    capacity: raw.capacity,
  };
  if ("phone" in raw && typeof raw.phone === "string") shelter.phone = raw.phone;
  if ("note" in raw && typeof raw.note === "string") shelter.note = raw.note;
  return shelter;
}

const allShelters: Shelter[] = rawShelters.map(toShelter);

export async function findAllShelters(): Promise<Shelter[]> {
  return allShelters;
}

export async function findShelterById(id: string): Promise<Shelter | undefined> {
  return allShelters.find((shelter) => shelter.id === id);
}
