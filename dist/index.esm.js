/*!
 * @careteen/match v0.2.0
 * (c) 2018-2018 careteenL <15074806497@163.com>
 * Released under the MIT License.
 */
import { isString, isObject, isFunction, isArray } from '@careteen/is';

function isTemplate(v) {
  return isString(v) && /{{([^}]+)}}/.test(v);
}

function map(src, rules, config) {
  var out = config.fill ? Object.assign({}, src) : {};
  // 如需过滤，先过滤原对象
  if (config.filter) {
    for (var skey in src) {
      if (config.filter.indexOf(src[skey]) >= 0) {
        delete out[skey];
      }
    }
  }
  // 根据规则转化
  for (var rkey in rules) {
    var rule = rules[rkey];
    try {
      if (isFunction(rule)) {
        out[rkey] = rule.call({}, src); // 注入参数$scope为当前对象
      } else if (isTemplate(rule)) {
        var exp = rule.replace(/{{/g, 'src.').replace(/}}/g, '');
        out[rkey] = eval('' + exp + ''); // eval！！简单表达式
      } else if (isObject(rule)) {
        out[rkey] = map({}, rule, config); // 对象递归转换
      } else {
        out[rkey] = rule; // 默认不转换
      }
      // 如需过滤，转化完后再过滤
      if (config.filter && config.filter.indexOf(out[rkey]) >= 0) {
        delete out[rkey];
      }
    } catch (e) {
      console.error(e);
      // 这种异常开发阶段规避不了，所以需要确保异常数据OK
      if (config.filter.indexOf(null) >= 0) {
        delete out[rkey];
      } else {
        out[rkey] = null;
      }
    }
  }
  return out;
}

function _validConfig(config) {
  if (!isObject(config)) {
    throw new Error('第三个参数-配置必须为object类型, {fill: false, filter:[null]}');
  }
  if (config.filter && !isArray(config.filter)) {
    throw new Error('第三个参数-配置filter项必须为Array类型, {fill: false, filter:[null]}');
  }
  return true;
}

/**
 * @desc 对象/数组属性映射 主要解决前后端并行开发或前端先行开发带来的命名不统一问题
 * @param {Object|Array} src 源对象
 * @param {Object} rules 描述匹配规则的对象
 * @param {Object} config fill:填充, filter: 过滤 {fill: true, filter: [null, '']}
 * @return {Object|Array}
 */

function match() {
  var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rules = arguments[1];
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { fill: false, filter: [] };

  var out = [];

  if (!_validConfig(config)) ;

  if (isArray(rules)) {
    // match(data, ['id'])
    if (!isArray(src)) {
      src = [src];
    }
    src.forEach(function (skey) {
      if (config.filter.indexOf(skey[rules[0]]) < 0) {
        out.push(skey[rules[0]]);
      }
    });
    return out;
  }

  if (isArray(src)) {
    // match(data, {pid: '{{id}}'})
    src.forEach(function (s, sIdx) {
      // #1217 为数组每项新增下标标识
      s._index = sIdx;
      out.push(map(s, rules, config));
    });
  } else {
    out = {};
    out = map(src, rules, config);
  }
  return out;
}

export default match;
