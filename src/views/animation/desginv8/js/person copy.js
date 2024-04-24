
export default class Person {
constructor(options = {}) {
    // 合并参数
    Object.assign(this, options)
    console.log('1')
    this.init()
    console.log('4')
  }

  // 初始化
  async init() {
    return new Promise(resolve=>{
        console.log('2')
        setTimeout(()=>{
            console.log('3')
            resolve('123')
            return this
        }, 1000)
    })
  }
}
