# LSemiChat-Client

## 初回起動

サーバの起動
```
// リポジトリのDL
$ git clone 
$ cd LSemiChat-Server
// サーバの起動。初回時結構時間がかかる。docker-compose or makeコマンドで
$ docker-compose up -d
$ make dev-up
// サーバのログ表示
$ docker-compose logs -f api
$ make dev-log-api
```

クライアントサイド
```
// 依存パッケージのインストール
$ npm ci
// devサーバの起動
$ npm run dev
```