// 見た目だけの部品。fetch はしない。
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-slate-900">
          指定緊急避難場所の一覧
        </Link>
        <span className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-800">
          架空のサンプルデータ
        </span>
      </div>
    </header>
  );
}
