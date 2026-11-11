// フロントエンドの入口（詳細）。Next.js 16 では params は Promise。
// params を待つ部分は Suspense で包む（cacheComponents が有効なため）。
import { Suspense } from "react";
import { LoadingMessage } from "@/frontend/components/StatusMessage";
import { ShelterDetailView } from "@/frontend/views/ShelterDetailView";

async function ShelterContent({ params }: { params: PageProps<"/shelters/[id]">["params"] }) {
  const { id } = await params;
  return <ShelterDetailView id={id} />;
}

export default function ShelterPage(props: PageProps<"/shelters/[id]">) {
  return (
    <Suspense fallback={<LoadingMessage />}>
      <ShelterContent params={props.params} />
    </Suspense>
  );
}
