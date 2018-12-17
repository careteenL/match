/**
 * @desc 对象/数组属性映射 主要解决前后端并行开发或前端先行开发带来的命名不统一问题
 * @param {Object|Array} src 源对象
 * @param {Object} rules 描述匹配规则的对象
 * @param {Object} config fill:填充, filter: 过滤 {fill: true, filter: [null, '']}
 * @return {Object|Array}
 */ 
import { isArray } from '@careteen/is'

import { map } from './util'

import { _validConfig } from './validate'

export default function match(
  src = {},
  rules,
  config = { fill: false, filter: [] }
) {
  let out = []

  if (!_validConfig(config)) {
    return
  }

  if (isArray(rules)) {
    // match(data, ['id'])
    if (!isArray(src)) {
      src = [src]
    }
    src.forEach(skey => {
      if (config.filter.indexOf(skey[rules[0]]) < 0) {
        out.push(skey[rules[0]])
      }
    })
    return out
  }

  if (isArray(src)) {
    // match(data, {pid: '{{id}}'})
    src.forEach((s, sIdx) => {
      // #1217 为数组每项新增下标标识
      s._index = sIdx
      out.push(map(s, rules, config))
    })
  } else {
    out = {}
    out = map(src, rules, config)
  }
  return out
}
