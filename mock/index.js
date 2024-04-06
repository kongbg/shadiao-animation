export default [
  // 获取登录验证码
  {
    type: "get",
    url: "/api/captchaImage",
    response: () => {
      return {
        "msg": "操作成功",
        "img": "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAA8AKADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtrW1ga1hZoIySikkoOeKsCztv+feL/vgU2z/484P+ua/yqyKiMY8q0IjGPKtCIWdr/wA+0P8A3wKeLK1/59of+/YqUUpdVGWIA9TT5I9h8sexGLK0/wCfWH/v2KcLG0/59YP+/YrNvvFOiaYP9K1K3Rv7ocM35CtOzvLe/tkuLaVZInGVZehFaSw8oxU3HR9baBaI4WFn/wA+sH/fsU4WFn/z6Qf9+xU4pwrPlj2Dlj2IRp9l/wA+lv8A9+x/hThp1l/z52//AH6X/CpxVPU9YsNGtGur+6jt4h3dsZPoPU1UaXO1GMbthyx7FgadY/8APnb/APfpf8KcNNsf+fK3/wC/S/4Vh+HfG2keJrqe3015maFdzl49oxnHWumXmrq4eVGfJUjZ9mgSi9UVxplh/wA+Vt/36X/CnjTLD/nxtv8Av0v+FWBTsgCsuWPYOWPYrjS9P/58bb/vyv8AhTxpWn/8+Fr/AN+V/wAK47X/AIoaVo161naQT6ncR/60WvKx/U+vtW94Y8W6X4qsjcWEhDLxJDJgPGfcV11Mvr06SrTptRfWwlyN2NUaVp3/AD4Wv/flf8KcNJ07/oH2v/flf8KtCniuTlj2Hyx7FUaTpv8A0D7T/vyv+FVtT0vT49IvXSxtVdYHKsIVBB2nkcVrCqurf8gW/wD+veT/ANBNKUY8r0FKMeV6HJWf/HnB/wBc1/lVkVXs/wDjzg/65r/KrIpx+FDj8KGyOEUk14p431+81nxQdKjuXitIn2bVbAJ7k17HqBIt2I9K8F15DZeNDcPxG8yyZ9uM/wBa+i4cUXiZu15KEnH1IrbIs63omnWmlNJAshnXBMjsTmu4+E+ptJob2jMT5MpxnsDzis3XtLD6HNtHJjJH1qh8Kbjy7q8iJ4O1v51v9Zq4zJ6rrScpQknr2en+YrKNRWPbGkCpk1xPh7xJf6l4/wBbs7i4/wBCtF2QwhQADkc56k8frUWt/EjSdMnubCaG7+1wNsMYjHzdwQc9CCDXm1nrOtJ4tubvToVtbm9G8Qz85Xr3x6GuXA5XVnSqyqRUbxvFy0W6d1/27fVDlNXVj6JaTEe4V4749sHkbUtS1G4a4YAraQgkJCvAzjue9dDofxDeW9t9I1/TJbG+mYRxyIMxSE8DBzxzxxke9J47037RpNyqjLGM7cevauagq+X4mLlpe2qs7q+tmv09CnaaOc+D8vktfkfekdAfoAf8a9uibKAmvAvhRdKmp3dux+Yqsi/QHB/mK7jxfFr2o3Sw2utDT9H8kef5YxIWyc4PXGMdx+NdmdUefNakaklFaO7vtZdrk037iseiJfWj3DW6XMLTr1jDgsPw61S16KW80m5tIbh7d5oynmx/eQHgke+K8RTRPBzSCC11iaK9U/JcC4Gd3r0AP4V0+ky+Oba/tbaXU7W/05ZV8yWUASeXnkHIznGfX61yzwVKHvU6tmtbTi439N0/nYak+qNJbS18N6aYrSMQ26DLsx5Y9yx7mvPvCGsyx/E0XOngpbXMpWRF4UoeuR9ea6D4s6hceVZ2FqjmOXc8pUHkDGB+v8qk8FeH4YXhuLePO5Q28jkgiu2hVjhcFPEVm5zrJpLt5vzvsS1zSSXQ9stZPNjDetWRVOwjKQKD6VdFfOGw4VV1b/kCX/8A17Sf+gmrYqrq/wDyBL//AK9pP/QTUy+Fky+FnJWf/HlB/wBc1/lVkVXsv+PKD/rmv8qsiiPwoI/CiG5i8yJh7V5Z4x8Om9VtgxKuSh9/SvW8ZFZGp6YtwpIHNdGHr1MPVjVpu0kNpNWZ5HD4raHRG02/tZzexr5agLnf2Gav/D/SbmzklnmQo8mPlI5FdS+guZfufjit/R9GFvgkV6FfM4ypTpUafJztOWt9u3ZX9SFDW7exm6hp7TN5vkoZAMB9o3fnXAeIdFv47u3v7SF5Z4HGUUcsv+f517h9lQrgis650hHkyFrhw2Ilh6qqR1t0ezT0a+aLaurGFolubm3hd49yHDhZF5U/Q9CKPG1xdWejGW0szdy7gpQHGAe/Tmuss7NYkAxVbVtPNzCVArKElGak1dLo/wDgWBnzvo9/P4f8TQX89u8EXmESJg42HqB646/hXpOrXOh+M44tPg1NndD5zRwkgso4IORjuPepbnwswlbfEsiN1VlyD+Fanh/wxYWU/mwafDFKeN4T5h9D2r2cVmtPEuNZxcKsVZOL002vfXT1ZnGDjp0OWl8F6UYTELHaMcOrHcPxzVS38La3C4t7LxFcQWp4AOdyD2wf5Yr2VdHiePlRUS6CgfIFcUM0xcNHPm/xWl8/evqU4ROC1+z1SHw+gsJDPdwIgy6gmXAwfxPWtT4aawdWhuLa+tfsuo2rASRFSuVPRgDz2I//AF11d1pOYsKKbpeneRciUxr5gG0PjkDuM+nArJV4OjKnKCbbupbNeXZr8h2d7nTRgBRipRUcY+UVKK5Shwqrq/8AyBL/AP69pP8A0E1bFVdX/wCQJf8A/XtJ/wCgmpl8LJl8LOSsv+PK3/65r/KrIrmYtauYokjVIiEUKMg9vxqT+37r/nnD/wB8n/Gso1o2RnGrGyOlFLtB61zX/CQ3f/POD/vk/wCNL/wkV3/zzg/75P8AjVe2iP20ToxAhOcVMiBegrl/+EkvP+eUH/fJ/wAaX/hJbz/nlB/3yf8AGj20Q9tE6wU7aDXJf8JPe/8APK3/AO+W/wAaX/hKL3/nlb/98t/jR7aIe2ideoxTtgbrXH/8JVff88rf/vlv8aX/AISu+/55W3/fLf40e2iHtonVtaRv1UU6KzjjOQtcn/wlt/8A88bb/vlv8aX/AIS/UP8Anjbf98t/8VR7aIe2idsq4FPAFcP/AMJhqH/PG1/75b/4ql/4TLUf+eNr/wB8t/8AFUe2iHtoncbAe1KsSg8CuH/4TPUf+eNr/wB8N/8AFUv/AAmupf8APC0/74b/AOKo9tEPbRO9Ap4rgP8AhNtS/wCeFp/3w3/xVL/wnGp/88LT/vhv/iqPbRD20T0EVV1f/kB6h/17Sf8AoJriv+E51P8A54Wn/fDf/FVHc+M9RurWa3eG1CSoyMVVsgEY4+aplWjZilVjZn//2Q==",
        "code": 200,
        "captchaEnabled": true,
        "uuid": "330ae7cd88de43dea4bfa4ac93109aa0"
      }
    }
  },
  // 登录
  {
    type: "post",
    url: "/api/login",
    response: () => {
      return {
        "msg": "操作成功",
        "code": 200,
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjAxMjg4NzU0LWVlMmEtNDExYS04NDljLTIzNTdiOTkxNTMwYSJ9.zuj56_xUlkIxXLnozcYit0YR0EohoRdPMvG8sneIz24oKsUEzZ8-K5LspL-MyNcT9nmC2aVt-cp7JZr2jFhHcw"
      }
    }
  },
  // 获取用户信息
  {
    type: "get",
    url: "/api/getInfo",
    response: () => {
      return {
        "msg": "操作成功",
        "code": 200,
        "permissions": ["*:*:*"],
        "roles": [
          "admin"
        ],
        "user": {
          "createBy": "admin",
          "createTime": "2023-04-23 16:11:38",
          "updateBy": null,
          "updateTime": null,
          "remark": "管理员",
          "userId": 1,
          "deptId": 103,
          "userName": "admin",
          "nickName": "若依",
          "email": "ry@163.com",
          "phonenumber": "15888888888",
          "sex": "1",
          "avatar": "",
          "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
          "status": "0",
          "delFlag": "0",
          "loginIp": "175.10.32.73",
          "loginDate": "2024-04-06T20:38:27.000+08:00",
          "dept": {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "deptId": 103,
            "parentId": 101,
            "ancestors": "0,100,101",
            "deptName": "研发部门",
            "orderNum": 1,
            "leader": "若依",
            "phone": null,
            "email": null,
            "status": "0",
            "delFlag": null,
            "parentName": null,
            "children": []
          },
          "roles": [
            {
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "roleId": 1,
              "roleName": "超级管理员",
              "roleKey": "admin",
              "roleSort": 1,
              "dataScope": "1",
              "menuCheckStrictly": false,
              "deptCheckStrictly": false,
              "status": "0",
              "delFlag": null,
              "flag": false,
              "menuIds": null,
              "deptIds": null,
              "permissions": null,
              "admin": true
            }
          ],
          "roleIds": null,
          "postIds": null,
          "roleId": null,
          "admin": true
        }
      }
    }
  },
  // 获取路由信息
  {
    type: "get",
    url: "/api/getRouters",
    response: () => {
      return {
        "msg": "操作成功",
        "code": 200,
        "data": [
          {
            "name": "System",
            "path": "/system",
            "hidden": false,
            "redirect": "noRedirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {
              "title": "系统管理",
              "icon": "system",
              "noCache": false,
              "link": null
            },
            "children": [
              {
                "name": "User",
                "path": "user",
                "hidden": false,
                "component": "system/user/index",
                "meta": {
                  "title": "用户管理",
                  "icon": "user",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Role",
                "path": "role",
                "hidden": false,
                "component": "system/role/index",
                "meta": {
                  "title": "角色管理",
                  "icon": "peoples",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Menu",
                "path": "menu",
                "hidden": false,
                "component": "system/menu/index",
                "meta": {
                  "title": "菜单管理",
                  "icon": "tree-table",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Dept",
                "path": "dept",
                "hidden": false,
                "component": "system/dept/index",
                "meta": {
                  "title": "部门管理",
                  "icon": "tree",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Post",
                "path": "post",
                "hidden": false,
                "component": "system/post/index",
                "meta": {
                  "title": "岗位管理",
                  "icon": "post",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Dict",
                "path": "dict",
                "hidden": false,
                "component": "system/dict/index",
                "meta": {
                  "title": "字典管理",
                  "icon": "dict",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Config",
                "path": "config",
                "hidden": false,
                "component": "system/config/index",
                "meta": {
                  "title": "参数设置",
                  "icon": "edit",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Notice",
                "path": "notice",
                "hidden": false,
                "component": "system/notice/index",
                "meta": {
                  "title": "通知公告",
                  "icon": "message",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Log",
                "path": "log",
                "hidden": false,
                "redirect": "noRedirect",
                "component": "ParentView",
                "alwaysShow": true,
                "meta": {
                  "title": "日志管理",
                  "icon": "log",
                  "noCache": false,
                  "link": null
                },
                "children": [
                  {
                    "name": "Operlog",
                    "path": "operlog",
                    "hidden": false,
                    "component": "monitor/operlog/index",
                    "meta": {
                      "title": "操作日志",
                      "icon": "form",
                      "noCache": false,
                      "link": null
                    }
                  },
                  {
                    "name": "Logininfor",
                    "path": "logininfor",
                    "hidden": false,
                    "component": "monitor/logininfor/index",
                    "meta": {
                      "title": "登录日志",
                      "icon": "logininfor",
                      "noCache": false,
                      "link": null
                    }
                  }
                ]
              }
            ]
          },
          {
            "name": "Monitor",
            "path": "/monitor",
            "hidden": false,
            "redirect": "noRedirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {
              "title": "系统监控",
              "icon": "monitor",
              "noCache": false,
              "link": null
            },
            "children": [
              {
                "name": "Online",
                "path": "online",
                "hidden": false,
                "component": "monitor/online/index",
                "meta": {
                  "title": "在线用户",
                  "icon": "online",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Job",
                "path": "job",
                "hidden": false,
                "component": "monitor/job/index",
                "meta": {
                  "title": "定时任务",
                  "icon": "job",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Druid",
                "path": "druid",
                "hidden": false,
                "component": "monitor/druid/index",
                "meta": {
                  "title": "数据监控",
                  "icon": "druid",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Server",
                "path": "server",
                "hidden": false,
                "component": "monitor/server/index",
                "meta": {
                  "title": "服务监控",
                  "icon": "server",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Cache",
                "path": "cache",
                "hidden": false,
                "component": "monitor/cache/index",
                "meta": {
                  "title": "缓存监控",
                  "icon": "redis",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "CacheList",
                "path": "cacheList",
                "hidden": false,
                "component": "monitor/cache/list",
                "meta": {
                  "title": "缓存列表",
                  "icon": "redis-list",
                  "noCache": false,
                  "link": null
                }
              }
            ]
          },
          {
            "name": "Tool",
            "path": "/tool",
            "hidden": false,
            "redirect": "noRedirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {
              "title": "系统工具",
              "icon": "tool",
              "noCache": false,
              "link": null
            },
            "children": [
              {
                "name": "Build",
                "path": "build",
                "hidden": false,
                "component": "tool/build/index",
                "meta": {
                  "title": "表单构建",
                  "icon": "build",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Gen",
                "path": "gen",
                "hidden": false,
                "component": "tool/gen/index",
                "meta": {
                  "title": "代码生成",
                  "icon": "code",
                  "noCache": false,
                  "link": null
                }
              },
              {
                "name": "Swagger",
                "path": "swagger",
                "hidden": false,
                "component": "tool/swagger/index",
                "meta": {
                  "title": "系统接口",
                  "icon": "swagger",
                  "noCache": false,
                  "link": null
                }
              }
            ]
          },
          {
            "name": "Http://ruoyi.vip",
            "path": "http://ruoyi.vip",
            "hidden": false,
            "component": "Layout",
            "meta": {
              "title": "若依官网",
              "icon": "guide",
              "noCache": false,
              "link": "http://ruoyi.vip"
            }
          }
        ]
      }
    }
  },
  // 字典管理列表
  {
    type: "get",
    url: "/api/system/dict/type/list",
    response: () => {
      return {
        "total": 10,
        "rows": [
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:13",
            "updateBy": null,
            "updateTime": null,
            "remark": "用户性别列表",
            "dictId": 1,
            "dictName": "用户性别",
            "dictType": "sys_user_sex",
            "status": "0"
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:14",
            "updateBy": null,
            "updateTime": null,
            "remark": "菜单状态列表",
            "dictId": 2,
            "dictName": "菜单状态",
            "dictType": "sys_show_hide",
            "status": "0"
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:14",
            "updateBy": null,
            "updateTime": null,
            "remark": "系统开关列表",
            "dictId": 3,
            "dictName": "系统开关",
            "dictType": "sys_normal_disable",
            "status": "0"
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:15",
            "updateBy": null,
            "updateTime": null,
            "remark": "任务状态列表",
            "dictId": 4,
            "dictName": "任务状态",
            "dictType": "sys_job_status",
            "status": "0"
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:15",
            "updateBy": null,
            "updateTime": null,
            "remark": "任务分组列表",
            "dictId": 5,
            "dictName": "任务分组",
            "dictType": "sys_job_group",
            "status": "0"
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:16",
            "updateBy": null,
            "updateTime": null,
            "remark": "系统是否列表",
            "dictId": 6,
            "dictName": "系统是否",
            "dictType": "sys_yes_no",
            "status": "0"
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:17",
            "updateBy": null,
            "updateTime": null,
            "remark": "通知类型列表",
            "dictId": 7,
            "dictName": "通知类型",
            "dictType": "sys_notice_type",
            "status": "0"
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:17",
            "updateBy": null,
            "updateTime": null,
            "remark": "通知状态列表",
            "dictId": 8,
            "dictName": "通知状态",
            "dictType": "sys_notice_status",
            "status": "0"
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:18",
            "updateBy": null,
            "updateTime": null,
            "remark": "操作类型列表",
            "dictId": 9,
            "dictName": "操作类型",
            "dictType": "sys_oper_type",
            "status": "0"
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:19",
            "updateBy": null,
            "updateTime": null,
            "remark": "登录状态列表",
            "dictId": 10,
            "dictName": "系统状态",
            "dictType": "sys_common_status",
            "status": "0"
          }
        ],
        "code": 200,
        "msg": "查询成功"
      }
    }
  },
  // 获取字典详情
  {
    type: "get",
    url: "/api/system/dict/type/1",
    response: () => {
      return {
        "msg": "操作成功",
        "code": 200,
        "data": {
            "createBy": "admin",
            "createTime": "2023-04-23 16:13:13",
            "updateBy": null,
            "updateTime": null,
            "remark": "用户性别列表",
            "dictId": 1,
            "dictName": "用户性别",
            "dictType": "sys_user_sex",
            "status": "0"
        }
      }
    }
  },
];

