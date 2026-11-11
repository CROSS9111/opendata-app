# 指定緊急避難場所の一覧（学習用）

指定緊急避難場所の一覧を見せる、小さなアプリです。Next.js 16.4.6 で作っています。
データは **架空のサンプルデータ** です（自治体標準オープンデータセットの形をしています）。

このアプリで学ぶのは、フロントエンドとバックエンドの役割の分け方です。

## 動かしてみる

Node.js 20.9 以上が必要です。

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## APIを見てみる

ブラウザで次のURLを開くと、バックエンドが返すデータが見えます。

- http://localhost:3000/api/shelters （全件）
- http://localhost:3000/api/shelters?hazard=tsunami （津波に対応する場所だけ）
- http://localhost:3000/api/shelters?q=体育館 （名前か住所に「体育館」を含む場所）

画面を開いた状態で、ブラウザの開発者ツールの Network タブを見ると、画面が `/api/shelters` にリクエストしている様子を見られます。

## 3つの層

```mermaid
flowchart LR
  C["クライアント<br/>frontend/"] -- "HTTP（fetch）" --> S["サーバー<br/>app/api、backend/services、backend/repositories"]
  S --> D["DB（データ）<br/>data/（今はJSONファイル）"]
```

くわしい決まりは [CLAUDE.md](./CLAUDE.md) にあります。Claude Code でこのアプリを広げるときも、このファイルを読んで進めます。

## Vercelに公開する

1. `npm run check` を実行して、通ることを確かめます。
2. このフォルダをGitHubのリポジトリにpushします。
3. Vercel にログインし、「Add New → Project」でそのリポジトリをインポートします。
4. 設定は初期値のまま「Deploy」を押します。

## 練習問題

| 内容 | 難しさ | 触る層 |
|---|---|---|
| 災害の種類で絞り込むボタンを作る | やさしい | フロントだけ |
| 名前・住所の検索欄を作る | やさしい | フロントだけ |
| 詳細ページに地図を埋め込む | ふつう | フロントだけ |
| 新しい項目（開設時間など）を足す | ふつう | shared、データ、バックエンド、フロント |
| 並べ替え（収容人数順）をAPIに足す | ふつう | バックエンドとフロント |
| データをデータベースに替える | むずかしい | バックエンドの repository だけ |
| 本物の自治体のCSVを取り込む | ふつう | `scripts/` と `data/` |

進めたあとは、必ず `npm run check` を通します。

## コマンド

| コマンド | 何をするか |
|---|---|
| `npm run dev` | 開発用サーバーを起動 |
| `npm run lint` | コードの決まりを調べる（層の境界も） |
| `npm run check` | lint、型チェック、ビルドをまとめて実行 |

## データについて

[data/README.md](./data/README.md) を見てください。
