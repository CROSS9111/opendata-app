# data/ について

`shelters.json` は **架空のサンプルデータ** です。
施設名も住所も実在しません。「サンプル市」は存在しない市です。
形だけを、自治体標準オープンデータセット「指定緊急避難場所一覧」に合わせています。

## 項目の対応

| JSON のキー | 標準データセットの列 |
|---|---|
| id | （アプリ内の通し番号） |
| name | 名称 |
| nameKana | 名称_カナ |
| address | 住所 |
| lat / lng | 緯度 / 経度 |
| hazards | 洪水、崖崩れ・土石流及び地滑り、高潮、地震、津波、大規模な火事、内水氾濫、火山現象（印がある列） |
| capacity | 想定収容人数 |
| phone | 電話番号 |
| note | 備考 |

## 本物の自治体のデータに替えるには

1. 自治体のオープンデータサイトから「指定緊急避難場所一覧」のCSVをダウンロードします。
2. 文字コードが UTF-8 でなければ、UTF-8 に変換します。
3. 次のコマンドを実行します。

```bash
node scripts/import-shelters-csv.mjs ダウンロードしたCSV.csv
```

`data/shelters.json` が上書きされます。出力先を指定すると、上書きを避けられます。

```bash
node scripts/import-shelters-csv.mjs ダウンロードしたCSV.csv /tmp/test.json
```

4. `npm run dev` で表示を確かめます。

## 出典の表示

多くの自治体のCSVは CC BY 4.0 で公開されています。
使うときは、公開している自治体の名前を画面かREADMEに書いてください。
例：「出典：○○市 指定緊急避難場所一覧（CC BY 4.0）」
ライセンスは、データを公開しているページで必ず確かめてください。

## テスト用のCSV

`scripts/fixtures/sample-shelters.csv` は変換スクリプトの動作確認用です。
