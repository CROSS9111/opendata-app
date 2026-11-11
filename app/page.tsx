// フロントエンドの入口。画面は frontend/views に任せる。
import { ShelterListView } from "@/frontend/views/ShelterListView";

export default function HomePage() {
  return <ShelterListView />;
}
