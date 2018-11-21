# 文档

## 目录

- [描述](#描述)
- [语法](#语法)
  - [参数](#参数)
  - [返回值](#返回值)
- [示例](#示例)
  - [对象简单映射](#对象简单映射)
  - [对象数组简单映射](#对象数组简单映射)
  - [对象简单映射并填充](#对象简单映射并填充)
  - [对象简单映射并过滤null/''/undefined](#对象简单映射并过滤null/''/undefined)
  - [对象映射自定义属性](#对象映射自定义属性)

## 描述

该库提供 对象/数组属性映射，主要解决前后端并行开发或前端先行开发带来的命名不统一问题

## 语法

### 参数

- `{Object|Array} src` 源对象
- `{Object|} rules` 描述匹配规则的对象
- `{Object} config` fill:填充, filter: 过滤 {fill: true, filter: [null, '']}

### 返回值

- `{Object|Array}` 不污染源对象

### 示例

#### 对象简单映射
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

#### 对象数组简单映射
```js
import Match from '@careteen/match'
import { isEqual } from '@careteen/is'

let preData = [{
  name: 'careteen',
  age: 22      
}, {
  name: 'lanlan',
  age: 22      
}]
let expectData = [{
  realName: 'careteen',
  realAge: 22      
}, {
  realName: 'lanlan',
  realAge: 22      
}]
let actualData = Match(preData, {
  'realName': '{{name}}',
  'realAge': '{{age}}'
})

isEqual(actualData, expectData) // true
```

#### 对象简单映射并填充
```js
import Match from '@careteen/match'
import { isEqual } from '@careteen/is'

let preData = {
  name: 'careteen',
  age: 22
}
let expectData = {
  name: 'careteen',
  age: 22,
  realName: 'careteen',
  realAge: 22
}
let actualData = Match(preData, {
  'realName': '{{name}}',
  'realAge': '{{age}}'
}, {
  fill: true
})

isEqual(actualData, expectData) // true
```

#### 对象简单映射并过滤null/''/undefined
```js
import Match from '@careteen/match'
import { isEqual } from '@careteen/is'

let preData = {
  name: 'careteen',
  age: 22,
  sex: '',
  eat: null,
  shopping: undefined
}
let expectData = {
  realName: 'careteen',
  realAge: 22
}
let actualData = Match(preData, {
  'realName': '{{name}}',
  'realAge': '{{age}}',
  'realSex': '{{sex}}',
  'realEat': '{{eat}}',
  'realShopping': '{{shopping}}'
}, {
  filter: [null, '', undefined]
})

isEqual(actualData, expectData) // true
```

#### 对象映射自定义属性
```js
import Match from '@careteen/match'
import { isEqual } from '@careteen/is'

let preData = {
  name: 'careteen',
  age: 22
}
let expectData = {
  realName: 'careteen.Wang',
  realAge: 22
}
let actualData = Match(preData, {
  'realName': $scope => {
    return `${$scope.name}.Wang` 
  },
  'realAge': '{{age}}'
})

isEqual(actualData, expectData) // true
```