// 自治体標準オープンデータセット「指定緊急避難場所一覧」のCSV（UTF-8）を
// data/shelters.json の形に変換する。依存ライブラリなし。
//
// 使い方:
//   node scripts/import-shelters-csv.mjs <入力CSV> [出力JSON]
// 出力JSONを省略すると data/shelters.json を上書きする。

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HAZARD_COLUMNS = {
  洪水: "flood",
  "崖崩れ、土石流及び地滑り": "landslide",
  高潮: "stormSurge",
  地震: "earthquake",
  津波: "tsunami",
  大規模な火事: "fire",
  内水氾濫: "inlandFlood",
  火山現象: "volcano",
};

// 引用符つきのフィールド（カンマ・改行・"" を含むもの）に対応した簡易CSVパーサ
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/^﻿/, "");

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  row.push(field);
  if (row.some((v) => v !== "")) rows.push(row);
  return rows;
}

const isMarked = (v) => ["1", "○", "〇", "◯"].includes((v ?? "").trim());

export function convert(csvText) {
  const [header, ...body] = parseCsv(csvText);
  if (!header) throw new Error("CSVが空です");
  const col = (name) => header.indexOf(name);
  for (const required of ["名称", "住所", "緯度", "経度"]) {
    if (col(required) < 0) throw new Error(`必要な列がありません: ${required}`);
  }

  return body.map((r, index) => {
    const get = (name) => (col(name) >= 0 ? (r[col(name)] ?? "").trim() : "");
    const hazards = Object.entries(HAZARD_COLUMNS)
      .filter(([column]) => isMarked(get(column)))
      .map(([, key]) => key);
    const lat = Number(get("緯度"));
    const lng = Number(get("経度"));
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      throw new Error(`${index + 2}行目: 緯度・経度が数値ではありません`);
    }
    const capacity = Number(get("想定収容人数").replace(/,/g, ""));
    const shelter = {
      id: `shelter-${String(index + 1).padStart(3, "0")}`,
      name: get("名称"),
      nameKana: get("名称_カナ"),
      address: get("住所"),
      lat,
      lng,
      hazards,
      capacity: Number.isFinite(capacity) ? capacity : 0,
    };
    if (get("電話番号")) shelter.phone = get("電話番号");
    if (get("備考")) shelter.note = get("備考");
    return shelter;
  });
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const [input, output] = process.argv.slice(2);
  if (!input) {
    console.error("使い方: node scripts/import-shelters-csv.mjs <入力CSV> [出力JSON]");
    process.exit(1);
  }
  const defaultOut = resolve(dirname(fileURLToPath(import.meta.url)), "../data/shelters.json");
  const shelters = convert(readFileSync(input, "utf-8"));
  writeFileSync(output ?? defaultOut, JSON.stringify(shelters, null, 2) + "\n", "utf-8");
  console.log(`${shelters.length}件を書き出しました: ${output ?? defaultOut}`);
}
