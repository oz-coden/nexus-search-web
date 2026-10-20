# Nexus Search

[ブラウザで使う](https://tools.oz-coden.com/nexus-search/)

検索エンジンを切り替えて検索できるブラウザ用ツールです。詳細検索、直近8件の履歴、ブックマークの追加・削除、`/`キーでの検索欄への移動に対応します。

## 実行方法

1. このリポジトリをクローンまたはダウンロードし、フォルダ構成を保ちます。
2. リポジトリのルートで `python -m http.server 8000` を実行します（Python 3が必要です）。
3. ブラウザで `http://localhost:8000/` を開きます。

実行時は静的なHTML・CSS・JavaScriptだけを使います。Node.jsやAPIサーバー、ビルド工程は不要です。入力内容の処理はブラウザ内で行います。

## 仕様

検索は選択した外部サービスを別タブで開きます。ブックマークにはHTTP/HTTPSのURLを指定できます。設定・履歴・ブックマークは同一オリジンのlocalStorageに保存されます。保存できない場合は画面に表示します。

## 共通UI

`vendor/ui/` は [oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web) の配布用コピーです。利用するコミットとファイルハッシュは `shared-ui.json` に記録しています。個別のレイアウトは `style.css` で管理します。

共通UIを更新する場合は、共通UIリポジトリの `scripts/sync-ui.mjs` を使い、取り込んだファイルとメタデータをコミットしてください。配布用コピーを同梱しているため、実行時に共通UIリポジトリへアクセスする必要はありません。

## ソースの来歴

初期実装は [oz-coden.github.io](https://github.com/oz-coden/oz-coden.github.io) のコミット `dfc7c0a29396e2114d73e99dd17d494f7ab1c5ee` にあるツールを元にしています。このリポジトリで単独実行・変更できます。
