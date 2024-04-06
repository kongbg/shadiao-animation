
import { defineStore } from 'pinia'
const useDrawStore = defineStore(
    'draw',
    {
      state: () => ({
        videoTypes: [], // 所有视频合集分类
        activeVideoTypes: [], // 当前展开视频集
        videoId: '', // 当前点击的视频
        audios: {}, // 所有对话音频

        // 所有场景配置
        drawConfigs: {
          confs: [],
          speaks: {},
        },

        // 当前配置信息
        currentConfIndex: 0,// 当前配置索引

        

      }),
      actions: {
        setDataByName (name, data) {
          if (!name) {
            console.warn('请传入需要修改的属性名称');
            return
          } 
          if (data === undefined) {
            console.warn('请传入需要修改的属性的属性值');
            return
          } 
          this[name] = data
        },
        // 退出设置动画
        outEditAction () {
          this.ox = 0;
          this.oy = 0;
          this.editActionId = 0;
        },
      },
      // 开启数据持久化
      // persist: {
      //   enabled: true,
      //   strategies: [
      //     {
      //       key: 'draw',
      //       storage: localStorage,
      //     },
      //   ],
      // }
  
    })
  
  export default useDrawStore
  