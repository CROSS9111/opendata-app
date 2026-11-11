"use client";

// 詳細画面。1件を sheltersApi で取って表示する。

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchShelter } from "@/frontend/api/sheltersApi";
import { Header } from "@/frontend/components/Header";
import { HazardBadge } from "@/frontend/components/HazardBadge";
import { ErrorMessage, LoadingMessage } from "@/frontend/components/StatusMessage";
import type { Shelter } from "@/shared/types";

export function ShelterDetailView({ id }: { id: string }) {
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchShelter(id)
      .then((data) => {
        if (!cancelled) setShelter(data);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "不明なエラーです");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4 py-6">
        <Link href="/" className="text-sm text-sky-700 hover:underline">
          ← 一覧にもどる
        </Link>
        {error ? (
          <div className="mt-4">
            <ErrorMessage message={error} />
          </div>
        ) : shelter === null ? (
          <LoadingMessage />
        ) : (
          <ShelterDetail shelter={shelter} />
        )}
      </main>
    </>
  );
}

function ShelterDetail({ shelter }: { shelter: Shelter }) {
  const osmUrl = `https://www.openstreetmap.org/?mlat=${shelter.lat}&mlon=${shelter.lng}#map=17/${shelter.lat}/${shelter.lng}`;
  const rows: { label: string; value: string }[] = [
    { label: "名称（カナ）", value: shelter.nameKana },
    { label: "住所", value: shelter.address },
    { label: "緯度", value: String(shelter.lat) },
    { label: "経度", value: String(shelter.lng) },
    { label: "想定収容人数", value: `${shelter.capacity.toLocaleString("ja-JP")}人` },
    { label: "電話番号", value: shelter.phone ?? "未登録" },
    { label: "備考", value: shelter.note ?? "なし" },
  ];

  return (
    <article className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">{shelter.name}</h1>
      <dl className="mt-4 divide-y divide-slate-100">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-3 gap-2 py-2 text-sm">
            <dt className="text-slate-500">{row.label}</dt>
            <dd className="col-span-2 text-slate-900">{row.value}</dd>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 py-2 text-sm">
          <dt className="text-slate-500">対応する災害</dt>
          <dd className="col-span-2">
            <ul className="flex flex-wrap gap-1.5">
              {shelter.hazards.map((hazard) => (
                <li key={hazard}>
                  <HazardBadge hazard={hazard} />
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      <p className="mt-5">
        <a
          href={osmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-700 underline"
        >
          OpenStreetMap で場所を見る
        </a>
      </p>
    </article>
  );
}
