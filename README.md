# [match](https://github.com/careteenL/match)
[![](https://img.shields.io/badge/Powered%20by-match-brightgreen.svg)](https://github.com/careteenL/match)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/careteenL/match/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/careteenL/match.svg?branch=master)](https://travis-ci.org/careteenL/match)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/@careteen/match)
[![NPM downloads](http://img.shields.io/npm/dm/@careteen/match.svg?style=flat-square)](http://www.npmtrends.com/@careteen/match)

[English Document](./README.en_US.md)

对象/数组属性映射 主要解决前后端并行开发或前端先行开发带来的命名不统一问题

## 快速使用

NPM
```shell
npm i -D @careteen/match
```

```js
import Match from '@careteen/match'
import { isEqual } from '@careteen/is'
let preData = {
  name: 'careteen',
  age: 22
}
let expectData = {
  realName: 'careteen',
  realAge: 22
}
let actualData = Match(preData, {
  'realName': '{{name}}',
  'realAge': '{{age}}'
})

isEqual(actualData, expectData) // true

```

or CDN
```js
<script src='https://unpkg.com/@careteen/match/dist/index.js'></script>
<script src='https://unpkg.com/@careteen/is/dist/index.js'></script>
<script>
  var Is = window['@careteen/is']
  var Match = window['@careteen/match']

  var preData = {
    name: 'careteen',
    age: 22
  }
  var expectData = {
    realName: 'careteen',
    realAge: 22
  }
  var actualData = Match(preData, {
    'realName': '{{name}}',
    'realAge': '{{age}}'
  })

  Is.isEqual(actualData, expectData) // true  
</script>
```
更详细使用请查看[API](./doc/api.md)

## 兼容性

IE9+

## 使用文档

- [API](./doc/api.md)
- [对该库的源码解析](xxx)

## issue模板

- [Issue Template](./ISSUETEMPLATE.md)

## 贡献者及指南

clone仓库并引入依赖
```shell
git clone git@github.com:careteenL/match.git
npm install
```
开始开发：）

...

编写详细使用文档介绍功能，可在本地查看`http://127.0.0.1:8880`
```shell
npm run doc
```
请编写单元测试覆盖所加功能
```shell
npm run test
```
启动本地服务器编写示例
```shell
npm run example
```
修改`package.json README.md CHANGELOG.md`版本号，再发布
```shell
npm run release
```

- [Contributors](https://github.com/careteenL/match/graphs/contributors)

## 更新日志

- [Changelog](./CHANGELOG.md)

## 计划

- [Todo](./TODO.md)