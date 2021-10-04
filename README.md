# review-collection

## Markdown の書き方

# 見出し

```markdown
# 見出し 1

## 見出し 2

### 見出し 3

#### 見出し 4

##### 見出し 5

###### 見出し 6
```

# リスト

```markdown
- Review
- Collection
  - ポリゴン
  * ウェイブ
```

- Review
- Collection
  - ポリゴン
  * ウェイブ

リストを表示させるには、`-`または`*`を使います。

## 番号リスト

```markdown
1. Review
2. Collection
   1. ポリゴン
   2. ウェイブ
```

1. Review
2. Collection
   1. ポリゴン
   2. ウェイブネストさせる場合は、`スペース4つ`を先頭に入力します。

# テキストリンク

```markdown
[アンカーテキスト](リンクのURL)
```

[アンカーテキスト](リンクのURL)

# 画像

```markdown
![altテキスト](https://画像のURL)
```

画像を挿入するときは、`画面右`(PC の場合)または`下部`（SP の場合）にある画像アイコンをクリックすることで、挿入することが可能です。

![](https://firebasestorage.googleapis.com/v0/b/review-collection-8edce.appspot.com/o/images%2FE4zZwcd97ePzLPZr_DSCF2230.jpg?alt=media&token=8b1b91eb-3945-40e9-93e5-1014941b5b49)

## キャプションをつける

```markdown
![](https://画像のURL)
_キャプション_
```

![](https://firebasestorage.googleapis.com/v0/b/review-collection-8edce.appspot.com/o/images%2FE4zZwcd97ePzLPZr_DSCF2230.jpg?alt=media&token=8b1b91eb-3945-40e9-93e5-1014941b5b49)
_キャプション_

キャプションは、画像投稿のすぐ下の行に`*キャプションです*`のように配置すれば表示することができます。

## 画像にリンクを貼る

```markdown
[![altテキスト](画像のURL)](リンクのURL)
```

画像に対してリンクを貼ることもできます。

# テーブル

| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |

# コードブロック

コードは、「」で挟むことでブロックとして挿入できます。また、先頭の「」のあとに言語を指定すれば、コードに装飾が適応されます。

```js
// 例　jsのシンタックスハイライト
const hoge = () => {
  console.log("hogehoge");
};
```

## ファイル名を表示する

`言語:ファイル名`のように、`:`で区切り、ファイル名を入力することで、ファイル名がコードブロックの上部に表示されるようになります。

```js:index.js
const hoge = () => {  console.log("hogehoge")}
```

# 引用

```markdown
> 引用分
>
> > 引用分
```

> 引用文
>
> > 引用文

# 区切り線

```markdown
---
```

---

# インラインスタイル

```markdown
_イタリック_
**太字**
~~打ち消し線~~
インラインで`code`を挿入する
```

_イタリック_  
**太字**  
~~打ち消し線~~  
インラインで`code`を挿入する

# 改行

改行をする際には、文末に`スペース2つ`を入力してください。  
エンターキーを押して改行しても反映されないので、ご注意ください。（対応予定）

# まとめ

こんな機能が欲しい！や使いづらい...などありましたら、ご連絡ください。GitHub の issue に投げていただけると随時対応させていただきます。
[Review-Collection](https://github.com/shouyamamoto/review-collection)
