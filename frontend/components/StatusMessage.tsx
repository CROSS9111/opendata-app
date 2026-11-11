// 読み込み中・エラーの表示。
export function LoadingMessage() {
  return (
    <p role="status" className="py-10 text-center text-slate-600">
      読み込み中です…
    </p>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded border border-red-200 bg-red-50 p-4 text-red-800">
      データを取得できませんでした。{message}
    </p>
  );
}
