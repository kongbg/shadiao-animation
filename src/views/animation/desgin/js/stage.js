
import { Application, Loader } from "pixi.js";
import { setTextures, getTexturesAll } from "./textures"
import EmptyScene from "./emptyScene";

export default class Stage {
    constructor(options = {}) {
        this.width = 800;
        this.height = 600;
        this.el = null;
        this.resolution = 1;
        this.name = null;
        this.configs = [];
        this.history = options.history || {};
        this.sceneName = null; // 场景名称
        this.onProgress = () => {};

        // 合并参数
        Object.assign(this, options);
        return this;
    }

    // 初始化
    async init() {
        let { resolution, width, height, el } = this;
        // 创建舞台
        this.app = new Application({
            width: width,
            height: height,
            backgroundColor: 0x000000,
            resolution: resolution || 1,
            antialias: true,
            autoDensity: true,
            preserveDrawingBuffer: true,
        });

        el.appendChild(this.app.view);

        this.stage = this.app.stage;
        this.stage.sortableChildren = true;
        this.stage.interactive = true;
        this.stage.type = 'stage'

        // 初始化加载器
        this.loader = new Loader();

        // 获取资源url
        let remoteUrl = this.getRemoteUrl();

        // 预加载所有资源
        let resources = await this.loaderResource(remoteUrl);

        // 缓存资源
        this.cacheTextures(resources);

        // 开始
        // this.start();

        return this;
    }

    

    // 预加载资源
    async loaderResource(urls) {
        const { loader, onProgress } = this;
        
        return new Promise((resolve, reject) => {
            urls.forEach(([key, value]) => loader.add(key, value, () => {
              onProgress(loader.progress)
            }))
            loader.load((loader, resources) => {
              onProgress(loader.progress)
              resolve(resources)
            })
        })
    }

    // 缓存资源
    cacheTextures(res) {
        Object.entries(res).forEach(([key, value]) => {
            setTextures(key, value.texture)
        })
    }

    //开始执行
    start() {
        this.doStart('', true)
    }
    // 切换场景，不执行动画
    changeScene(name, run=false) {
        this.doStart(name, run)
    }

    // 开始执行
    async doStart(name, run=false) {
        let count = 0;
        let len = this.configs.length;

        // 开始指定场景
        if (name) {
            for (let i = 0; i < len; i++) {
                if (this.configs[i].name == name) {
                    count = i
                    len = i+1;
                    break;
                }
            }
        }

        while(count < len) {

            const config = this.configs[count];

            const { name, type } = config;
            if (this.sceneName) {
                // 上一个场景隐藏
                this[this.sceneName].hide();
            }

            this.sceneName = name;

            this[name] = new EmptyScene(this, config);
            
            this.stage.addChild(this[name].stage);

            // 下一个场景显示
            let currentScene = this[name].init()
            currentScene.show();
            if (run) {
                let res = await currentScene.run();
                console.log(res)
            }
            count++
        }
    }

    // 删除内部精灵，精灵组 ，支持链式调用
    removeChild(){

    }
    // 通过id 设置精灵高亮
    setSpriteLineHeight(id) {
        this[this.sceneName].setSpriteLineHeight(id)
    }
    // 通过id 设置精灵高亮
    updataComp(id, options) {
        this[this.sceneName].updataComp(id, options)
    }
    // 通过id 设置精灵层级
    setSpriteZindex(id, zIndex) {
        this[this.sceneName].setSpriteZindex(id, zIndex)
    }

    // 新增精灵
    async addComp(data){
        let urls = [];

        if (data.url) {
            urls.push([data.id, data.url])
        }
        if (data.children) {
            data.children.forEach(item => {
                urls.push([item.id, item.url])
            })
        }
        // 预加载所有资源
        let resources = await this.loaderResource(urls);

        // 缓存资源
        this.cacheTextures(resources);

        this[this.sceneName].drawComp(data)
    }

    //销毁
    destroy() {
        this.app.destroy(true, true);
    }

    // 从配置只找到需要预加载的资源
    getRemoteUrl () {
        let urls = [];
        this.configs.forEach(item => {
            let comps = item.option.comps;
            comps.forEach(comp => {
                if (comp.children && comp.children.length) {
                    comp.children.forEach(child => {
                        let key = child.id;
                        let url = child.url || '';
                        let temp = [key, url];
                        urls.push(temp)
                    })  
                } else {
                    let key = comp.id;
                    let url = comp.url || '';
                    let temp = [key, url];
                    urls.push(temp)
                }
            })
        })
        urls = urls.filter(item=>item[1])
        return urls;
    }
}