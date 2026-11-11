import "server-only";

// バックエンドの入口。リクエストを読む → service を呼ぶ → JSON で返す、だけを書く。

import { listShelters } from "@/backend/services/shelterService";
import { isHazardKey } from "@/shared/hazards";
import type { ApiErrorResponse, ShelterListResponse } from "@/shared/types";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const hazardParam = params.get("hazard");
  const q = params.get("q") ?? undefined;

  if (hazardParam !== null && !isHazardKey(hazardParam)) {
    return Response.json({ error: `hazard が正しくありません: ${hazardParam}` } satisfies ApiErrorResponse, {
      status: 400,
    });
  }

  const shelters = await listShelters({
    hazard: hazardParam !== null ? hazardParam : undefined,
    q,
  });
  return Response.json({ shelters, total: shelters.length } satisfies ShelterListResponse);
}
