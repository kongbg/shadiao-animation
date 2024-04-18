<template>
  <div class="numes-list">
    <div class="createVideo">
      <el-button type="primary" size="small" @click="openCreateVideoDialog"
        >新增</el-button
      >
    </div>
    <el-collapse
      class="collapse videoType"
      v-model="drawStore.activeVideoTypes"
    >
      <div v-if="!drawStore.videoTypes.length">空</div>
      <el-collapse-item
        class="item__warpper"
        :title="item.name"
        :name="item.id"
        v-for="(item, vindex) in drawStore.videoTypes"
        :key="item.id"
      >
        <div class="upload-text">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="(data) => handleChange(data, vindex, item)"
          >
            <el-button type="primary" size="small">新增</el-button>
          </el-upload>
        </div>
        <div class="texts">
          <div
            :class="['t-item', drawStore.videoId == child.id ? 'active' : '']"
            v-for="(child, index) in item.list"
            :key="child.id"
          >
            <span>{{ index + 1 }}</span>
            <span class="name" @click="videoClick(child)">{{
              child.name
            }}</span>

            <el-popover
              popper-class="more-action"
              placement="bottom"
              trigger="click"
            >
              <div class="actions">
                <div class="item">
                  <el-button
                    type="primary"
                    size="small"
                    @click="initSpeaks(child)"
                    >配音</el-button
                  >
                </div>
                <div class="item">
                  <el-button type="primary" size="small" @click="preLoadAudio()"
                    >生成配音</el-button
                  >
                </div>
                <div class="item">
                  <el-button
                    type="primary"
                    size="small"
                    @click="deleteVideoByid(child)"
                    >删除</el-button
                  >
                </div>
              </div>
              <template #reference>
                <el-icon>
                  <More />
                </el-icon>
              </template>
            </el-popover>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <Source-collapse @create="compClick"></Source-collapse>

    <el-dialog v-model="createVideoDialog" title="Tips" width="500">
      <div class="name-warp">
        <div class="label">视频集名称：</div>
        <div class="value">
          <el-input v-model="videoTypeName" />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="createVideoDialog = false">取消</el-button>
          <el-button type="primary" @click="createVideo"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="speaksDialog"
      class="speaks-dialog"
      :close-on-click-modal="false"
      title="人物配音"
      width="50%"
    >
      <div class="speak-warp">
        <div class="table">
          <div class="head">
            <div class="name">名称</div>
            <div class="voice">配音</div>
            <div class="rate">语速</div>
            <div class="pitch">音调</div>
            <div class="play">试听</div>
          </div>
          <div class="body">
            <div class="item" v-for="item in videoInfo.speaks">
              <div class="name">{{ item.name }}</div>
              <div class="voice">
                <el-select v-model="item.voice" placeholder="请选择配音">
                  <el-option
                    v-for="item in voiceList"
                    :key="item.ShortName"
                    :label="item.label"
                    :value="item.ShortName"
                  />
                </el-select>
              </div>
              <div class="rate">
                <el-slider v-model="item.rate" />
              </div>
              <div class="pitch">
                <el-slider v-model="item.pitch" />
              </div>
              <div :class="['play', item.id == playId ? 'isActive' : '']">
                <el-icon @click="play(item)">
                  <VideoPlay />
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="speaksDialog = false">取消</el-button>
          <el-button type="primary" @click="saveSpeakConf"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { computed, onMounted, proxyRefs, ref, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { startSpeak } from '../utils/edge-tts.js'
import { generateUniqueID, deepClone, sleep } from '../utils'
import Bus from '../utils/bus'
import { ElMessage, imageViewerEmits, ElMessageBox } from 'element-plus'
import useDrawStore from '@/store/modules/draw'
import SourceCollapse from './sideBar/SourceCollapse'
import {
  saveAudios,
  getAudios,
  upload,
  getAudiosConf
} from '../api/audio/index.js'
import {
  addVideoType,
  getVideoType,
  deleteVideoType
} from '../api/videoType/index.js'
import { addVideo, updateVideo, deleteVideo } from '../api/video/index.js'

const { proxy } = getCurrentInstance()
const route = useRoute()
let drawStore = useDrawStore()

// 视频相关-start
let createVideoDialog = ref(false) // 新增视频集
let videoTypeName = ref('') // 视频集类型

// 获取所有视频合集分类
async function getVideoTypes() {
  const { type, video } = route.query

  let [err, data] = await getVideoType({ id: type })
  if (!err) {
    drawStore.setDataByName('videoTypes', data.data)

    if (drawStore.videoTypes.length) {
      let first = drawStore.videoTypes[0]

      let activeVideoTypes = drawStore.activeVideoTypes
      activeVideoTypes.push(first.id)
      drawStore.setDataByName('activeVideoTypes', activeVideoTypes)

      // 默认选中一个分类下的第一个视频
      if (first.list.length) {
        let info = first.list[0]
        if (video) {
          info = first.list.find((item) => item.id == video)
        }
        videoClick(info)
      } else {
        drawStore.setDataByName('videoId', '')
        drawStore.setDataByName('drawConfigs', { confs: [], speaks: {} })
        Bus.$emit('videoClick')
      }
    }
  }
}

// 通过视频id获取音频文件
async function getAudiosConfByid(videoId) {
  if (!videoId) return
  let [err, data] = await getAudiosConf({ confid: videoId })
  if (!err) {
    ;(data.data || []).forEach((item) => {
      item.audioUrl = item.url
      drawStore.audios[item.cid] = item
    })
  }
}

// 选择视频
const videoClick = async (data) => {
  drawStore.setDataByName('videoId', data.id)
  drawStore.setDataByName('drawConfigs', data)

  // 通过视频id获取音频文件
  await getAudiosConfByid(data.id)

  // 判断是否设置配音
  let num = 0
  for (const key in data.speaks) {
    if (!data.speaks[key].voice) {
      num++
    }
  }
  if (num) {
    initSpeaks(data)
    return
  }

  // 判断所有对话是否都有录音
  let num2 = 0
  data.confs.forEach((item) => {
    num2 += item.option.content.length
  })
  if (Object.keys(drawStore.audios).length < num2) {
    let audios = drawStore.audios
    await preLoadAudio({ audios })

    // ElMessageBox.confirm(
    //     '检测到部分对话不存在录音，是否生成录音?',
    //     '提示',
    //     {
    //         confirmButtonText: '是',
    //         cancelButtonText: '否',
    //         type: 'warning',
    //     }
    // ).then(() => {
    //     preLoadAudio({audios})
    //     ElMessage({
    //         type: 'success',
    //         message: 'Delete completed',
    //     })
    // }).catch(() => {
    //     ElMessage({
    //         type: 'info',
    //         message: 'Delete canceled',
    //     })
    // })
  }

  // 自动生成对话
  // console.log("自动生成对话:", data, drawStore.audios);
  data.confs.forEach((item) => {
    let targetInfo = item.option.comps.find((item) => item.type == 'background')
    if (!item.option.initActionsed) {
      item.option.content.forEach((info) => {
        let audioInfo = drawStore.audios[info.id]

        // console.log(info.id, audioInfo);
        item.option.actions.push({
          id: generateUniqueID(),
          actions: [
            {
              id: generateUniqueID(),
              target: targetInfo.id,
              actions: [
                {
                  audioUrl: audioInfo.url,
                  content: info.content,
                  contentId: info.id,
                  duration: audioInfo.duration,
                  easing: 'linear',
                  id: generateUniqueID(),
                  type: ['speak']
                }
              ]
            }
          ]
        })
      })
      item.option.initActionsed = true
    }
  })

  Bus.$emit('videoClick')
}

// 打开新增视频集弹窗
const openCreateVideoDialog = () => {
  createVideoDialog.value = true
}

// 创建视频集
const createVideo = async () => {
  let res = await addVideoType({
    name: videoTypeName.value
  })
  // 关闭弹窗
  createVideoDialog.value = false
  // 清空输入框
  videoTypeName.value = ''
  // 刷新所有视频合集分类
  getVideoTypes()
}

// 上传文本自动解析对话，生成视频初始信息
const handleChange = (data, index, videoType) => {
  let name = data.raw.name.replace('.txt', '')

  const reader = new FileReader()
  if (typeof FileReader === 'undefined') {
    alert('您的浏览器不支持FileReader接口')
  }
  reader.onload = async (e) => {
    const text = e.target.result
    // 解析配置文件
    let { confs, speaks } = await parseStr(text)

    // 新增视频信息
    let res = await addVideo({
      name,
      content: text,
      confs,
      speaks,
      videoTypeid: videoType.id
    })
    // 刷新所有视频合集分类
    await getVideoTypes()
    let info = drawStore.videoTypes[index].list.find(
      (item) => item.name == name
    )
    if (info) {
      drawStore.setDataByName('videoId', info.id)
      drawStore.setDataByName('drawConfigs', info)
      initSpeaks(info)
    }
  }
  reader.readAsText(data.raw, 'utf-8')
}

let speaksDialog = ref(false)
var voiceList = [
  { ShortName: 'zh-CN-XiaoxiaoNeural', label: 'Xiaoxiao' },
  { ShortName: 'zh-CN-XiaoyiNeural', label: 'Xiaoyi' },
  { ShortName: 'zh-CN-YunjianNeural', label: 'Yunjian' },
  { ShortName: 'zh-CN-YunxiNeural', label: 'Yunxi' },
  { ShortName: 'zh-CN-YunxiaNeural', label: 'Yunxia' },
  { ShortName: 'zh-CN-YunyangNeural', label: 'Yunyang' },
  { ShortName: 'zh-CN-liaoning-XiaobeiNeural', label: 'liaoning-Xiaobei' },
  { ShortName: 'zh-CN-shaanxi-XiaoniNeural', label: 'shaanxi-Xiaoni' }
]
const videoInfo = ref({})
// 给人物设置配置
function initSpeaks(data) {
  console.log('data:', data)
  videoInfo.value = data
  speaksDialog.value = true
}
// 删除视频
async function deleteVideoByid(data) {
  let res = await deleteVideo({ id: data.id })
  // 刷新所有视频合集分类
  await getVideoTypes()
}

// 生成配置
async function preLoadAudio(options = { audios: {} }) {
  let confid = drawStore.drawConfigs.id + ''
  let confs = drawStore.drawConfigs.confs
  let count = 0
  let audios = Object.assign(options.audios, {})
  while (count < confs.length) {
    let content = confs[count].option.content
    let count2 = 0
    while (count2 < content.length) {
      let info = content[count2]
      if (!audios[info.id]) {
        let text = info.content || ''
        let speak = info.speak
        let speakConf = drawStore.drawConfigs.speaks[speak]
        if (!speakConf.voice) {
          ElMessage({
            message: '请选择配音',
            type: 'warning'
          })
          return
        }
        let options = {
          text,
          ...speakConf,
          autpPlay: false
        }
        let [url, blob] = await startSpeak(options)
        if (url) {
          let audio = document.createElement('audio')
          audio.src = url
          info.audioUrl = url
          info.duration = await canplaythrough(audio)

          let filename = `${info.id}-${confid}-${info.duration}.wav`
          let renameFile = new File([blob], filename, { type: 'audio/wav' })
          const formData = new FormData()
          formData.append('file', renameFile)
          upload(formData)

          audios[info.id] = {
            cid: info.id,
            audioUrl: `http://127.0.0.1:3009/uploads/audio/${filename}`,
            duration: info.duration
          }

          await sleep(200)
        } else {
          audios[info.id] = {
            cid: info.id,
            audioUrl: ``,
            duration: 0
          }
        }
      }
      count2++
    }
    count++
  }

  drawStore.setDataByName('audios', audios)

  async function canplaythrough(audio) {
    return new Promise(async (resolve) => {
      audio.addEventListener('canplaythrough', () => {
        let duration = audio.duration
        resolve(duration)
      })
    })
  }
}
// 保存配音信息
async function saveSpeakConf() {
  speaksDialog.value = false
  console.log(videoInfo)
  let res = await updateVideo(videoInfo.value)
}
let playId = ref('')
async function play(playLoad) {
  let { id, voice, rate, pitch, autpPlay } = playLoad
  if (!voice) {
    ElMessage({
      message: '请选择配音',
      type: 'warning'
    })
    return
  }
  playId.value = id
  let options = {
    text: '大家好，我是朱虾仁！',
    voice,
    rate,
    pitch,
    autpPlay: false
  }
  let [url, blob] = await startSpeak(options)
  let audio = document.createElement('audio')
  audio.src = url
  audio.play()
  audio.addEventListener('ended', () => {
    playId.value = ''
  })
  audio.addEventListener('canplaythrough', () => {
    let duration = audio.duration
    console.log('音频时长:', duration)

    let renameFile = new File([blob], `${id}-3do6cw1u-${duration}.wav`, {
      type: 'audio/wav'
    })
    const formData = new FormData()
    formData.append('file', renameFile)
    formData.append('data1', '我是data1')
    formData.append('data2', '我是data2')
    // upload(formData)
  })

  console.log(url)
}
// 从上传文案中解析场景，对话，自动为每个场景创建一个背景
const parseStr = async (text) => {
  let confs = []
  let speaks = {}
  let splitList = []

  // console.log('原文：',text)

  function splitStr(str, type) {
    // 抹平 '\r\n', '\n' 差异
    str = str.replace('/\r/\n', '\n').replace('/\r', '\n')
    // console.log('处理后：',str)
    let tempStr = str.split('\n').filter((item) => item.trim() !== '')
    // let currentTime = 0;
    tempStr = tempStr.map((item) => {
      let arr = item.split('：').filter((str) => !!str)
      if (arr.length) {
        let contentStr = arr.length > 1 ? arr[1] : ''
        let obj = {
          content: [
            {
              id: generateUniqueID(),
              speak: arr[0],
              content: contentStr
            }
          ]
        }
        return obj
      }
    })
    if (type == 2) {
      let temp = []
      tempStr.forEach((element) => {
        temp.push(element.content[0])
      })
      return temp
    }
    return tempStr
  }

  if (text.indexOf('###part') > -1) {
    // console.warn('请采用单个对话方式写脚本')
    // return false;
    let tempList = text.split('###part').filter((item) => !!item)
    splitList = tempList.map((item) => {
      return {
        content: splitStr(item, 2)
      }
    })
  } else {
    splitList = splitStr(text)
  }

  const bgSchema = (await import('./common/background/schema.json')).default

  splitList.forEach(async (item) => {
    let comps = []
    // 提取对话中的人物情况
    item.content.forEach((item) => {
      let { speak } = item
      if (!speaks[speak]) {
        speaks[speak] = {
          id: generateUniqueID(),
          name: speak,
          voice: '', // 人物(音色
          rate: 0, // 语速，默认值为0
          pitch: 0 // 音调，默认值为0
        }
      }

      let info = comps.find((item) => {
        return item.speak == speak
      })
      if (!info) {
        if (speak == '背景') {
          let schema = deepClone(bgSchema)
          comps.push({
            id: generateUniqueID(),
            type: 'background',
            name: '背景1',
            url: 'http://127.0.0.1:3006/uploads/images/background/buw3ca3n.jpg',
            width: 960,
            height: 540,
            x: 0,
            y: 0,
            schema
          })
        }
      }
    })

    let id = generateUniqueID()
    confs.push({
      id: id,
      name: `emptyScene${id}`,
      type: 'scene',
      option: {
        title: '',
        duration: 0,
        comps,
        actions: [],
        content: item.content
      }
    })
  })
  console.log({ confs, speaks })
  return { confs, speaks }
}
// 视频相关-end
// 点击
async function compClick(data) {
  proxy.$emit('create', data)
}

onMounted(() => {
  // 获取所有视频合集分类
  getVideoTypes()
})

// 页面组件相关-end
</script>

<style lang="scss" scoped>
.numes-list {
  height: calc(100% - 84px);
  overflow: auto;

  .createVideo {
    text-align: right;
    margin: 10px;
    margin-bottom: 0;
  }

  .upload-text {
    margin: 10px;
    margin-bottom: 0;
    display: flex;
    justify-content: right;

    .upload-demo {
      margin-left: 10px;
    }
  }

  .texts {
    height: 100px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 0;

    .t-item {
      padding: 0 10px;
      height: 24px;
      line-height: 24px;
      margin-bottom: 10px;
      cursor: pointer;
      position: relative;

      .el-icon {
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 7px;
        margin-right: 10px;
      }

      &.active {
        color: #409eff;
      }

      .name {
        display: inline-block;
        margin-left: 10px;
      }
    }
  }

  .collapse {
    .item__warpper {
      padding: 0 5px;

      .items {
        display: flex;
        flex-wrap: wrap;

        .item {
          flex-shrink: 0;
          margin-right: 10px;
          margin-bottom: 15px;
          text-align: center;
          cursor: pointer;

          &:nth-child(2n) {
            margin-right: 0;
          }

          .imgs {
            width: 100px;
            height: 100px;
            position: relative;
            background-origin: content;
            /*从content区域开始显示背景*/
            background-position: 50% 50%;
            /*图片上下左右居中*/
            background-size: contain;
            /*保持图像本身的宽高比例，将图片缩放到宽度或高度正好适应定义背景的区域*/
            background-repeat: no-repeat;

            img {
              width: 100%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }

        &.face {
          .item {
            // height: 40px;

            .imgs {
              width: 50px;
              height: 50px;

              img {
                position: static;
                transform: none;
              }
            }
          }
        }

        &.weapon {
          .item {
            height: 200px;

            .imgs {
              height: auto;

              img {
                position: static;
                transform: none;
              }
            }
          }
        }

        &.effect {
          .item {
            height: 200px;

            .imgs {
              height: auto;

              img {
                position: static;
                transform: none;
              }
            }
          }
        }
      }
    }
  }
}

.speaks-dialog {
  .speak-warp {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;

    .table {
      .head {
        display: flex;

        & > div {
          width: 25%;
          border: 1px solid #ccc;
          border-bottom: none;
          border-right: none;
          height: 38px;
          line-height: 38px;
          text-align: center;
          padding: 0 20px;
        }
      }

      .body {
        .item {
          display: flex;

          & > div {
            width: 25%;
            border: 1px solid #ccc;
            border-bottom: none;
            border-right: none;
            height: 38px;
            line-height: 38px;
            text-align: center;
            padding: 0 20px;
          }

          .play {
            .el-icon {
              font-size: 20px;
              cursor: pointer;
            }

            &.isActive {
              .el-icon {
                color: #409eff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.more-action {
  .actions {
    width: 100px;

    .item {
      margin-bottom: 10px;
    }
  }
}
</style>
