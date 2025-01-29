FROM node:18.20.1

WORKDIR /app

# パッケージのインストール
COPY package.json yarn.lock ./
RUN yarn install

# アプリケーションのコピー
COPY . .

# prism-cliのグローバルインストール
RUN yarn global add @stoplight/prism-cli 