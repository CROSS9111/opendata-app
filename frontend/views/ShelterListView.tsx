"use client";

// 一覧画面。データは sheltersApi 経由で取る。絞り込みのルールはバックエンドが持つ。
// （絞り込みボタン・検索欄は、まだ作っていない。ここに足すのが練習問題。）

import { useEffect, useState } from "react";
import { fetchShelters } from "@/frontend/api/sheltersApi";
import { Header } from "@/frontend/components/Header";
import { ShelterCard } from "@/frontend/components/ShelterCard";
import { ErrorMessage, LoadingMessage } from "@/frontend/components/StatusMessage";
import type { Shelter } from "@/shared/types";

export function ShelterListView() {
  const [shelters, setShelters] = useState<Shelter[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchShelters()
      .then((data) => {
        if (!cancelled) setShelters(data);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "不明なエラーです");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-6">
        <h1 className="mb-1 text-2xl font-bold text-slate-900">避難場所の一覧</h1>
        <p className="mb-6 text-sm text-slate-600">
          サンプル市の指定緊急避難場所です（架空のデータ）。
        </p>
        {error ? (
          <ErrorMessage message={error} />
        ) : shelters === null ? (
          <LoadingMessage />
        ) : shelters.length === 0 ? (
          <p className="text-slate-600">該当する避難場所はありません。</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shelters.map((shelter) => (
              <ShelterCard key={shelter.id} shelter={shelter} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
