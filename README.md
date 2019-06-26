# 概要

# 仕様書

## 画面設計

今のところなし

## API設計

### エンドポイント一覧

#### ベースURL: /api/v1

| 概要       | 　    URL                 | メソッド |
| -------- | ------------------------ | ---- |
| ユーザ情報の取得 | /users/:user_id          | GET  |
| ユーザ情報の登録 | /users                   | POST |
| ユーザ情報の更新 | /users/:user_id          | POST |
| 部屋一覧の取得　 | /rooms/                  | GET  |
| メッセージの取得 | /rooms/:room_id/messages | GET  |
| メッセージの投稿 | /rooms/:room_id/messages | POST |

##### ユーザ情報の取得(サンプル)

-   APIのエンドポイント  

        http://example.com/api/v1/users/1

-   APIレスポンス

    ```json
    {
      // number型 ユーザ固有の番号
      "id": 1,
      // 必須 string型 ユーザ固有のID
      "user_id": "testhoge1234",
      // 必須 string型 ユーザ名
      "name": "情報太郎"
    }
    ```

-   サンプルコード

    ```js
    fetch(API_ORIGIN_URL + "/api/v1/users/1")
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        console.log(json);
      });
    ```

##### ユーザ情報の登録(サンプル)

-   APIのエンドポイント  

        http://example.com/api/v1/users/

-   リクエストパラメータ

    ```json
    {
      // 必須 string型 ユーザ固有のID
      "user_id": "testfuga1234",
      // 必須 string型 ユーザ名
      "name": "情報次郎"
    }
    ```

-   APIレスポンス

    ```json
    {
      // number型 ユーザ登録が成功したか
      "status": 200,
    }
    ```

-   サンプルコード

    ```js
    const requestParams = {
      body : JSON.stringify({
        "user_id": "testfuga1234",
        "name": "情報次郎"
      })
    };

    fetch(API_ORIGIN_URL + "/api/v1/users", requestParams)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        console.log(json);
      });
    ```

## データベース設計

### 基本

-   MySQL5系以上
-   エンコーディング UTF-8

### user

| カラム名    | データ型         | NULLを許可 | 主キー   | ユニーク  | 外部キー | 備考  |
| ------- | ------------ | ------- | ----- | ----- | ---- | --- |
| id      | unsigned int | false   | true  | false |      | AI  |
| user_id | varchar(50)  | false   | false | true  |      |     |
| name    | varchar(20)  | false   | false | false |      |     |
|         |              |         |       |       |      |     |

### room

| カラム名    | データ型         | NULLを許可 | 主キー   | ユニーク  | 外部キー | 備考  |
| ------- | ------------ | ------- | ----- | ----- | ---- | --- |
| id      | unsigned int | false   | true  | false |      | AI  |
| room_id | unsigned int | false   | false | true  |      | AI  |
| name    | varchar(20)  | false   | false | false |      |     |
|         |              |         |       |       |      |     |

### message

| カラム名       | データ型         | NULLを許可 | 主キー   | ユニーク  | 外部キー         | 備考  |
| ---------- | ------------ | ------- | ----- | ----- | ------------ | --- |
| id         | unsigned int | false   | true  | false |              | AI  |
| message_id | unsigned int | false   | false | true  |              | AI  |
| user_id    | varchar(20)  | false   | false | false | user.user_id |     |
| room_id    | unsigned int | false   | false | false | room.room_id |     |
| message    | varchar(140) | false   | false | false |              |     |
|            |              |         |       |       |              |     |
