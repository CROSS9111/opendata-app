import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// 層の境界を守るためのルール。違反すると npm run lint が失敗する。
// 相対パス（../../backend/...）でも、@/ 付きでも、どちらも止める。
// 注意: 同じファイルに当たる設定は、あとのブロックが前のブロックを上書きする。
// だから、あとのブロックでも禁止の一覧を最初から全部書き直している。
const banLayer = (layer, message) => [
  { group: [`@/${layer}`, `@/${layer}/**`, `**/${layer}`, `**/${layer}/**`], message },
];
const banData = (message) => [
  { group: ["@/data/*", "**/data/*.json"], message },
];
const banApiRoutes = (message) => [
  { group: ["@/app/api", "@/app/api/**", "**/app/api", "**/app/api/**"], message },
];
const banApp = (message) => [
  { group: ["@/app", "@/app/**", "**/app", "**/app/**"], message },
];

const restrict = (patterns) => ({
  "no-restricted-imports": ["error", { patterns }],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // クライアント（frontend）: backend、data、app/api を import してはいけない
  {
    files: ["frontend/**/*.{ts,tsx}"],
    rules: restrict([
      ...banLayer("backend", "frontend から backend は import できません。データは sheltersApi 経由の fetch で取ります。"),
      ...banData("frontend から data は読めません。データは API 経由で取ります。"),
      ...banApiRoutes("frontend から app/api は import できません。fetch で呼びます。"),
    ]),
  },
  // ページの入口: frontend と shared だけ
  {
    files: ["app/page.tsx", "app/shelters/**/*.{ts,tsx}"],
    rules: restrict([
      ...banLayer("backend", "ページの入口は frontend と shared だけを import します。"),
      ...banData("ページの入口から data は読めません。"),
      ...banApiRoutes("ページから app/api は import できません。fetch で呼びます。"),
    ]),
  },
  // サーバー（backend）: frontend と app/ を import してはいけない
  {
    files: ["backend/**/*.ts"],
    rules: restrict([
      ...banLayer("frontend", "backend から frontend は import できません。"),
      ...banApp("backend から app/ は import できません。"),
    ]),
  },
  // service は data も読まない（読むのは repository だけ）
  {
    files: ["backend/services/**/*.ts"],
    rules: restrict([
      ...banLayer("frontend", "backend から frontend は import できません。"),
      ...banApp("backend から app/ は import できません。"),
      ...banData("data を読むのは backend/repositories だけです。"),
    ]),
  },
  // API の入口: backend と shared だけ
  {
    files: ["app/api/**/*.ts"],
    rules: restrict([
      ...banLayer("frontend", "app/api は backend と shared だけを import します。"),
      ...banData("data を読むのは backend/repositories だけです。"),
    ]),
  },
  // shared: frontend / backend / data を import しない
  {
    files: ["shared/**/*.ts"],
    rules: restrict([
      ...banLayer("frontend", "shared は frontend を import できません。"),
      ...banLayer("backend", "shared は backend を import できません。"),
      ...banData("shared は data を import できません。"),
    ]),
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "scripts/**"]),
]);

export default eslintConfig;
