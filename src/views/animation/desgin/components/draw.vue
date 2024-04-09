<template>
    <div :class="['dh-draw__warpper', drawStore.mode]">
        <div v-show="!isStart" :class="['tools', drawStore.mode]">
            当前时间：{{ drawStore.currentTime }} 秒
            <el-button @click="preLoadAudio" type="primary" size="small">预加载音频并播放</el-button>
            <el-button @click="start" id="play" type="primary" size="small">播放</el-button>
            <el-button @click="preview" v-show="drawStore.mode == 'desgin'" type="primary" size="small">预览</el-button>
            <el-button @click="outPreview" v-show="drawStore.mode == 'preview'" type="primary" size="small">退出预览</el-button>
            <el-button @click="exportVideos" v-show="drawStore.mode !== 'preview'" type="primary" size="small">导出视频</el-button>
            <el-button @click="setEditActionId" v-show="drawStore.editActionId" type="primary" size="small">退出设置动画</el-button>
            <el-button @click="clear" type="primary" size="small">清空</el-button>
            <el-button @click="save" type="primary" size="small">保存</el-button>
            {{ drawStore.ox }}-{{ drawStore.oy }}-{{ drawStore.editActionId }}
        </div>

        <div id="dh-draw-content" ref="dh-draw-content" class="dh-draw-content" @dragover="(e)=>dragover(e, drawStore.dragElType)" @drop="drop">
            <comp-warpper2
                v-for="(item, index) in comps"
                :key='item.id'
                :active="item.id == drawStore.currentCompId"
                :compData="item"
                @clicked="e=>compWarpperClick(e, item, index)"
            >
                <component class="comp"
                    :id="item.id"
                    :ref="`comp-${item.id}`"
                    :is="item.comp"
                    :width="dwidth"
                    :height="dheight"
                    :compData="item"
                    @change="compChange"
                    >
                </component>
            </comp-warpper2>
        </div>
    </div>
</template>
<script setup>
import { ref, shallowRef, getCurrentInstance, computed, nextTick, onMounted, watch } from 'vue';
import { generateUniqueID, deepClone, TsetInterval } from '../utils'
const { proxy } = getCurrentInstance()
import compWarpper from './common/compWarpper.vue';
import compWarpper2 from './common/compWarpper2.vue';
import person from './common/person/index.vue';
import background from './common/background/index.vue';
import useDrawStore from '@/store/modules/draw';
import anime from 'animejs/lib/anime.es.js';
import { exportVideo, updateVideo } from '../api/video/index.js'
import { useRoute } from "vue-router"
import { speak } from '@/utils/speak'
let drawStore = useDrawStore();

drawStore.setMode('desgin');
const currentConfInfo = computed(()=>{
    return drawStore.drawConfigs.confs.length ? drawStore.drawConfigs.confs[drawStore.currentConfIndex] : {comps:[]};
})



// 缓存组件，方便后续查询
let comMap = {
    background: shallowRef(background),
    person: shallowRef(person),
}

// 获取dh-draw-content宽高，传递给下级，当下级内容为空时设置宽高
let dwidth = ref(0);
let dheight = ref(0);
onMounted(() => {
    let dom = proxy.$refs['dh-draw-content'];
    dwidth.value = dom.offsetWidth || 0;
    dheight.value = dom.offsetHeight || 0;

    const route = useRoute(); 
    drawStore.setDataByName('route', route)
    const { query } = route;
    const mode = query.mode;
    if (mode === 'preview') {
    //    setTimeout(()=>{
        // preview()
        // start()
    //    }, 5000)
    }
})

const allTime = ref(3600);
const oldTime = ref(0)
const timer = ref(null);
let clearInterval = null;
function countTime () {
    if(clearInterval) clearInterval()
    clearInterval = TsetInterval(() => {
        if (drawStore.currentTime < allTime.value) {
            drawStore.currentTime += 1;
        } else {

        }
    }, 1000)
}

