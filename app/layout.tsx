import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "指定緊急避難場所の一覧（学習用）",
  description: "自治体標準オープンデータセットの形をした、架空の避難場所データの学習用アプリ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
