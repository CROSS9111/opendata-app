// 共通: フロントエンドとバックエンドの「約束事」。
// APIが返す形はここで決める。どちらか一方だけで勝手に変えない。

import type { HazardKey } from "./hazards";

// 指定緊急避難場所 1件分（自治体標準オープンデータセットの列に対応）
export type Shelter = {
  id: string;
  name: string; // 名称
  nameKana: string; // 名称_カナ
  address: string; // 住所
  lat: number; // 緯度
  lng: number; // 経度
  hazards: HazardKey[]; // 対応する災害の種類
  capacity: number; // 想定収容人数
  phone?: string; // 電話番号
  note?: string; // 備考
};

// GET /api/shelters の返り値
export type ShelterListResponse = {
  shelters: Shelter[];
  total: number;
};

// GET /api/shelters/[id] の返り値
export type ShelterDetailResponse = {
  shelter: Shelter;
};

// エラー時の返り値
export type ApiErrorResponse = {
  error: string;
};
