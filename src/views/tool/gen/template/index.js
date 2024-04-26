const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");

// 组件名称
let compName = "case";
let baseUrl = "/city-platform"; // api 基础路径

// 搜索组件配置
let searchConfig = [
  {
    type: "input",
    prop: "title",
    label: "案例标题",
  },
  {
    type: "select",
    prop: "caseType",
    label: "案例类型",
    dict: "case_type",
  },
  {
    type: "input",
    prop: "uploadPerson",
    label: "上传人员",
  },
  {
    type: "select",
    prop: "status",
    label: "审查状态",
    options: `[
            {
              dictLabel: '待审查',
              dictValue: '0',
            },
            {
              dictLabel: '案例通过',
              dictValue: '1'
            },
            {
              dictLabel: '案例驳回',
              dictValue: '2'
            },
        ]`,
  },
  {
    type: "input",
    prop: "auditUnit",
    label: "审查单位",
  },
  {
    type: "datetimerange",
    prop: "uploadTimeRange",
    label: "上传时间",
  },
  {
    type: "datetimerange",
    prop: "auditTimeRange",
    label: "审查时间",
  },
];
// 表格配置
let columns = [
  { type: "index", label: "序号" },
  { prop: "title", label: "案例标题" },
  { prop: "caseType", label: "案例类型", dict: "case_type" },
  { prop: "caseDes", label: "案例描述" },
  { prop: "uploadPerson", label: "上传人员" },
  { prop: "uploadTime", label: "上传时间" },
  { prop: "status", label: "审查状态" },
  { prop: "auditUnit", label: "审查单位" },
  { prop: "auditTime", label: "审查时间" },
  { slot: "action" },
];
// api配置
let apis = [
  {
    name: "列表",
    method: "post",
    methodName: "getData",
    url: `${baseUrl}/bizNbxxjlXxsh/getList`,
  },
  {
    name: "新增",
    method: "post",
    methodName: "addData",
    url: `${baseUrl}/bizNbxxjlXxsh/save`,
  },
  {
    name: "更新",
    method: "post",
    methodName: "update",
    url: `${baseUrl}/bizNbxxjlXxsh/update`,
  },
  {
    name: "删除",
    method: "post",
    methodName: "delateData",
    url: `${baseUrl}/bizNbxxjlXxsh/delete`,
  },
  {
    name: "详情",
    method: "get",
    methodName: "getDetails",
    url: `${baseUrl}/bizNbxxjlXxsh/detail`,
  },
];

// 注册 Handlebars 的 helper 函数
registerHelper();
// 获取所有字典
let dicts = getDicts();

// 生成vue 所需文件
createVue();

// 生成vue 所需文件
function createVue() {
  if (!compName) {
    console.log("请设置组件名称：compName");
    return;
  }
  if (!baseUrl) {
    console.log("请设置api服务前缀：baseUrl");
    return;
  }
  // 生成config.js
  createConfig();

  // 生成api.js
  createApi();

  // 生成列表
  createList();

  // 生成详情
  createDetails();
}

// 生成api.js
function createApi() {
  const config = {
    compName,
    apiName: "内部信息交流相关接口",
    apis,
  };
  let params = {
    filePath: path.resolve(__dirname, `./template/case/api/index.js`),
    distPath: path.resolve(
      __dirname,
      `./dist/${config.compName}/api/${config.compName}/index.js`
    ),
    config,
  };
  createFile(params);
}
// 生成详情
function createDetails() {
  const config = {
    compName,
    apis,
    dicts,
    createApiName: 'addData',
    getDataApiName: 'getData',
    updateApiName: 'update',
    delateApiName: 'delateData',
    getDetailsApiName: 'getDetails',
  };
  let params = {
    filePath: path.resolve(__dirname, `./template/case/action/index.vue`),
    distPath: path.resolve(
      __dirname,
      `./dist/${config.compName}/action/index.vue`
    ),
    config,
  };
  createFile(params);
}
// 生成config.js
function createConfig() {
  const config = {
    compName,
    searchConfig,
    columns,
    dicts,
  };
  let params = {
    filePath: path.resolve(__dirname, `./template/case/config.js`), // 模板路径
    distPath: path.resolve(__dirname, `./dist/${config.compName}/config.js`), // 结果输出位置
    config,
  };
  // 输出文件
  createFile(params);
}
// 生成列表
function createList() {
  const config = {
    compName,
    apis,
    deleteTip: '确定删除该案例吗？',
    createApiName: 'addData',
    getDataApiName: 'getData',
    updateApiName: 'update',
    delateApiName: 'delateData',
    getDetailsApiName: 'getDetails',
    exportUrl: '/city-platform/bizCsDzwl/exportList',
    exportFeilName: '电子围栏',
    suffix: '.xlsx'
  };
  let params = {
    filePath: path.resolve(__dirname, `./template/case/index.vue`),
    distPath: path.resolve(__dirname, `./dist/${config.compName}/index.vue`),
    config,
  };
  // 输出文件
  createFile(params);
}

// 输出文件
function createFile(options = {}) {
  let { filePath, config, distPath } = options;
  // 读取模板
  const templateContent = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(templateContent);

  // 生成文件
  const vueContent = template(config);

  // 先创建一个空文件，目标为了补全路径
  createFolderPath(distPath);

  fs.writeFileSync(distPath, vueContent);
}
// 补全文件路径
function createFolderPath(filePath) {
  const fileContent = "";

  // 获取文件所在目录的路径
  const directoryPath = path.dirname(filePath);

  // 判断目录是否存在，如果不存在则创建目录
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    // console.log("目录已创建");
  }

  // 判断文件是否存在，如果不存在则创建文件并写入内容
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, fileContent);
    // console.log("文件已创建并写入内容");
  } else {
    // console.log("文件已存在");
  }
}

// 注册 Handlebars 的 helper 函数
function registerHelper() {
  // 注册 Handlebars 的 helper 函数 eq，用于判断相等
  handlebars.registerHelper("eq", function (a, b) {
    return a == b;
  });
  handlebars.registerHelper("isHas", function (a) {
    return Boolean(a);
  });

  handlebars.registerHelper("getParmas", function (type) {
    if (["get"].includes(type)) {
      return "params";
    } else {
      return "data";
    }
  });
}

// 获取所有字典
function getDicts() {
  let dict = [];
  let list = [...searchConfig, ...columns];
  list.forEach((item) => {
    if (item.dict && !dict.includes(item.dict)) {
      dict.push(item.dict);
    }
  });
  return dict;
}
