// 共通: 災害の種類のキーと日本語ラベル。フロントでもバックエンドでも使える（server-only は付けない）。

export const HAZARD_KEYS = [
  "flood",
  "landslide",
  "stormSurge",
  "earthquake",
  "tsunami",
  "fire",
  "inlandFlood",
  "volcano",
] as const;

export type HazardKey = (typeof HAZARD_KEYS)[number];

export const HAZARD_LABELS: Record<HazardKey, string> = {
  flood: "洪水",
  landslide: "崖崩れ・土石流・地滑り",
  stormSurge: "高潮",
  earthquake: "地震",
  tsunami: "津波",
  fire: "大規模な火事",
  inlandFlood: "内水氾濫",
  volcano: "火山現象",
};

export function isHazardKey(value: string): value is HazardKey {
  return (HAZARD_KEYS as readonly string[]).includes(value);
}
