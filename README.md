# Nexus Search

日本語の説明は[目次](#目次)から読めます。

## Table of Contents

1. [Summary](#summary)
2. [Background of Development](#background-of-development)
3. [Features](#features)
4. [Requirements, Dependencies](#requirements-dependencies)
5. [Installation](#installation)
6. [LICENSE](#license)
7. [CREDIT](#credit)

## Summary

A browser-based search launcher that combines search engine selection, advanced query fields, recent searches and bookmarks in one page.

[Playground Is Here!](https://tools.oz-coden.com/nexus-search/)

## Background of Development

The aim is to provide a single starting point for everyday searches and frequently visited sites, with settings stored in the browser.

## Features

- Search engine selection  
  Choose Google, Bing, Brave, DuckDuckGo or Yahoo Japan.
- Advanced query fields  
  Build queries with required words, exact phrases, alternatives, exclusions and site restrictions. Operator support depends on the selected search engine.
- Recent searches  
  Reuse the last eight distinct search queries from the search field.
- Bookmarks  
  Add a title and HTTP/HTTPS URL, open the site in a new tab, or delete a bookmark with confirmation.
- Keyboard shortcuts  
  Press `/` outside an input field to focus the search field, Enter to search, and Esc in the search field to dismiss history.
- Local preferences and shared themes  
  Store the selected engine, history and bookmarks in localStorage, and use the common light or dark theme.

## Requirements, Dependencies

- A current web browser with JavaScript enabled and support for HTML dialogs.
- An internet connection to use external search services and bookmarked sites.
- localStorage access to retain preferences, history and bookmarks across reloads.

The user interface is in Japanese. Shared UI assets are included in this repository. Python 3 is only needed for the example local server command below; an equivalent static HTTP server can also be used.

## Installation

1. Clone or download this repository, keeping the directory structure intact.
2. Start a static HTTP server from the repository root. For example, with Python 3:

   ```sh
   python -m http.server 8000
   ```

3. Open `http://localhost:8000/` in your browser.

The application files are at the repository root. Running the application requires only static HTML, CSS and JavaScript; no Node.js runtime, API server or build step is required.

Query construction and bookmark management run in the browser. Executing a search sends the query to the selected external search engine. Opening a bookmark connects to that site. This application has no search backend or account synchronization service.

### Usage

1. Select a search engine under **設定**, enter a query in **検索キーワード**, and press Enter or click **検索**. Results open on the selected search service in a new tab.
2. For advanced searches, fill in **詳細検索** and click **詳細検索を実行**. Separate multiple exact phrases with commas; separate alternative words, excluded words and multiple sites with spaces.
3. To save a bookmark, click **＋ 追加**, enter **サイト名** and **URL**, then click **保存**. A URL without a scheme is treated as HTTPS.
4. Click a bookmark title to open it, or its **×** button and **削除する** to remove it.

Search preferences, history and bookmarks belong to the current browser and origin. They are not synchronized between browsers or domains. If localStorage is unavailable or full, changes remain usable in the current page and a storage warning is displayed.

### Development and publication

Application-specific behavior and layout are in `script.js` and `style.css`. Shared styles, navigation and themes are bundled in `vendor/ui/` from [oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web). The source commit and file hashes are recorded in `shared-ui.json`, so the application does not fetch the shared UI repository at runtime.

To update the bundled UI, clone the shared UI repository alongside this repository. From this application's root, run `node ../oz-coden.com-ui-web/scripts/sync-ui.mjs . COMMIT_SHA`, replacing `COMMIT_SHA` with the full 40-character commit SHA to use. Commit the updated `vendor/ui/` files and `shared-ui.json`. This maintenance command requires Node.js 22 or later and an internet connection.

This repository checks JavaScript syntax on push and pull requests. With Node.js 22 or later, run the same checks locally:

```sh
node --check script.js
node --check vendor/ui/ui.js
```

The hosted application is assembled and published through [tools.oz-coden.com](https://github.com/oz-coden/tools.oz-coden.com). Its publication workflow applies the shared UI to all tools and runs browser integration checks. See that repository for deployment instructions.

## LICENSE

This project is released under the [MIT License](LICENSE).

## CREDIT

Shared styles, navigation and themes: [oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web).

The initial implementation was adapted from the [nexus-search tool](https://github.com/oz-coden/oz-coden.github.io/tree/dfc7c0a29396e2114d73e99dd17d494f7ab1c5ee/tools/nexus-search) in oz-coden.github.io. This repository contains the source needed to run and modify the application independently.

---

# Nexus Search

## 目次

1. [概要](#概要)
2. [開発背景](#開発背景)
3. [機能](#機能)
4. [前提・依存](#前提依存)
5. [導入方法](#導入方法)
6. [ライセンス](#ライセンス)
7. [クレジット](#クレジット)

## 概要

検索エンジンの切り替え、詳細検索、直近の検索履歴、ブックマークをひとつの画面にまとめたブラウザ用ツールです。

[Playgroundはこちら！](https://tools.oz-coden.com/nexus-search/)

## 開発背景

普段の検索やよく使うサイトへの移動をひとつの画面から行い、設定をブラウザ内で管理できることを目的としています。

## 機能

- 検索エンジンの切り替え  
  Google・Bing・Brave・DuckDuckGo・Yahoo Japanを選べます。
- 詳細検索  
  すべて含む語句、完全一致、いずれかを含む語句、除外語句、サイト指定から検索クエリを組み立てます。検索演算子の対応状況は、選択した検索エンジンによって異なります。
- 直近の検索履歴  
  重複を除いた直近8件の検索クエリを、検索欄から再利用できます。
- ブックマーク  
  サイト名とHTTP/HTTPSのURLを登録し、別タブで開けます。削除時には確認画面を表示します。
- キーボード操作  
  入力欄以外で`/`を押すと検索欄へ移動します。検索欄ではEnterで検索し、Escで履歴を閉じられます。
- 設定の保存と共通テーマ  
  検索エンジン・履歴・ブックマークをlocalStorageに保存し、共通のライト・ダークテーマを利用できます。

## 前提・依存

- JavaScriptが有効で、HTMLのdialog要素に対応した最新のWebブラウザ。
- 外部の検索サービスやブックマーク先を利用するためのインターネット接続。
- 設定・履歴・ブックマークを再読み込み後も保持するためのlocalStorageへのアクセス。

画面の言語は日本語です。共通UIのファイルはこのリポジトリに同梱しています。Python 3は下記のローカルサーバーのコマンドを使う場合に必要で、同等の静的HTTPサーバーでも実行できます。

## 導入方法

1. このリポジトリをクローンまたはダウンロードし、フォルダ構成を保ちます。
2. リポジトリのルートで静的HTTPサーバーを起動します。Python 3を利用する場合は、次のコマンドを実行します。

   ```sh
   python -m http.server 8000
   ```

3. ブラウザで`http://localhost:8000/`を開きます。

アプリ本体はリポジトリのルートにあります。実行には静的なHTML・CSS・JavaScriptだけを使い、Node.jsの実行環境・APIサーバー・ビルド工程は不要です。

検索クエリの組み立てやブックマークの管理はブラウザ内で行います。検索を実行すると、選択した外部の検索エンジンにクエリを送信します。ブックマークを開く場合も、そのサイトへの通信が発生します。このアプリ独自の検索用バックエンドやアカウント同期サービスはありません。

### 使い方

1. **設定**で検索エンジンを選び、**検索キーワード**に入力してEnterまたは**検索**を押します。選択した検索サービスの結果を別タブで開きます。
2. 詳細な条件を指定する場合は、**詳細検索**に入力して**詳細検索を実行**を押します。複数の完全一致フレーズはカンマで、候補語・除外語・複数のサイトは空白で区切ります。
3. ブックマークを登録するには**＋ 追加**を押し、**サイト名**と**URL**を入力して**保存**を押します。スキームのないURLはHTTPSとして扱います。
4. ブックマークのサイト名でページを開きます。削除する場合は、そのカードの**×**、**削除する**の順に押します。

検索設定・履歴・ブックマークは、利用中のブラウザとオリジンに保存します。ブラウザ間やドメイン間での同期は行いません。localStorageが利用できない場合や容量不足の場合も、開いている画面では変更を利用でき、保存できないことを画面に表示します。

### 開発と公開

アプリ固有の処理は`script.js`、レイアウトは`style.css`で管理します。共通のスタイル・ナビゲーション・テーマ切り替えは、[oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web)から`vendor/ui/`へ同梱しています。取得元のコミットとファイルハッシュは`shared-ui.json`に記録しており、実行時に共通UIリポジトリへアクセスする必要はありません。

同梱の共通UIを更新するには、このリポジトリと同じ親フォルダに共通UIリポジトリをクローンします。このアプリのルートで`node ../oz-coden.com-ui-web/scripts/sync-ui.mjs . COMMIT_SHA`を実行し、`COMMIT_SHA`を取り込む版の40桁のコミットSHAに置き換えてください。更新された`vendor/ui/`のファイルと`shared-ui.json`をコミットします。この保守用コマンドには、Node.js 22以降とインターネット接続が必要です。

このリポジトリでは、pushとプルリクエスト時にJavaScriptの構文を検査します。Node.js 22以降を利用すると、同じ検査をローカルでも実行できます。

```sh
node --check script.js
node --check vendor/ui/ui.js
```

公開用のアプリは、[tools.oz-coden.com](https://github.com/oz-coden/tools.oz-coden.com)で組み立てて配信します。公開処理では、全ツールに共通UIを適用し、ブラウザでの統合検査を行います。公開手順は同リポジトリを参照してください。

## ライセンス

This project is released under the [MIT License](LICENSE).

## クレジット

共通のスタイル・ナビゲーション・テーマ：[oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web)。

初期実装は、oz-coden.github.ioの[nexus-searchツール](https://github.com/oz-coden/oz-coden.github.io/tree/dfc7c0a29396e2114d73e99dd17d494f7ab1c5ee/tools/nexus-search)を元にしています。このリポジトリには、単独でアプリを実行・変更するためのソースを含めています。
