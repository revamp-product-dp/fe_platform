# fe_platform

## フロントエンド環境構築

環境構築手順の詳細：[dp\_開発環境構築](https://revamp-corp.atlassian.net/wiki/spaces/scmlcorebiz/pages/2764308481/dp_)

フロント開発関連の各種手順：[dp\_フロント開発](https://revamp-corp.atlassian.net/wiki/spaces/scmlcorebiz/pages/2959212665/dp_)

## 主な使用技術 🚀

- **Vue.js** (ver.3.2.40): フロントエンドの UI 構築に使用
- **Vue Router**: Vue.js 用のルーティングライブラリ
- **Quasar** (ver.2): Vue.js 用の UI フレームワーク
- **Pinia**: 状態管理ライブラリ
- **Axios**: HTTP リクエストを簡単に行うためのライブラリ
- **TypeScript**: 型安全を提供する JavaScript の拡張版
- **Vite**: ビルドツール
- **Docker**: アプリと mock の立ち上げに使用

### Linter / Formatter

- **Linter**: ESLint
- **Formatter**: Prettier

## プロジェクトの設定(開発とビルド) 🛠️

### 前提条件

- [初期セットアップ- FE/BE 共通](https://revamp-corp.atlassian.net/wiki/spaces/scmlcorebiz/pages/2764308481/dp_#%E5%88%9D%E6%9C%9F%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97--FE%2FBE%E5%85%B1%E9%80%9A) が完了していること

### ソースコードの取得

- git clone にて取得

```bash
git clone https://github.com/revamp-product-dp/fe_platform.git
```

### 開発

#### docker network の作成（初回のみ）

```bash
docker network create data-platform-net
```

#### 開発サーバーを立ち上げ

プロジェクトのあるディレクトリ(docker-compose.yml のあるディレクトリ)で実行（デフォルトで localhost:3000 にホスト）

```bash
docker compose run --rm -p 3000:3000 app yarn vite --mode _local
```

または

```bash
docker compose up
```

#### ビルド

ビルドコマンド。本番などのため、コンパイルした版（デフォルトで dist フォルダーに出力）

```bash
docker compose run --rm app yarn vite build --mode _local
```

ビルドをローカルで確認（デフォルトで localhost:4173 にホスト）

```bash
docker compose run --rm --service-ports app yarn preview
```

#### api-clients 自動生成コマンド

`./openapi/{モジュール名}.yaml`がある状態で以下コマンドを実行する。
新規 yaml ファイルを利用する場合、先に`./src/api-clients/{モジュール名}.ts`のファイルを作成しておくと自動で生成結果がコピペされるので推奨。

```bash
yarn api {モジュール名}
```
