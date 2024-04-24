
import { Container } from 'pixi.js'
export default class Scene {
constructor(options = {}) {
    // 合并参数
    Object.assign(this, options)
    return this.init()
  }

  // 初始化
  async init() {
    return new Promise(resolve=>{
      let scene = new Container()
        setTimeout(()=>{
            console.log('3')
            resolve('123')
        }, 1000)
    })
  }
}
