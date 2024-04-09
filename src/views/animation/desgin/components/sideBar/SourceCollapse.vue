<template>
  <div class="source-list">
    <el-collapse class="collapse" v-model="activeNames">
      <el-collapse-item
        class="item__warpper"
        :title="item.name"
        :name="item.id"
        v-for="item in imagesConf"
        :key="item.id"
      >
        <div class="items" :class="item.type">
          <div
            class="item clearfix"
            draggable="true"
            v-for="child in item.list"
            :key="child.id"
            @dragstart="(e) => onDragStart(child, item, e)"
            @click="compClick(child)"
          >
            <img class="imgs" :src="child.url" alt="" />
            <div class="name">{{ child.name }}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";
import { generateUniqueID } from "../../utils";
import { upload, getFiles } from '../../api/source/index.js'
import useDrawStore from "@/store/modules/draw";

const { proxy } = getCurrentInstance();
let drawStore = useDrawStore();

// 组件配置
let imagesConf = ref([])
let drawComps = ref([
  {
    id: "c9tfzfx7",
    type: "background",
    name: "背景",
    list: [
      {
        id: generateUniqueID(),
        type: "background",
        name: "背景1",
        url: "http://127.0.0.1:3006/uploads/images/background/koo2wquo.jpg",
        width: 630,
        height: 408,
        x: 100,
        y: 100,
        zIndex: 1,
      }
    ],
  },
  {
    id: "6b782wns",
    type: "person",
    name: "人物",
    list: [
      {
        id: generateUniqueID(),
        type: "person",
        name: "人物1",
        width: 100,
        height: 100,
        x: 200,
        y: 200,
        zIndex: 11,
        children: [
          {
            id: generateUniqueID(),
            type: "head",
            name: "头",
            scaleX: -1,
            width: 60,
            height: 53,
            x: 0,
            y: 0,
            url: "http://127.0.0.1:3000/uploads/images/kvo8ltmt.png",
          },
          {
            id: generateUniqueID(),
            type: "body",
            name: "身体",
            width: 78,
            height: 90,
            x: 0,
            y: 27,
            url: "http://127.0.0.1:3000/uploads/images/4294i56q.png",
          },
          {
            id: generateUniqueID(),
            type: "face",
            name: "表情",
            width: 25,
            height: 25,
            x: 10,
            y: 20,
            url: "http://127.0.0.1:3000/uploads/images/4nxzfz9h.png",
          },
        ],
      },
      {
        id: generateUniqueID(),
        type: "person",
        name: "人物2",
        width: 100,
        height: 100,
        x: 300,
        y: 300,
        zIndex: 11,
        children: [
          {
            id: generateUniqueID(),
            type: "head",
            name: "头",
            width: 60,
            height: 53,
            x: 0,
            y: 0,
            url: "http://127.0.0.1:3000/uploads/images/kvo8ltmt.png",
          },
          {
            id: generateUniqueID(),
            type: "body",
            name: "身体",
            width: 60,
            height: 67,
            x: 0,
            y: 49,
            url: "http://127.0.0.1:3000/uploads/images/8f9akz5v.png",
          },
          {
            id: generateUniqueID(),
            type: "face",
            name: "表情",
            width: 25,
            height: 25,
            x: 12,
            y: 20,
            url: "http://127.0.0.1:3000/uploads/images/4nxzfz9h.png",
          },
        ],
      },
    ],
  },
  // {
  //     id: '33pllx82',
  //     type: "face",
  //     name: "表情",
  //     list: [
  //         {
  //             id: 'ks8tklwa',
  //             name: "表情1",
  //             url: "assets/images/face/1.png",
  //             compName: "face",
  //         },
  //         {
  //             id: 'ks8tklwf',
  //             name: "表情2",
  //             url: "assets/images/face/2.png",
  //             compName: "face",
  //         },
  //         {
  //             id: 'ks8hklwa',
  //             name: "表情3",
  //             url: "assets/images/face/3.png",
  //             compName: "face",
  //         },
  //         {
  //             id: 'ks8tklwa',
  //             name: "表情4",
  //             url: "assets/images/face/4.png",
  //             compName: "face",
  //         },
  //         {
  //             id: 'ks8tllwa',
  //             name: "表情5",
  //             url: "assets/images/face/5.png",
  //             compName: "face",
  //         },
  //         {
  //             id: 'ks8uklwa',
  //             name: "表情6",
  //             url: "assets/images/face/6.png",
  //             compName: "face",
  //         },
  //     ],
  // },
  {
    id: "des0950y",
    type: "weapon",
    name: "武器",
    list: [],
  },
  {
    id: "orxnp4v",
    type: "effect",
    name: "特效",
    list: [],
  },
]);

