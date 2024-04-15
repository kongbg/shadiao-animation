// 校准定时器偏差
export const TsetInterval = (fn, interval) => {
  let start = new Date().getTime()
  let offset = 0
  let next = interval
  let count = 0
  let timer = setTimeout(inner, offset)
  function inner() {
    count++
    // 偏差
    fn()
    offset = new Date().getTime() - (start + count * interval)
    next = interval - offset
    if (next < 0) {
      timer = setTimeout(inner, 0)
    } else {
      timer = setTimeout(inner, next)
    }
  }
  return function clearInterval() {
    clearTimeout(timer)
  }
}

// 唯一id
export function generateUniqueID() {
  let uniqueID = Math.floor(Math.random() * Date.now()).toString(36)
  return uniqueID
}
// 获取扩展名
export function getExtname(fullpath) {
  const root = fullpath.split(/[\\/]/).pop()
  const pos = root.lastIndexOf('.')
  return root === '' || pos < 1 ? '' : root.slice(pos + 1)
}

/**
 * 同步等待
 * @param {string} delay 等待时间 毫秒
 * @returns {Boolean}
 */
export function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

// 返回项目路径
export function getNormalPath(p) {
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  }
  let res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}

/**
 * 判断path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  // fix: FormData
  if (source instanceof FormData) {
    return source
  }
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 加载本地图片地址
 * @param {*} path 例如：assets/images/bg1.jpeg
 * @returns
 */
export function getImgUrl(path) {
  const moduleURL = new URL(import.meta.url)
  return new URL(`../${path}`, moduleURL).href
}
export function getImgUrlV2(path) {
  return new URL(`${path}`, import.meta.url).href
}

/**
 * 节流函数
 */
export function throttle(func, delay) {
  let lastCall = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - lastCall >= delay) {
      func(...args)
      lastCall = now
    }
  }
}

export function speak() {}
