# API文档

## socket数据传输格式

```json
{
  "meta":<string>,
  "payload":<object>
}
```

## http response格式

```json
{
  "status":"success"|"error",
  "payload":<any>
}
```

## `POST` subscribe

request:

```json
{
  "_id":"xxxxxxxx"
}
```

response:

```
null
```

## `POST` unsubscribe

```json
{
  "_id":"xxxxxxxx"
}
```

response:

```
null
```

## `C->S` requestInit

## `S->C` init

## `S->C` change

## `C->S` change