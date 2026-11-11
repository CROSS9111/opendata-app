// クライアントの層。APIのURLを知っていて、fetch を呼ぶのは、このファイルだけ。
// 画面（views / components）は、ここの関数を呼ぶだけにする。

import type { HazardKey } from "@/shared/hazards";
import type {
  ApiErrorResponse,
  Shelter,
  ShelterDetailResponse,
  ShelterListResponse,
} from "@/shared/types";

export type FetchSheltersParams = {
  hazard?: HazardKey;
  q?: string;
};

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `通信に失敗しました（${response.status}）`;
    try {
      const body = (await response.json()) as ApiErrorResponse;
      if (body.error) message = body.error;
    } catch {
      // JSON でなければ、上のメッセージをそのまま使う
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

export async function fetchShelters(params: FetchSheltersParams = {}): Promise<Shelter[]> {
  const query = new URLSearchParams();
  if (params.hazard) query.set("hazard", params.hazard);
  if (params.q) query.set("q", params.q);
  const queryString = query.toString();
  const suffix = queryString ? `?${queryString}` : "";

  const response = await fetch(`/api/shelters${suffix}`);
  const body = await readJson<ShelterListResponse>(response);
  return body.shelters;
}

export async function fetchShelter(id: string): Promise<Shelter> {
  const response = await fetch(`/api/shelters/${encodeURIComponent(id)}`);
  const body = await readJson<ShelterDetailResponse>(response);
  return body.shelter;
}
