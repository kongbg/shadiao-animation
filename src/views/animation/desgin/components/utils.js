

export function speak(str) {
    return new Promise((resolve, reject) => {
        // console.log('getVoices:', window.speechSynthesis.getVoices())
        // 创建一个新的SpeechSynthesisUtterance对象
        const utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'zh-CN'; // 设置语言为中文
        utterance.text = str; // 设置要读出的文本

        // 使用默认的语音合成器进行朗读
        speechSynthesis.speak(utterance);
        utterance.onend = () => {
            resolve(true)
        }
    })
}

export function sleep(delay = 100) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}


// 唯一id
export function generateUniqueID() {
    let uniqueID = Math.floor(Math.random() * Date.now()).toString(36);
    return uniqueID;
}


/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  }
  
  /**
 * 节流函数
 */
export function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            func(...args);
            lastCall = now;
        }
    };
  }