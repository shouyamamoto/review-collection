## アプケーション名

Review Collection

![ogp](https://user-images.githubusercontent.com/59443014/142791101-cd318e0d-f1dd-4fce-bcaa-f3a458a56209.png)

## アプリケーション概要

Review Collection は、「レビューした、された」内容を投稿するアプリです。

## URL

https://review-collection-8edce.web.app/

## 利用方法

Google または Github アカウントでログインを行います。  
ログインを行うと Google または Github アカウントの情報を用いてユーザ登録を行います。
また、ログインをせずに閲覧することも可能ですが、一部機能に制限があります。
（ログインしない場合には、記事投稿、いいね、Twitter への共有、記事へのコメント機能が使えません。）

## 目指した課題解決

1. 同じ課題に取り組んだ方が、どういったレビューをされたのかを知りたい

私が所属している**もりけん塾**では、先生が作成された課題を解くことで基本的な JavaScript の知識を身につけていくというスタンスで運営されています。  
そして、課題を提出すると先生からレビュー ▶︎ 修正 ▶︎ 再提出 ▶︎ ... といった、現場に近い形で学習を進めていきます。  
塾生は同じ課題に取り組みますが、書くコードは人によって異なります。それに伴ってレビューも変わります。

しかし、自分が書いたコードだけでは視野が狭くなりがちだと感じ、他の塾生が書いたコードやレビューを参考にして「そんな書き方があるんだ」「このメソッドは知らなかった」などと、新しい知識をインプットすることができます。

同じ課題に取り組んでいるため、他の方のコードを見ても「処理が追えない」、「何をしているのかが分からない」などといった問題も少なく、新しい知識を身に着けることができます。

2. 一つの場所にレビューの知見を溜めておける
3. 同じような課題クリア型のコミュニティーでも使えるサービス

## 仕様技術

- React 17.0.2
- TypeScript 4.1.5
- Redux 7.2.0
- Redux Toolkit 1.5.1
- firebase 8.10.0  
  authentication, Firestore, Storage, Hosting

## 機能一覧

- ユーザログイン機能（Google, Github）
- 投稿機能（Markdown, 画像投稿）
- 記事検索機能
- いいね機能
- コメント機能
- 無限スクロール

## 使用ライブラリ

- react-helmet  
  動的な title, meta タグの生成に使用
- react-hot-toast  
  ユーザ登録、記事投稿・削除などのアクションを行った際のフィードバックに使用
- react-image-file-resizer  
  クライアント側で画像のリサイズ（縮小）を行ったものをプレビュー画像として表示するために使用
- react-infinite-scroller  
  Top ページでは、記事を 18 件取得し、スクロールに伴って 18 件を繰り返し取得する機能を実装
- react-markdown, react-syntax-highlighter  
  レビューまとめサイトなので、**Markdown 記法**でかけること、**コードが書ける**機能を実装するために使用
- remark-gfm  
  GitHub が追加するマークダウンの拡張機能を使用するために使用
- react-share  
  Twitter へのシェア機能を追加するために使用

## 開発するにあたり、注力したところ

1. ユーザビリティーをあげる

- ローディング時のローディングアイコンの表示

https://user-images.githubusercontent.com/59443014/142792588-eb78b3a6-ddd9-4e27-af0e-084a2647520d.mov

- Twitter や github アイコン、記事投稿時のボタンなどにホバーするとリンク先やアクションが表示される

https://user-images.githubusercontent.com/59443014/142792547-1622fe6f-f7b8-4eff-addf-d895fa56f18f.mov

https://user-images.githubusercontent.com/59443014/142792492-07a41e99-37ef-4d73-9aca-9dc9310014df.mov

- ログイン、記事投稿・削除を行うと Toast を出してアクションの完了をフィードバックする

https://user-images.githubusercontent.com/59443014/142793246-c700aa6a-7266-4d64-ad60-1bcd3ef01271.mov

- フォームへの入力中、意図しない値の場合にエラーメッセージを強調させる

https://user-images.githubusercontent.com/59443014/142793742-19fc28f0-8207-4a24-8871-32a3cf2fcde3.mov

2. 画像の圧縮機能

- firestore の無料枠が 5GB の制限があるため
- 記事表示時の読み込み速度の高速化

3. 記事投稿を Markdown 形式にした

類似サービスである、Qiita や Zenn と同じように Markdown 記法にすることにより、同じような感覚でサービスを使用してもらえるようにしました。
