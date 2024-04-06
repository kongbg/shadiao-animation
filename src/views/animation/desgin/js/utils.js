export const speak = (option ={}) => {
    let { url, duration } = option;
    if (window.captureCtx) {
        console.log('captureCtx')
        let currentTime = window.captureCtx.currentTime;
        console.log('currentTime:', currentTime)
        window.captureCtx.addAudio(
            {
                url,
                startTime: currentTime,
                endTime: currentTime + duration
            }
        )
    } else {
      console.log('非captureCtx:', url)
        let audio = window.document.createElement('audio');
        audio.src = url;
        audio.play()
    }
}


export function deepClone(source) {
    // fix: FormData
    if (source instanceof FormData) {
      return source;
    }
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

export function generateUniqueID() {
    let uniqueID = Math.floor(Math.random() * Date.now()).toString(36);
    return uniqueID;
}