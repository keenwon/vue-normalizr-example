# Fetch 使用文档

fetch 是全局通过的 ajax 方法，基于浏览器原生的 fetch 方法实现，同时实现接口响应数据自动 normalize，自动更新 store 等功能。

目录:

<!-- TOC -->

- [1. 几个概念](#1-几个概念)
    - [1.1. Request 对象](#11-request-对象)
    - [1.2. Init 对象](#12-init-对象)
    - [1.3. Normalize](#13-normalize)
- [2. 例子](#2-例子)
    - [2.1. GET](#21-get)
    - [2.2. POST](#22-post)
- [3. 参考](#3-参考)

<!-- /TOC -->

## 1. 几个概念

### 1.1. Request 对象

fetch 请求需要事先定义`Request`，`Request`对象用来描述请求的具体信息，接口描述：

```typescript
import { Schema } from 'normalizr';

interface IFetchRequest {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  schema?: Schema
};
```

其中 `schema` 用来描述接口返回值的结构，并且根据此结构自动将返回值执行 `normalize`，具体参考 normalize 章节。

### 1.2. Init 对象

`Init` 对象继承自浏览器原生的 `RequestInit` 对象：

```typescript
export interface IFetchInit extends RequestInit {
  params?: object;
};
```

额外的 `params` 参数用来填充 named url，详情见示例。

### 1.3. Normalize

数据的 normalize 操作主要依赖 [normalizr](https://github.com/paularmstrong/normalizr)，具体使用可以参考官方文档。一个简单的例子：

假如接口的返回数据是这样的：

```json
{
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
}
```

其中 `author` 和 `comments.commenter` 都是一个用户，并且可能是同一个用户。直接使用这样的数据，会造成数据层缓存数据冗余，带来使用上的不便。例如当更新用户名时，可能需要手动更新多处。

为了解决这个问题，我们引入了 normalizr，执行 normalize 操作后，数据变成这样：

```js
import { normalize, schema } from 'normalizr';

// 定义 User
const user = new schema.Entity('users');

// 定义 Comment
const comment = new schema.Entity('comments', {
  commenter: user
});

// 定义 article 
const article = new schema.Entity('articles', { 
  author: user,
  comments: [ comment ]
});

// 执行 normalize
const normalizedData = normalize(originalData, article);

console.log(normalizedData)

/**
{
  result: "123",
  entities: {
    "articles": { 
      "123": { 
        id: "123",
        author: "1",
        title: "My awesome blog post",
        comments: [ "324" ]
      }
    },
    "users": {
      "1": { "id": "1", "name": "Paul" },
      "2": { "id": "2", "name": "Nicole" }
    },
    "comments": {
      "324": { id: "324", "commenter": "2" }
    }
  }
}
*/
```

在 fetch 方法中，如果 `Request` 对象定义了 `schema`, fetch 会自动执行 normalize，并且返回 `result` 部分，`entities` 部分则自动保存在 store 中。

## 2. 例子

### 2.1. GET

使用 named url：

```typescript
// 定义 Request 对象
const userItemRequest: IFetchRequest = {
  method: 'GET',
  url: '/api/user/:userId',
  schema: userSchema
};

let options: IFetchInit = {
  params: {
    userId: 123
  }
};

/**
 * GET /api/user/123
 */
return fetch(userItemRequest, options)
  .then(data => {
    // ...
  });
```

使用 query string：

```typescript
// 定义 Request 对象
const userItemRequest: IFetchRequest = {
  method: 'GET',
  url: '/api/user',
  schema: userSchema
};

let options: IFetchInit = {
  body: {
    userId: 123
  }
};

/**
 * GET /api/user/?userId=123
 */
return fetch(userItemRequest, options)
  .then(data => {
    // ...
  });
```

### 2.2. POST

```typescript
// 定义 Request 对象
const userUpdateRequest: IFetchRequest = {
  method: 'POST',
  url: '/api/user',
  schema: userSchema
};

let options: IFetchInit = {
  body: JSON.stringify({
    name: 'zhang san',
    age: 123
  })
};

/**
 * POST /api/user/123
 * Body "{"name":"zhang san","age":123}"
 */
return fetch(userUpdateRequest, options)
  .then(data => {
    // ...
  });

```

## 3. 参考

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
