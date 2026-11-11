import "server-only";

// バックエンドの入口（1件取得）。Next.js 16 では params は Promise。

import { getShelter } from "@/backend/services/shelterService";
import type { ApiErrorResponse, ShelterDetailResponse } from "@/shared/types";

export async function GET(_request: Request, ctx: RouteContext<"/api/shelters/[id]">) {
  const { id } = await ctx.params;
  const shelter = await getShelter(id);

  if (!shelter) {
    return Response.json({ error: "避難場所が見つかりません" } satisfies ApiErrorResponse, { status: 404 });
  }
  return Response.json({ shelter } satisfies ShelterDetailResponse);
}
