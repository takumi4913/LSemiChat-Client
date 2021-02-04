# LSemiChat-Client

## 初回起動

1. ローカルでサーバの起動

`docker-compose`がインストールされている必要があります。されていない場合は[こちら](https://docs.docker.jp/compose/install.html)からインストールをお願いします。
サーバのリポジトリは[こちら](https://github.com/lsemichat/LSemiChat-Server)
```
// リポジトリのDL
$ git clone {サーバのリポジトリ}
$ cd LSemiChat-Server
// サーバの起動。初回時結構時間がかかる。docker-compose or makeコマンドで
$ docker-compose up -d
$ make dev-up
// サーバのログ表示
$ docker-compose logs -f api
$ make dev-log-api
```

2. クライアントの環境を初期化

```
// リポジトリのclone
$ git clone {このリポジトリ}
// 依存パッケージのインストール
$ npm ci
// devサーバの起動
$ npm run dev
```

`localhost:3000`にてサーバが起動します。