let comps = computed(()=>{
    if (drawStore.drawConfigs.confs.length > drawStore.currentConfIndex) {
        let comps = drawStore.drawConfigs.confs.length ? drawStore.drawConfigs.confs[drawStore.currentConfIndex].comps : [];
        comps.forEach(item=> {
            item.comp = comMap[item.type]
        })
        return comps;
    } else {
        return []
    }
    
})


function preview() {
    drawStore.setMode('preview');
}
function outPreview () {
    drawStore.setMode('desgin');
}

function setEditActionId () {
    if (drawStore.editActionId) {
        drawStore.setDataByName('editActionId', '')
    }
}
const clear = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
}
async function exportVideos() {
    await exportVideo()
}

async function save () {
    console.log(drawStore.drawConfigs)
    let res = await updateVideo(drawStore.drawConfigs)
}


async function start_bak() {
    // 初始化
    drawStore.setDataByName('currentConfIndex', 0);
    drawStore.setCurrentConfInfo(drawStore.confs[0]);
    drawStore.setCurrentCompIndex(0);
    drawStore.setCurrentCompInfo(drawStore.confs[0].comps[0]);


    let count = 0;
    console.time('start');
    while (count < drawStore.confs.length) {
        // 获取当前时间段内所有可操作组件
        let comp = drawStore.confs[count].comps;
        let plist = [];
        // 执行所有组件中的run方法，直到所有run执行完成后继续循环
        comp.forEach(async (item, index) => {
            // await nextTick();
            let refId = `comp-${item.id}`;
            let run = proxy.$refs[refId] && proxy.$refs[refId][0]?.run;
            if (run) {
                console.log('has run')
                let p = new Promise(async (resolve, reject) => {
                    await run();
                    resolve(true);
                })
                plist.push(p);
            } else {
                console.log('no run')
            };
        })
        if(plist.length) {
            let res = await Promise.all(plist);
            console.log('23:', res)
        }
        count++;
        if (count < drawStore.confs.length) {
            drawStore.setDataByName('currentConfIndex', count);
            drawStore.setCurrentConfInfo(drawStore.confs[count]);
            drawStore.setCurrentCompIndex(0);
            drawStore.setCurrentCompInfo(drawStore.confs[count].comps[0]);
        }
        await sleep(200);
    }
    console.log('循环结束');
    console.timeEnd('start');
}
async function preLoadAudio() {
    setTimeout(()=>{
        // start()
    }, 5000)
    let confs = drawStore.drawConfigs.confs;
    // console.log('confs:', confs)
    let count = 0;
    while (count < confs.length) {
        let actions = confs[count].actions;
        let count2 = 0;
        while (count2 < actions.length) {
            let item = actions[count2];
            let actions2 = item.actions;
            let count3 = 0;
            while (count3 < actions2.length) {
                let info = actions2[count3];
                let speakActions = info.actions.filter(res => res.type.includes('speak'))
                let count4 = 0;
                while (count4 < speakActions.length) {
                    let res = speakActions[count4];
                    let url = await startText(res.content, 'zh-CN-XiaoxiaoNeural', 0, 0, false);
                    res.audioUrl = url;
                    let duration = await getDuration(url);
                    res.duration = duration;
                    await sleep(1000)
                    count4++;
                }
                count3++;
            }
            count2++;
        }
        count++
    }
    async function getDuration(url) {
        return new Promise(resolve => {
            let audio = document.createElement('audio');
            audio.src = url;
            audio.addEventListener('canplaythrough', function() {
                let duration = audio.duration;
                console.log('canplaythrough:', duration);
                resolve(duration);
            });
        })
    }
}
const isStart = ref(false)
async function start () {
    isStart.value = true;
    countTime()
    drawStore.outEditAction();
    let confs = drawStore.drawConfigs.confs
    
    let count = 0;

    
    
    while (count < confs.length) {
        let actions = confs[count].actions;


        let timeLineOption = {
            easing: 'linear', // 时间曲线，匀速
            duration: 2000, // 全局动画时间，局部优先级高
            autoplay: false, // 关闭自动播放
        }
        let pTl = new MyTimeLine(timeLineOption);

        actions.forEach(item => {
            // 同步动画
            item.actions.forEach(info => {
                info.actions.forEach(res => {
                    
                    let offset = '+=0';
                    if (res.ahead) {
                        offset = `-=${res.ahead*1000}`
                    }
                    if (res.delay) {
                        offset = `+=${res.delay*1000}`
                    }

                    let audioInfo = drawStore.audios[res.contentId];
                    pTl.add(
                        {
                            targets: `#comp-${info.target}`,
                            duration: audioInfo ? audioInfo.duration * 1000 : res.duration * 1000,
                            left: `${res.x}px`,
                            top: `${res.y}px`,
                            begin(anim){
                                if (res.type.includes('speak')) {
                                    speak(
                                        {
                                            url: audioInfo.audioUrl,
                                            startTime: (drawStore.currentTime) * 1000,
                                            endTime: (drawStore.currentTime + audioInfo.duration) * 1000
                                        }
                                    )
                                    console.log(`播放语音${audioInfo.duration}秒`)
                                }
                                console.log(`#comp-${info.target}begin`)
                            },
                            complete(){
                                console.log(`#comp-${info.target}complete`)
                            }
                        }, offset
                    )
                })
                
            })
        })
        pTl.play();
        
        await pTl.complete();

        count++
        drawStore.setDataByName('currentConfIndex', count) 
        await sleep(200);
        
    }
    console.log('循环结束');
    count = 0
    // drawStore.setDataByName('currentConfIndex', count)
    console.timeEnd('start');
    clearInterval();
    drawStore.currentTime = 0;
}