// 当前展开的组件分类，默认全部展开
const activeNames = ref([]);

// 开始拖拽左侧组件，记录该组件信息
function onDragStart(data, parent, e) {
  data.px = e.offsetX;
  data.py = e.offsetY;
  drawStore.setDragElType(parent);
  e.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ ...data, type: parent.type })
  );
}

// 点击
async function compClick(data) {
  const personSchema = (await import("../common/person/schema.json")).default;
  data.schema = personSchema;
  proxy.$emit("create", data);
}

// 图片资源类型 
let imageTypes = ['background', 'person', 'face', 'weapon', 'effect'];
let otherInfo = {
  'background': {name: '背景', zIndex: 1},
  'person': {name: '人物', zIndex: 10}, 
  'face': {name: '表情', zIndex: 10}, 
  'weapon': {name: '武器', zIndex: 10}, 
  'effect': {name: '特效', zIndex: 10}
}
// 生成请求参数
function createApi(purpose) {
  return {
    purpose,
    type: 1,
    pageInfo: {
      pageNum: 1,
      pageSize: 50
    },
    searchKey: ''
  }
}
// 初始化请求参数
function initImageApis() {
  imageTypes.forEach(key => {
    imageApis[key] = createApi(key);
  })
}
let imageApis = reactive({});

let loading = ref(false)
/** 获取列表数据 **/
async function getListByType(playload) {
    let params = {
        page: playload.pageInfo.pageNum,
        pageSize: playload.pageInfo.pageSize,
        type: playload.type,
        purpose: playload.purpose,
        name: playload.searchKey
    }
    loading.value = true;
    try {
      let res = await getFiles(params);
      loading.value = false;
      let { code, data, msg } = res;
      if (code == 200) {
          let temp = data.data || [];
          return {
            purpose: playload.purpose,
            data: temp
          }
      } else {
        return {
          purpose: playload.purpose,
          data: []
        }
      }
    } catch (error) {
      return {
        purpose: playload.purpose,
        data: []
      }
    }
    
}

// 获取数据
async function getData () {
  console.log('imageApis:', imageApis)
  let apis = [];
  for (const key in imageApis) {
    apis.push(getListByType(imageApis[key]))
  }
  let result = await Promise.all(apis);
  console.log('result:', result)
  let result2 = [result[0]]

  result2.forEach((item) => {
    let { purpose, data } = item;
    let obj = {
        id: generateUniqueID(),
        type: purpose,
        name: otherInfo[purpose].name,
        list: []
    }
    data.forEach(info=>{
      let { purpose, fileId, fileName, path } = info;
      obj.list.push(
        {
          id: fileId,
          type: purpose,
          name: fileName,
          url: `http://127.0.0.1:3006${path}`,
          // width: 630,
          // height: 408,
          x: 0,
          y: 0,
          zIndex: otherInfo[purpose].zIndex
        }
      )
    })
    imagesConf.value.push(obj);
    activeNames.value.push(obj.id);
  })
  
}

// 初始化请求参数
initImageApis();
// 获取数据
getData();
onMounted(() => {});
</script>

<style lang="scss" scoped>
.source-list {
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
