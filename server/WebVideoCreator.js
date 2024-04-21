import WebVideoCreator, {
  VIDEO_ENCODER,
  logger,
  AUDIO_ENCODER
} from 'web-video-creator'
export const exportVideo = (playload) => {
  console.log('playload', playload)
  if (!playload.url) {
    console.log('请传入url')
    return
  }
  async function sleep(delay = 100) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, delay)
    })
  }
  return new Promise((resolve, reject) => {
    const wvc = new WebVideoCreator()

    // 配置WVC
    wvc.config({
      // 根据您的硬件设备选择适合的编码器，这里采用的是Nvidia显卡的h264_nvenc编码器
      // 编码器选择可参考 docs/video-encoder.md
      mp4Encoder: VIDEO_ENCODER.AMD.H264,
      allowUnsafeContext: true,
      // 输出页面控制台打印的日志
      consoleLog: true,
      // 建议开启，如果关闭将显示窗口并且需要启用兼容渲染模式才可正常渲染，仅用于调试画面
      browserHeadless: true,
      // 开启后将输出浏览器的运行日志
      browserDebug: true
      // 禁用自动启动渲染
      //   autostartRender: false
    })

    // 创建单幕视频
    const video = wvc.createSingleVideo(
      // playload
      {
        // 需要渲染的页面地址
        url: playload.url, // vue 客户端渲染
        // 视频宽度
        width: playload.width || 800,
        // 视频高度
        height: playload.height || 600,
        // 视频帧率
        fps: playload.fps || 60,
        // 视频时长
        duration: playload.duration || 13000,
        // 视频输出路径
        outputPath: `./video/${
          playload.name || 'video_' + new Date().getTime()
        }.mp4`,
        // 是否在cli显示进度条，默认是不显示
        showProgress: true,
        audioEncoder: AUDIO_ENCODER.AAC,
        // 设置视频质量为80%
        videoQuality: 100,
        // 视频实例的 autostartRender 选项为false时，必须调用此函数才能启动渲染。
        // autostartRender: false,
        // 浏览器可执行文件路径，设置后将禁用内部的浏览器，建议您默认使用内部的浏览器以确保功能完整性
        // browserExecutablePath: "C:\Program Files\Google\Chrome Dev\Application\chrome.exe",
        pagePrepareFn: async (page) => {
          // // // console.log('page:', page)
          // // // 获取puppeteer Page对象
          // const _page = page.target;
          // // // await sleep(5000)
          // await  _page.waitForSelector("#play");
          // // // // console.log('_page:',await _page.tap("#startlz"))
          // // // // 点击按钮
          // await sleep(8000)
          // _page.tap("#play");
          // console.log('点击按钮:')
          // // await _page.mouse.click(300, 300, {button: 'left'})
        }
      }
    )

    // 监听合成完成事件
    video.once('completed', (result) => {
      logger.success(
        `Render Completed!!!\nvideo duration: ${Math.floor(
          result.duration / 1000
        )}s\ntakes: ${Math.floor(result.takes / 1000)}s\nRTF: ${result.rtf}`
      )
      resolve('completed')
    })

    // 启动合成
    video.start()
  })
}