class MyTimeLine {
    constructor(option) {
        this.anime = anime.timeline(option);
        this.add = function (option, delay) {
            this.anime.add(option, delay)
        }
        this.play = function() {
            this.anime.play()
        }
        this.complete = () => {
            let that = this;
            return new Promise((resolve, reject) => {
                that.anime.complete = function() {
                    resolve('complete')
                }
            })
        }
    }
}


let ws = null;
let blobs = [];
function sendReq(ssml, format, connectionId) {
    let configData = {
        context: {
            synthesis: {
                audio: {
                    metadataoptions: {
                        sentenceBoundaryEnabled: "false",
                        wordBoundaryEnabled: "false",
                    },
                    outputFormat: format,
                },
            },
        },
    };
    let configMessage =
        `X-Timestamp:${Date()}\r\n` +
        "Content-Type:application/json; charset=utf-8\r\n" +
        "Path:speech.config\r\n\r\n" +
        JSON.stringify(configData);
    // console.log(`配置请求发送：${configMessage}\n`);
    let ssmlMessage =
        `X-Timestamp:${Date()}\r\n` +
        `X-RequestId:${connectionId}\r\n` +
        `Content-Type:application/ssml+xml\r\n` +
        `Path:ssml\r\n\r\n` +
        ssml;
    // console.log(`SSML消息发送：${ssmlMessage}\n`);
    ws.send(configMessage, (configError) => {
        if (configError) {
            // console.log(`配置请求发送失败：${connectionId}\n`);
        }
    });
    ws.send(ssmlMessage, (ssmlError) => {
        if (ssmlError) {
            // console.log(`SSML消息发送失败：${connectionId}\n`);
        }
    });
}
function generateRandomHex() {
    // 创建一个长度为 16 字节的 Uint8Array
    const randomBytes = new Uint8Array(16);
    // 填充数组的每个元素为一个随机的 0-255 之间的整数
    window.crypto.getRandomValues(randomBytes);
    // 将字节数组转换为十六进制字符串，并将字母转换为小写
    const hexString = Array.from(randomBytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
        .toLowerCase();
    return hexString;
}
// audio.addEventListener('canplaythrough', function() {
//     var duration = audio.duration;
//     console.log(duration);
// });
async function connect(ssml, format, autpPlay) {
    return new Promise((resolve, reject) => {
        const connectionId = generateRandomHex();
        let url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4&ConnectionId=${connectionId}`;
        ws = new window.WebSocket(url);
        ws.onopen = () => {
            console.log("wsOpen");
            sendReq(ssml, format, connectionId)
        };
        ws.onclose = (code, reason) => {
            // 服务器会自动断开空闲超过30秒的连接
            ws = null;
            blobs = [];
            console.log(`连接已关闭： ${reason} ${code}`);
        };
        ws.onmessage = (message) => {
            if (!(message.data instanceof Blob)) {
                let data = message.data.toString();
                if (data.includes("Path:turn.start")) {
                    // 开始传输
                } else if (data.includes("Path:turn.end")) {
                    // 结束传输
                    for (let i = 0; i < blobs.length; i++) {
                        let contentIndex = 130;
                        if (i == blobs.length - 1) {
                            contentIndex = 105;
                        }
                        blobs[i] = blobs[i].slice(contentIndex)
                    }
                    let result = new Blob(blobs);
                    let url = URL.createObjectURL(result);
                    if (autpPlay) {
                        let audioElement = document.createElement('audio');
                        audioElement.pause();
                        audioElement.src = url;
                        audioElement.play();
                    }
                    blobs = [];
                    ws.close();
                    console.log(`传输完成：${url}`);
                    resolve(url);
                }
            } else if (message.data instanceof Blob) {
                // console.log("收到信号了b......", message.data)
                blobs.push(message.data)
            }
        };
        ws.onerror = (error) => {
            console.log(`连接失败： ${error}`);
        };
    })
}
async function startText(text, voice='zh-CN-XiaoxiaoNeural', rate = 0, pitch = 0, autpPlay = true) {
    if (text) {
        let SSML = "";
        console.log("text", text);
        // console.log("voice", voiceList[voice].ShortName);
        console.log("voice", voice)
        console.log("rate", rate);
        console.log("pitch", pitch);
        SSML = `
                <speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
                    <voice name="${voice}">
                        <prosody rate="${rate}%" pitch="${pitch}%">
                        ${text}
                        </prosody>
                    </voice>
                </speak>`;
        // console.log(SSML);
        let format = "audio-24khz-48kbitrate-mono-mp3";
        let result = await connect(SSML, format, autpPlay).then(result => {
            console.log('Received result:', result);
            return result;
        });
        return result;
    }
}
const startSpeak = async(text, autpPlay) =>{
  let url = await startText(text, 'zh-CN-XiaoxiaoNeural', 0, 0, autpPlay);
}

/**
 * 初始化每个对话中可操作物料
 * @param {*} drawConf 对话配置项
 * @returns {*} drawConf 返回新增可操作物料配置
 */
async function updateComp(data) {
    let { targetType, targetId, sourceType, options } = data;
    // console.log(targetType, targetId, sourceType, options)
    // 非背景组件拖入背景中-修改背景
    if (sourceType === 'background' && targetType === 'background') {
        console.log('非背景组件拖入背景中-修改背景')
        let info = currentConfInfo.value.comps.find(item => {
            return item.id === targetId;
        })
        if (info) {
            info.schema.property.background.value.image.url = options.url;
        }
    }

    // 非背景组件拖入背景中-新增
    if(sourceType != 'background' && targetType === 'background') {
        // 非背景组件拖入背景中
        let temp = deepClone(await getSchema(sourceType));
        
        // 修改一个名称
        temp.name = `${temp.name}-${parseInt(Math.random()*1000)}`
        temp.property.position.value.x.value = options.x - options.px;
        temp.property.position.value.y.value = options.y - options.py;
        temp.property.position.value.ox.value = options.x - options.px;
        temp.property.position.value.oy.value = options.y - options.py;
        temp.property.background.value.image.url = options.url;

        drawStore.setDataByName('ox', options.x - options.px);
        drawStore.setDataByName('oy', options.y - options.py);

        if (options.headUrl) temp.property.head.value.image.value = options.headUrl;
        if (options.bodyUrl) temp.property.body.value.image.value = options.bodyUrl;

        let playload = {
            type: sourceType,
            id: generateUniqueID(),
            compId: generateUniqueID(),
            compName: sourceType,
            comp: null,
            schema: temp
        }
        currentConfInfo.value.comps.push(playload);

        console.log('非背景组件拖入背景中-新增', playload)

        compClick(playload, currentConfInfo.value.comps.length - 1)
    }

    // 非背景组件拖入非背景中-修改局部
    if(sourceType != 'background' && targetType != 'background') {
        console.log('非背景组件拖入非背景中-修改局部')
        let info = currentConfInfo.value.comps.find(item => {
            return item.id === targetId;
        })
        console.log('info:', info)
        if (info) {
            info.schema.property[sourceType].value.image.value = options.url
        }
    }
}

// 子组件内容改变
const compChange = (e) => {
    let { action, data } = e;

    if (action === 'update') {
        console.log('子组件内容改变:', data)
        updateComp(data);
    }

    // 当前场景执行完成，切换下一帧
    if (action == 'completed') {
        console.log('当前场景执行完成，切换下一帧')
    }
}

let schema = ref({});
// 选择当前场景的其他组件
async function compClick(data, index) {
    console.log('compClick:', data)
    drawStore.setDataByName('panelType', 'comp')
    drawStore.setDataByName('currentCompIndex', index)
    drawStore.setDataByName('currentCompId', data.id)
}

function compWarpperClick(e, data, index) {
    if (e) {
        // 当前正在设置元素动画，不切换到组件属性
        if (!drawStore.tempTargetId) {
            drawStore.setDataByName('panelType', 'comp')
        }
        drawStore.setDataByName('currentCompIndex', index)    
        drawStore.setDataByName('currentCompId', data.id)
    }
    
}

// 获取schema
async function getSchema(path) {
    // todo 先从接口拿
    let schemaData = await import(`./common/${path}/schema.json`);
    return schemaData.default;
}

/**
 * 阻止默认事件，允许放置拖拽元素
 */
const dragover = (e, dragElType) => {
    // console.log('111阻止默认事件，允许放置拖拽元素:',e, dragElType)
    let allowType = ['background', 'person'];
    if (allowType.includes(dragElType)) {
        e.preventDefault();
    }
}

// 放置拖拽元素
const drop = (e) => {
    let classList = [...e.target.classList]
    let targetType = classList.includes('backgroundImg') ? 'background' : '';
    let targetId = e.target.id;
    let jsonStr = e.dataTransfer.getData('text/plain');
    if (jsonStr.includes('{')&&jsonStr.includes('}')) {
        let data = JSON.parse(e.dataTransfer.getData('text/plain'))
        let options = {
            ...data,
            x: e.offsetX,
            y: e.offsetY
        }
        updateComp({ targetType, targetId, sourceType: data.type, options });
    }
}

let customStyle = ref({});
const positionChange = (data) => {
    let { x, y, unit} = data;
    customStyle.value = {
        left: `${x}${unit}`,
        top: `${y}${unit}`
    }
}

async function sleep(delay = 100) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

</script>
<style lang="scss" scoped>
.dh-draw__warpper {
    &.preview {
        position: fixed;
        z-index: 1005;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }
    .tools {
        margin-bottom: 10px;
        &.preview {
            position: absolute;
            right: 0;
        }
    }
    .dh-draw-content {
        width: 960px;
        height: 540px;
        // border: 1px solid red;
        position: relative;
        overflow: hidden;
        z-index: 1006;
        // background: red;
    }
}
</style>