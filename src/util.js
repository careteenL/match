import {
  isString,
  isObject,
  isFunction
} from '@careteen/is'

export function isTemplate(v) {
  return isString(v) && /\{\{([^\}]+)\}}/.test(v)
}

export function hasOwn(object, p) {
  return Object.prototype.hasOwnProperty.call(object, p)
}

export function map(src, rules, config) {
  let out = config.fill ? Object.assign({}, src) : {}
  // 如需过滤，先过滤原对象
  if (config.filter) {
    for (let skey in src) {
      if (config.filter.indexOf(src[skey]) >= 0) {
        delete out[skey]
      }
    }
  }
  // 根据规则转化
  for (let rkey in rules) {
    let rule = rules[rkey]
    try {
      if (isFunction(rule)) {
        out[rkey] = rule.call({}, src) // 注入参数$scope为当前对象
      } else if (isTemplate(rule)) {
        let exp = rule.replace(/\{\{/g, 'src.').replace(/\}\}/g, '')
        out[rkey] = eval('' + exp + '') // eval！！简单表达式
      } else if (isObject(rule)) {
        out[rkey] = map({}, rule, config) // 对象递归转换
      } else {
        out[rkey] = rule // 默认不转换
      }
      // 如需过滤，转化完后再过滤
      if (config.filter && config.filter.indexOf(out[rkey]) >= 0) {
        delete out[rkey]
      }
    } catch (e) {
      console.error(e)
      // 这种异常开发阶段规避不了，所以需要确保异常数据OK
      if (config.filter.indexOf(null) >= 0) {
        delete out[rkey]
      } else {
        out[rkey] = null
      }
    }
  }
  return out
}