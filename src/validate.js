import {
  isObject,
  isArray
} from '@careteen/is'

export function _validConfig(config) {
  if (!isObject(config)) {
    throw new Error(
      '第三个参数-配置必须为object类型, {fill: false, filter:[null]}'
    )
  }
  if (config.filter && !isArray(config.filter)) {
    throw new Error(
      '第三个参数-配置filter项必须为Array类型, {fill: false, filter:[null]}'
    )
  }
  return true
}