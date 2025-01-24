# fe_platform

## フロントエンド環境構築

環境構築手順の詳細：[dp_開発環境構築](https://revamp-corp.atlassian.net/wiki/spaces/scmlcorebiz/pages/2764308481/dp_)

フロント開発関連の各種手順：[dp_フロント開発](https://revamp-corp.atlassian.net/wiki/spaces/scmlcorebiz/pages/2959212665/dp_)

## 主な使用技術 🚀

- **Vue.js** (ver.3.2.40): フロントエンドのUI構築に使用
- **Vue Router**: Vue.js用のルーティングライブラリ
- **Quasar** (ver.2): Vue.js用のUIフレームワーク
- **Pinia**: 状態管理ライブラリ
- **Axios**: HTTPリクエストを簡単に行うためのライブラリ
- **TypeScript**: 型安全を提供するJavaScriptの拡張版
- **Vite**: ビルドツール
- **Docker**: アプリとmockの立ち上げに使用

### Linter / Formatter

- **Linter**: ESLint
- **Formatter**: Prettier

## プロジェクトの設定(開発とビルド) 🛠️

### 前提条件

- [初期セットアップ- FE/BE共通](https://revamp-corp.atlassian.net/wiki/spaces/scmlcorebiz/pages/2764308481/dp_#%E5%88%9D%E6%9C%9F%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97--FE%2FBE%E5%85%B1%E9%80%9A) が完了していること

### ソースコードの取得

- git clone にて取得

```bash
git clone https://github.com/revamp-product-dp/fe_platform.git
```

### 開発

#### docker networkの作成（初回のみ）


```bash
docker network create data-platform-net
```

#### 開発サーバーを立ち上げ

プロジェクトのあるディレクトリ(docker-compose.yml のあるディレクトリ)で実行（デフォルトで localhost:3000 にホスト）

```bash
docker compose run --rm -p 3000:3000 app yarn vite --mode _local
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

#### api-clients自動生成コマンド

詳細は[api-clients自動生成](https://revamp-corp.atlassian.net/wiki/spaces/scmlcorebiz/pages/2959179914/api-clients)を参照、`openapi/○○○○.yaml`と`src/api-clients/○○○○`の○○○○部にはモジュール名を入れる。
```bash
docker compose run --rm app yarn openapi-generator-cli generate -g typescript-axios -i openapi/○○○○.yaml -o src/api-clients/○○○○
```