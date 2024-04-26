<template>
  <el-form ref="genInfoForm" :model="dynamicValidateForm" label-width="150px">
    <el-button type="primary" @click="addDomain">新增接口</el-button>
    <el-row v-for="(item, index) in dynamicValidateForm.domains">
      <el-col :span="6" v-for="(info2, index2) in item.list">
        <el-form-item
          :prop="'domains.' + index + '.list.' + index2 + '.value'"
          :rules="{
            required: true,
            message: '值不能为空',
            trigger: 'blur'
          }"
        >
          <template #label>{{ info2.label }}</template>
          <el-cascader
            popper-class="popper-cascader"
            v-if="index2 == 2"
            :options="options2"
            :props="{ value: 'api', label: 'name' }"
            :show-all-levels="false"
            @change="data => urlChange(data, info2)"
          >
          <template #default="{ node, data }">
            <span>{{ data.name }}</span>
            <br/>
            <span>{{ data.api && data.api.path }}</span>
            </template>
          </el-cascader>
          <el-input v-else v-model="info2.value"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary" @click="deleteDomain(index)"
            >删除</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
let options2 = [
  {
    key: 'apiDetailFolder.30348602',
    type: 'apiDetailFolder',
    name: 'city-platform',
    api: {
        path: 'city-platform',
    },
    children: [
      {
        key: 'apiDetailFolder.30348756',
        type: 'apiDetailFolder',
        name: '操作指引',
        children: [
          {
            key: 'apiDetail.154551433',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 154551433,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/czzy/page',
              folderId: 30348756,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551434',
            type: 'apiDetail',
            name: '新增或修改',
            children: [],
            api: {
              id: 154551434,
              name: '新增或修改',
              type: 'http',
              method: 'post',
              path: '/czzy/submit',
              folderId: 30348756,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551435',
            type: 'apiDetail',
            name: '删除',
            children: [],
            api: {
              id: 154551435,
              name: '删除',
              type: 'http',
              method: 'post',
              path: '/czzy/del',
              folderId: 30348756,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348756,
          name: '操作指引',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348757',
        type: 'apiDetailFolder',
        name: '菜单信息',
        children: [
          {
            key: 'apiDetail.154551436',
            type: 'apiDetail',
            name: '获取菜单列表',
            children: [],
            api: {
              id: 154551436,
              name: '获取菜单列表',
              type: 'http',
              method: 'get',
              path: '/menu/list',
              folderId: 30348757,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551437',
            type: 'apiDetail',
            name: '根据菜单编号获取详细信息',
            children: [],
            api: {
              id: 154551437,
              name: '根据菜单编号获取详细信息',
              type: 'http',
              method: 'get',
              path: '/menu/{menuId}',
              folderId: 30348757,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551438',
            type: 'apiDetail',
            name: '获取菜单下拉树列表',
            children: [],
            api: {
              id: 154551438,
              name: '获取菜单下拉树列表',
              type: 'http',
              method: 'get',
              path: '/menu/treeselect',
              folderId: 30348757,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551439',
            type: 'apiDetail',
            name: '加载对应角色菜单列表树',
            children: [],
            api: {
              id: 154551439,
              name: '加载对应角色菜单列表树',
              type: 'http',
              method: 'get',
              path: '/menu/roleMenuTreeselect/{roleId}',
              folderId: 30348757,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551440',
            type: 'apiDetail',
            name: '新增菜单',
            children: [],
            api: {
              id: 154551440,
              name: '新增菜单',
              type: 'http',
              method: 'post',
              path: '/city-platform/menu',
              folderId: 30348757,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155224172',
            type: 'apiDetail',
            name: '新增菜单',
            children: [],
            api: {
              id: 155224172,
              name: '新增菜单',
              type: 'http',
              method: 'post',
              path: '/menu',
              folderId: 30348757,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551441',
            type: 'apiDetail',
            name: '修改菜单',
            children: [],
            api: {
              id: 154551441,
              name: '修改菜单',
              type: 'http',
              method: 'put',
              path: '/menu',
              folderId: 30348757,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551442',
            type: 'apiDetail',
            name: '删除菜单',
            children: [],
            api: {
              id: 154551442,
              name: '删除菜单',
              type: 'http',
              method: 'delete',
              path: '/menu/{menuId}',
              folderId: 30348757,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551443',
            type: 'apiDetail',
            name: '获取路由信息',
            children: [],
            api: {
              id: 154551443,
              name: '获取路由信息',
              type: 'http',
              method: 'get',
              path: '/city-platform/menu/getRouters',
              folderId: 30348757,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348757,
          name: '菜单信息',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348759',
        type: 'apiDetailFolder',
        name: '用户信息 控制器',
        children: [
          {
            key: 'apiDetail.155161837',
            type: 'apiDetail',
            name: '获取用户信息',
            children: [],
            api: {
              id: 155161837,
              name: '获取用户信息',
              type: 'http',
              method: 'get',
              path: '/user/getInfo',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159315909',
            type: 'apiDetail',
            name: '查询用户详情',
            children: [],
            api: {
              id: 159315909,
              name: '查询用户详情',
              type: 'http',
              method: 'get',
              path: '/user/detail/{userId}',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551455',
            type: 'apiDetail',
            name: '带条件分页查询',
            children: [],
            api: {
              id: 154551455,
              name: '带条件分页查询',
              type: 'http',
              method: 'get',
              path: '/user/list',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551456',
            type: 'apiDetail',
            name: '修改用户信息',
            children: [],
            api: {
              id: 154551456,
              name: '修改用户信息',
              type: 'http',
              method: 'post',
              path: '/user/update',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551457',
            type: 'apiDetail',
            name: '创建用户',
            children: [],
            api: {
              id: 154551457,
              name: '创建用户',
              type: 'http',
              method: 'post',
              path: '/user/create',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156242817',
            type: 'apiDetail',
            name: '用户启用禁用批量接口',
            children: [],
            api: {
              id: 156242817,
              name: '用户启用禁用批量接口',
              type: 'http',
              method: 'get',
              path: '/user/updateStatusByIds',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157780756',
            type: 'apiDetail',
            name: '用户启用禁用批量接口',
            children: [],
            api: {
              id: 157780756,
              name: '用户启用禁用批量接口',
              type: 'http',
              method: 'post',
              path: '/user/updateStatusByIds',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156242818',
            type: 'apiDetail',
            name: '用户删除还原批量接口',
            children: [],
            api: {
              id: 156242818,
              name: '用户删除还原批量接口',
              type: 'http',
              method: 'get',
              path: '/user/updateDelFlagByIds',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157780757',
            type: 'apiDetail',
            name: '用户删除还原批量接口',
            children: [],
            api: {
              id: 157780757,
              name: '用户删除还原批量接口',
              type: 'http',
              method: 'post',
              path: '/user/updateDelFlagByIds',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169105094',
            type: 'apiDetail',
            name: '还原批量接口',
            children: [],
            api: {
              id: 169105094,
              name: '还原批量接口',
              type: 'http',
              method: 'post',
              path: '/user/updateDelFlagWithPlaceWithUser',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169105095',
            type: 'apiDetail',
            name: '用户删除还原批量接口',
            children: [],
            api: {
              id: 169105095,
              name: '用户删除还原批量接口',
              type: 'http',
              method: 'post',
              path: '/user/deletePlaceWithUser',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551458',
            type: 'apiDetail',
            name: '重置密码',
            children: [],
            api: {
              id: 154551458,
              name: '重置密码',
              type: 'http',
              method: 'post',
              path: '/user/resetPwd',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551459',
            type: 'apiDetail',
            name: '设置用户为当前组织负责人',
            children: [],
            api: {
              id: 154551459,
              name: '设置用户为当前组织负责人',
              type: 'http',
              method: 'get',
              path: '/user/setLeader/{userId}',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551460',
            type: 'apiDetail',
            name: '指派',
            children: [],
            api: {
              id: 154551460,
              name: '指派',
              type: 'http',
              method: 'post',
              path: '/user/assign',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551461',
            type: 'apiDetail',
            name: '拒绝指派',
            children: [],
            api: {
              id: 154551461,
              name: '拒绝指派',
              type: 'http',
              method: 'post',
              path: '/user/refuseAssign',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551462',
            type: 'apiDetail',
            name: '分配',
            children: [],
            api: {
              id: 154551462,
              name: '分配',
              type: 'http',
              method: 'post',
              path: '/user/allocation',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551463',
            type: 'apiDetail',
            name: '拒绝分配',
            children: [],
            api: {
              id: 154551463,
              name: '拒绝分配',
              type: 'http',
              method: 'post',
              path: '/user/refuseAllocation',
              folderId: 30348759,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348759,
          name: '用户信息 控制器',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348760',
        type: 'apiDetailFolder',
        name: '区域信息 控制器',
        children: [
          {
            key: 'apiDetail.155006064',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 155006064,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/gdxzqy/selectList',
              folderId: 30348760,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551464',
            type: 'apiDetail',
            name: '获取广东省行政区域树',
            children: [],
            api: {
              id: 154551464,
              name: '获取广东省行政区域树',
              type: 'http',
              method: 'get',
              path: '/gdxzqy/tree',
              folderId: 30348760,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551465',
            type: 'apiDetail',
            name: '根据顶层areaCode获取行政区域树',
            children: [],
            api: {
              id: 154551465,
              name: '根据顶层areaCode获取行政区域树',
              type: 'http',
              method: 'get',
              path: '/gdxzqy/treeWithTop/{topAreaCode}',
              folderId: 30348760,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551466',
            type: 'apiDetail',
            name: '根据父级areaCode获取下级行政区域',
            children: [],
            api: {
              id: 154551466,
              name: '根据父级areaCode获取下级行政区域',
              type: 'http',
              method: 'get',
              path: '/gdxzqy/getChildren/{parentAreaCode}',
              folderId: 30348760,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551467',
            type: 'apiDetail',
            name: '删除行政区域',
            children: [],
            api: {
              id: 154551467,
              name: '删除行政区域',
              type: 'http',
              method: 'delete',
              path: '/gdxzqy/delete/{areaCode}',
              folderId: 30348760,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155904300',
            type: 'apiDetail',
            name: '新增行政区域',
            children: [],
            api: {
              id: 155904300,
              name: '新增行政区域',
              type: 'http',
              method: 'post',
              path: '/gdxzqy/add',
              folderId: 30348760,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155904301',
            type: 'apiDetail',
            name: 'edit',
            children: [],
            api: {
              id: 155904301,
              name: 'edit',
              type: 'http',
              method: 'post',
              path: '/gdxzqy/edit',
              folderId: 30348760,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155904302',
            type: 'apiDetail',
            name: 'getFullPubGdxzqyDict',
            children: [],
            api: {
              id: 155904302,
              name: 'getFullPubGdxzqyDict',
              type: 'http',
              method: 'get',
              path: '/gdxzqy/getDictPubGdxzqy',
              folderId: 30348760,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348760,
          name: '区域信息 控制器',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348761',
        type: 'apiDetailFolder',
        name: '操作日志记录',
        children: [
          {
            key: 'apiDetail.154551469',
            type: 'apiDetail',
            name: 'list',
            children: [],
            api: {
              id: 154551469,
              name: 'list',
              type: 'http',
              method: 'get',
              path: '/operlog/list',
              folderId: 30348761,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551470',
            type: 'apiDetail',
            name: 'export',
            children: [],
            api: {
              id: 154551470,
              name: 'export',
              type: 'http',
              method: 'post',
              path: '/operlog/export',
              folderId: 30348761,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551471',
            type: 'apiDetail',
            name: 'remove',
            children: [],
            api: {
              id: 154551471,
              name: 'remove',
              type: 'http',
              method: 'delete',
              path: '/operlog/{operIds}',
              folderId: 30348761,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551472',
            type: 'apiDetail',
            name: 'clean',
            children: [],
            api: {
              id: 154551472,
              name: 'clean',
              type: 'http',
              method: 'delete',
              path: '/operlog/clean',
              folderId: 30348761,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348761,
          name: '操作日志记录',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348762',
        type: 'apiDetailFolder',
        name: '组织部门控制器',
        children: [
          {
            key: 'apiDetail.156476564',
            type: 'apiDetail',
            name: '组织部门带用户数-树状结构',
            children: [],
            api: {
              id: 156476564,
              name: '组织部门带用户数-树状结构',
              type: 'http',
              method: 'get',
              path: '/org_dept/tree',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 1464952,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156476565',
            type: 'apiDetail',
            name: '区域带用户数-树状结构',
            children: [],
            api: {
              id: 156476565,
              name: '区域带用户数-树状结构',
              type: 'http',
              method: 'get',
              path: '/org_dept/areaTree',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 1464952,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551475',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 154551475,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/org_dept/page',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 1464952,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166868022',
            type: 'apiDetail',
            name: '查询单位下所有子孙部门',
            children: [],
            api: {
              id: 166868022,
              name: '查询单位下所有子孙部门',
              type: 'http',
              method: 'get',
              path: '/org_dept/getDescendantDept/{unitId}',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 1464952,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166868023',
            type: 'apiDetail',
            name: '通过父ID获取子级别单位',
            children: [],
            api: {
              id: 166868023,
              name: '通过父ID获取子级别单位',
              type: 'http',
              method: 'get',
              path: '/org_dept/getUnitChildren/{parentId}',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 1464952,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551477',
            type: 'apiDetail',
            name: '通过父ID获取子级别部门',
            children: [],
            api: {
              id: 154551477,
              name: '通过父ID获取子级别部门',
              type: 'http',
              method: 'get',
              path: '/org_dept/getChildren/{parentId}',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 1464952,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551478',
            type: 'apiDetail',
            name: '新增组织部门',
            children: [],
            api: {
              id: 154551478,
              name: '新增组织部门',
              type: 'http',
              method: 'post',
              path: '/org_dept/add',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 1464952,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551479',
            type: 'apiDetail',
            name: '修改组织部门',
            children: [],
            api: {
              id: 154551479,
              name: '修改组织部门',
              type: 'http',
              method: 'post',
              path: '/org_dept/edit',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 1464952,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551480',
            type: 'apiDetail',
            name: '删除组织部门',
            children: [],
            api: {
              id: 154551480,
              name: '删除组织部门',
              type: 'http',
              method: 'post',
              path: '/org_dept/delete/{id}',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 1464952,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168137031',
            type: 'apiDetail',
            name: '组织部门下拉选择框',
            children: [],
            api: {
              id: 168137031,
              name: '组织部门下拉选择框',
              type: 'http',
              method: 'get',
              path: '/org_dept/select',
              folderId: 30348762,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348762,
          name: '组织部门控制器',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348763',
        type: 'apiDetailFolder',
        name: '数据字典信息',
        children: [
          {
            key: 'apiDetail.154551481',
            type: 'apiDetail',
            name: 'list',
            children: [],
            api: {
              id: 154551481,
              name: 'list',
              type: 'http',
              method: 'get',
              path: '/dict/data/list',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551482',
            type: 'apiDetail',
            name: 'export',
            children: [],
            api: {
              id: 154551482,
              name: 'export',
              type: 'http',
              method: 'post',
              path: '/dict/data/export',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551483',
            type: 'apiDetail',
            name: '查询字典数据详细',
            children: [],
            api: {
              id: 154551483,
              name: '查询字典数据详细',
              type: 'http',
              method: 'get',
              path: '/dict/data/{dictCode}',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551484',
            type: 'apiDetail',
            name: '根据字典类型查询字典数据信息',
            children: [],
            api: {
              id: 154551484,
              name: '根据字典类型查询字典数据信息',
              type: 'http',
              method: 'get',
              path: '/dict/data/type/{dictType}',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551485',
            type: 'apiDetail',
            name: '新增字典类型',
            children: [],
            api: {
              id: 154551485,
              name: '新增字典类型',
              type: 'http',
              method: 'post',
              path: '/dict/data',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551486',
            type: 'apiDetail',
            name: '修改保存字典类型',
            children: [],
            api: {
              id: 154551486,
              name: '修改保存字典类型',
              type: 'http',
              method: 'put',
              path: '/dict/data',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551487',
            type: 'apiDetail',
            name: '删除字典类型',
            children: [],
            api: {
              id: 154551487,
              name: '删除字典类型',
              type: 'http',
              method: 'delete',
              path: '/dict/data/{dictCodes}',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551488',
            type: 'apiDetail',
            name: 'list',
            children: [],
            api: {
              id: 154551488,
              name: 'list',
              type: 'http',
              method: 'get',
              path: '/dict/type/list',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551489',
            type: 'apiDetail',
            name: 'export',
            children: [],
            api: {
              id: 154551489,
              name: 'export',
              type: 'http',
              method: 'post',
              path: '/dict/type/export',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551490',
            type: 'apiDetail',
            name: '查询字典类型详细',
            children: [],
            api: {
              id: 154551490,
              name: '查询字典类型详细',
              type: 'http',
              method: 'get',
              path: '/dict/type/{dictId}',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551491',
            type: 'apiDetail',
            name: '新增字典类型',
            children: [],
            api: {
              id: 154551491,
              name: '新增字典类型',
              type: 'http',
              method: 'post',
              path: '/dict/type',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551492',
            type: 'apiDetail',
            name: '修改字典类型',
            children: [],
            api: {
              id: 154551492,
              name: '修改字典类型',
              type: 'http',
              method: 'put',
              path: '/dict/type',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551493',
            type: 'apiDetail',
            name: '删除字典类型',
            children: [],
            api: {
              id: 154551493,
              name: '删除字典类型',
              type: 'http',
              method: 'delete',
              path: '/dict/type/{dictIds}',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551494',
            type: 'apiDetail',
            name: '刷新字典缓存',
            children: [],
            api: {
              id: 154551494,
              name: '刷新字典缓存',
              type: 'http',
              method: 'delete',
              path: '/dict/type/refreshCache',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551495',
            type: 'apiDetail',
            name: '获取字典选择框列表',
            children: [],
            api: {
              id: 154551495,
              name: '获取字典选择框列表',
              type: 'http',
              method: 'get',
              path: '/dict/type/optionselect',
              folderId: 30348763,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348763,
          name: '数据字典信息',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348764',
        type: 'apiDetailFolder',
        name: '系统访问记录',
        children: [
          {
            key: 'apiDetail.156685965',
            type: 'apiDetail',
            name: 'detail',
            children: [],
            api: {
              id: 156685965,
              name: 'detail',
              type: 'http',
              method: 'get',
              path: '/logininfor/detail',
              folderId: 30348764,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551496',
            type: 'apiDetail',
            name: 'list',
            children: [],
            api: {
              id: 154551496,
              name: 'list',
              type: 'http',
              method: 'get',
              path: '/logininfor/list',
              folderId: 30348764,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551497',
            type: 'apiDetail',
            name: 'export',
            children: [],
            api: {
              id: 154551497,
              name: 'export',
              type: 'http',
              method: 'post',
              path: '/logininfor/export',
              folderId: 30348764,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551498',
            type: 'apiDetail',
            name: 'remove',
            children: [],
            api: {
              id: 154551498,
              name: 'remove',
              type: 'http',
              method: 'delete',
              path: '/logininfor/{infoIds}',
              folderId: 30348764,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551499',
            type: 'apiDetail',
            name: 'clean',
            children: [],
            api: {
              id: 154551499,
              name: 'clean',
              type: 'http',
              method: 'delete',
              path: '/logininfor/clean',
              folderId: 30348764,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685966',
            type: 'apiDetail',
            name: 'remove',
            children: [],
            api: {
              id: 156685966,
              name: 'remove',
              type: 'http',
              method: 'post',
              path: '/logininfor/del',
              folderId: 30348764,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551500',
            type: 'apiDetail',
            name: 'unlock',
            children: [],
            api: {
              id: 154551500,
              name: 'unlock',
              type: 'http',
              method: 'get',
              path: '/logininfor/unlock/{userName}',
              folderId: 30348764,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348764,
          name: '系统访问记录',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348765',
        type: 'apiDetailFolder',
        name: '数据审核 控制器',
        children: [
          {
            key: 'apiDetail.154551501',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 154551501,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/data_approve/page',
              folderId: 30348765,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551502',
            type: 'apiDetail',
            name: '审核',
            children: [],
            api: {
              id: 154551502,
              name: '审核',
              type: 'http',
              method: 'post',
              path: '/data_approve/create',
              folderId: 30348765,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551503',
            type: 'apiDetail',
            name: '审核',
            children: [],
            api: {
              id: 154551503,
              name: '审核',
              type: 'http',
              method: 'post',
              path: '/data_approve/approve',
              folderId: 30348765,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551504',
            type: 'apiDetail',
            name: '删除',
            children: [],
            api: {
              id: 154551504,
              name: '删除',
              type: 'http',
              method: 'delete',
              path: '/data_approve/delete/{id}',
              folderId: 30348765,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348765,
          name: '数据审核 控制器',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348768',
        type: 'apiDetailFolder',
        name: '工程信息管理接口',
        children: [
          {
            key: 'apiDetail.154551510',
            type: 'apiDetail',
            name: '根据项目id获取工程信息列表',
            children: [],
            api: {
              id: 154551510,
              name: '根据项目id获取工程信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsGc/getList',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155706190',
            type: 'apiDetail',
            name: '政务端，建设工程基础信息管理，列表查询',
            children: [],
            api: {
              id: 155706190,
              name: '政务端，建设工程基础信息管理，列表查询',
              type: 'http',
              method: 'post',
              path: '/bizCsGc/getGcList',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160006812',
            type: 'apiDetail',
            name: '政务端，建设工程基础信息管理，列表导出',
            children: [],
            api: {
              id: 160006812,
              name: '政务端，建设工程基础信息管理，列表导出',
              type: 'http',
              method: 'post',
              path: '/bizCsGc/exportGcList',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155706191',
            type: 'apiDetail',
            name: '查看工程详情',
            children: [],
            api: {
              id: 155706191,
              name: '查看工程详情',
              type: 'http',
              method: 'post',
              path: '/bizCsGc/detail/{id}',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155706192',
            type: 'apiDetail',
            name: '新增工程',
            children: [],
            api: {
              id: 155706192,
              name: '新增工程',
              type: 'http',
              method: 'post',
              path: '/bizCsGc/add',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155706193',
            type: 'apiDetail',
            name: '修改工程信息',
            children: [],
            api: {
              id: 155706193,
              name: '修改工程信息',
              type: 'http',
              method: 'post',
              path: '/bizCsGc/update',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155706194',
            type: 'apiDetail',
            name: '删除工程',
            children: [],
            api: {
              id: 155706194,
              name: '删除工程',
              type: 'http',
              method: 'post',
              path: '/bizCsGc/delete/{id}',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156297968',
            type: 'apiDetail',
            name: '信息不完整提示',
            children: [],
            api: {
              id: 156297968,
              name: '信息不完整提示',
              type: 'http',
              method: 'post',
              path: '/bizCsGc/prompt',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685967',
            type: 'apiDetail',
            name: '根据条件获取工程消纳数据',
            children: [],
            api: {
              id: 156685967,
              name: '根据条件获取工程消纳数据',
              type: 'http',
              method: 'post',
              path: '/bizSpXnba/manage/page',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159187167',
            type: 'apiDetail',
            name: '查询建设单位下所有工程',
            children: [],
            api: {
              id: 159187167,
              name: '查询建设单位下所有工程',
              type: 'http',
              method: 'get',
              path: '/bizCsGc/pageByJsdw/{jsdwId}',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159792490',
            type: 'apiDetail',
            name: '建设工程用户分页查询',
            children: [],
            api: {
              id: 159792490,
              name: '建设工程用户分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsGc/csgc-user-page',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159792491',
            type: 'apiDetail',
            name: '查询建设单位下所有工程',
            children: [],
            api: {
              id: 159792491,
              name: '查询建设单位下所有工程',
              type: 'http',
              method: 'get',
              path: '/bizCsGc/pageByJsdw/{jsdwid}',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159644750',
            type: 'apiDetail',
            name: '导出建设单位下所有工程',
            children: [],
            api: {
              id: 159644750,
              name: '导出建设单位下所有工程',
              type: 'http',
              method: 'post',
              path: '/bizCsGc/exportPageByJsdw',
              folderId: 30348768,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348768,
          name: '工程信息管理接口',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348770',
        type: 'apiDetailFolder',
        name: '电子围栏信息管理接口文档',
        children: [
          {
            key: 'apiDetail.154551512',
            type: 'apiDetail',
            name: '根据围栏种类查询电子围栏列表信息',
            children: [],
            api: {
              id: 154551512,
              name: '根据围栏种类查询电子围栏列表信息',
              type: 'http',
              method: 'post',
              path: '/bizCsDzwl/getList',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551513',
            type: 'apiDetail',
            name: '导出”根据围栏种类查询电子围栏列表信息“',
            children: [],
            api: {
              id: 154551513,
              name: '导出”根据围栏种类查询电子围栏列表信息“',
              type: 'http',
              method: 'post',
              path: '/bizCsDzwl/exportList',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551514',
            type: 'apiDetail',
            name: '新增电子围栏信息',
            children: [],
            api: {
              id: 154551514,
              name: '新增电子围栏信息',
              type: 'http',
              method: 'post',
              path: '/bizCsDzwl/insertDzwl',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551515',
            type: 'apiDetail',
            name: '根据id编辑电子围栏信息',
            children: [],
            api: {
              id: 154551515,
              name: '根据id编辑电子围栏信息',
              type: 'http',
              method: 'post',
              path: '/bizCsDzwl/updateDzwl',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551516',
            type: 'apiDetail',
            name: '根据电子围栏id查询电子围栏信息',
            children: [],
            api: {
              id: 154551516,
              name: '根据电子围栏id查询电子围栏信息',
              type: 'http',
              method: 'get',
              path: '/bizCsDzwl/getDetail',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551517',
            type: 'apiDetail',
            name: '根据id删除电子围栏信息',
            children: [],
            api: {
              id: 154551517,
              name: '根据id删除电子围栏信息',
              type: 'http',
              method: 'patch',
              path: '/bizCsDzwl/delete',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551518',
            type: 'apiDetail',
            name: '坐标转换',
            children: [],
            api: {
              id: 154551518,
              name: '坐标转换',
              type: 'http',
              method: 'post',
              path: '/bizCsDzwl/changeCoordinate',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551519',
            type: 'apiDetail',
            name: '获取电子围栏名称（检验是否有重复）',
            children: [],
            api: {
              id: 154551519,
              name: '获取电子围栏名称（检验是否有重复）',
              type: 'http',
              method: 'post',
              path: '/bizCsDzwl/getFenceNameNew',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157749682',
            type: 'apiDetail',
            name: '根据当前登录人的相关信息查询项目列表',
            children: [],
            api: {
              id: 157749682,
              name: '根据当前登录人的相关信息查询项目列表',
              type: 'http',
              method: 'get',
              path: '/bizCsDzwl/getXmListByUser',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158275316',
            type: 'apiDetail',
            name: '根据当前登录人的相关信息查询场所信息',
            children: [],
            api: {
              id: 158275316,
              name: '根据当前登录人的相关信息查询场所信息',
              type: 'http',
              method: 'get',
              path: '/bizCsDzwl/getCsNameByUser',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158598204',
            type: 'apiDetail',
            name: '根据围栏id查询电子围栏变更记录数据',
            children: [],
            api: {
              id: 158598204,
              name: '根据围栏id查询电子围栏变更记录数据',
              type: 'http',
              method: 'get',
              path: '/bizCsDzwl/getDzwlBgJl',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159547767',
            type: 'apiDetail',
            name: '根据场所类型 和 场所ID获取电子围栏',
            children: [],
            api: {
              id: 159547767,
              name: '根据场所类型 和 场所ID获取电子围栏',
              type: 'http',
              method: 'get',
              path: '/bizCsDzwl/getDzwlByCs',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163584576',
            type: 'apiDetail',
            name: '周边城市消纳场所查询电子围栏信息',
            children: [],
            api: {
              id: 163584576,
              name: '周边城市消纳场所查询电子围栏信息',
              type: 'http',
              method: 'post',
              path: '/bizCsDzwl/getSurroundCityXncsDzwlList',
              folderId: 30348770,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348770,
          name: '电子围栏信息管理接口文档',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348771',
        type: 'apiDetailFolder',
        name: '周边城市消纳场所信息管理',
        children: [
          {
            key: 'apiDetail.154551520',
            type: 'apiDetail',
            name: '获取消纳场所信息列表',
            children: [],
            api: {
              id: 154551520,
              name: '获取消纳场所信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsXncs/getList',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156782528',
            type: 'apiDetail',
            name: '政务端，消纳场所基础信息管理，列表查询',
            children: [],
            api: {
              id: 156782528,
              name: '政务端，消纳场所基础信息管理，列表查询',
              type: 'http',
              method: 'post',
              path: '/bizCsXncs/getXncsList',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160080080',
            type: 'apiDetail',
            name: '消纳场所用户分页查询',
            children: [],
            api: {
              id: 160080080,
              name: '消纳场所用户分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsXncs/xncs-user-page',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156782529',
            type: 'apiDetail',
            name: '产看消纳场详情',
            children: [],
            api: {
              id: 156782529,
              name: '产看消纳场详情',
              type: 'http',
              method: 'post',
              path: '/bizCsXncs/detail/{id}',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156782530',
            type: 'apiDetail',
            name: '新增消纳场',
            children: [],
            api: {
              id: 156782530,
              name: '新增消纳场',
              type: 'http',
              method: 'post',
              path: '/bizCsXncs/add',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156782531',
            type: 'apiDetail',
            name: '修改消纳场信息',
            children: [],
            api: {
              id: 156782531,
              name: '修改消纳场信息',
              type: 'http',
              method: 'post',
              path: '/bizCsXncs/update',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156782532',
            type: 'apiDetail',
            name: '删除消纳场',
            children: [],
            api: {
              id: 156782532,
              name: '删除消纳场',
              type: 'http',
              method: 'post',
              path: '/bizCsXncs/delete/{id}',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156782533',
            type: 'apiDetail',
            name: '信息不完整提示',
            children: [],
            api: {
              id: 156782533,
              name: '信息不完整提示',
              type: 'http',
              method: 'post',
              path: '/bizCsXncs/prompt',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163598676',
            type: 'apiDetail',
            name: '周边城市消纳场信息管理(本市、外市分开查询)',
            children: [],
            api: {
              id: 163598676,
              name: '周边城市消纳场信息管理(本市、外市分开查询)',
              type: 'http',
              method: 'post',
              path: '/bizCsXncs/getSurroundCityXncsList',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163598677',
            type: 'apiDetail',
            name: '根据消纳场所对应的关联账号id，重置相关密码',
            children: [],
            api: {
              id: 163598677,
              name: '根据消纳场所对应的关联账号id，重置相关密码',
              type: 'http',
              method: 'get',
              path: '/bizCsXncs/xncs-user-pwd_reset',
              folderId: 30348771,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348771,
          name: '周边城市消纳场所信息管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30381894',
        type: 'apiDetailFolder',
        name: '消纳备案申请表(BizSpXnba)表控制层',
        children: [
          {
            key: 'apiDetail.154722090',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 154722090,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizSpXnba/page',
              folderId: 30381894,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154722091',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 154722091,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizSpXnba/selectList',
              folderId: 30381894,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154722092',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 154722092,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSpXnba/getById/{id}',
              folderId: 30381894,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154722093',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 154722093,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizSpXnba/add',
              folderId: 30381894,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154722094',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 154722094,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizSpXnba/update',
              folderId: 30381894,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154722095',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 154722095,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizSpXnba/delete/{id}',
              folderId: 30381894,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30381894,
          name: '消纳备案申请表(BizSpXnba)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30394537',
        type: 'apiDetailFolder',
        name: '无账号创建场所',
        children: [
          {
            key: 'apiDetail.154786743',
            type: 'apiDetail',
            name: '注册场所并创建用户',
            children: [],
            api: {
              id: 154786743,
              name: '注册场所并创建用户',
              type: 'http',
              method: 'post',
              path: '/placeRegister/registerAndCreateUser',
              folderId: 30394537,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159812119',
            type: 'apiDetail',
            name: '无账号创建场所用户',
            children: [],
            api: {
              id: 159812119,
              name: '无账号创建场所用户',
              type: 'http',
              method: 'post',
              path: '/placeRegister/registerUser',
              folderId: 30394537,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155024896',
            type: 'apiDetail',
            name: '根据顶层areaCode获取行政区域树',
            children: [],
            api: {
              id: 155024896,
              name: '根据顶层areaCode获取行政区域树',
              type: 'http',
              method: 'get',
              path: '/placeRegister/treeWithTop',
              folderId: 30394537,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155024897',
            type: 'apiDetail',
            name: '通过组织部门名称 模糊查询',
            children: [],
            api: {
              id: 155024897,
              name: '通过组织部门名称 模糊查询',
              type: 'http',
              method: 'get',
              path: '/placeRegister/getOrgDeptByName',
              folderId: 30394537,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155024898',
            type: 'apiDetail',
            name: '通过项目名称 模糊查询',
            children: [],
            api: {
              id: 155024898,
              name: '通过项目名称 模糊查询',
              type: 'http',
              method: 'get',
              path: '/placeRegister/getXmByName',
              folderId: 30394537,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30394537,
          name: '无账号创建场所',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30447476',
        type: 'apiDetailFolder',
        name: '短信 控制器',
        children: [
          {
            key: 'apiDetail.155071912',
            type: 'apiDetail',
            name: '生成验证码发送短信',
            children: [],
            api: {
              id: 155071912,
              name: '生成验证码发送短信',
              type: 'http',
              method: 'get',
              path: '/telMsg/validCode/createAndSend',
              folderId: 30447476,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155071913',
            type: 'apiDetail',
            name: '检验验证码是否正确',
            children: [],
            api: {
              id: 155071913,
              name: '检验验证码是否正确',
              type: 'http',
              method: 'get',
              path: '/telMsg/validCode/valid',
              folderId: 30447476,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155071914',
            type: 'apiDetail',
            name: '发送短信',
            children: [],
            api: {
              id: 155071914,
              name: '发送短信',
              type: 'http',
              method: 'get',
              path: '/telMsg/msg/createMsgAndSend',
              folderId: 30447476,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30447476,
          name: '短信 控制器',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30448401',
        type: 'apiDetailFolder',
        name: '测试表(Test)表控制层',
        children: [
          {
            key: 'apiDetail.155076759',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 155076759,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/test/page',
              folderId: 30448401,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155076760',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 155076760,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/test/selectList',
              folderId: 30448401,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155076761',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 155076761,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/test/getById',
              folderId: 30448401,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155076762',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 155076762,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/test/add',
              folderId: 30448401,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155076763',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 155076763,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/test/update',
              folderId: 30448401,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155076764',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 155076764,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/test/delete}',
              folderId: 30448401,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30448401,
          name: '测试表(Test)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30475854',
        type: 'apiDetailFolder',
        name: '排放消纳场信息表(BizSpPfxn)表控制层',
        children: [
          {
            key: 'apiDetail.155215940',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 155215940,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizSpPfxn/page',
              folderId: 30475854,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215941',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 155215941,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizSpPfxn/selectList',
              folderId: 30475854,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215942',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 155215942,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSpPfxn/getById/{id}',
              folderId: 30475854,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215943',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 155215943,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizSpPfxn/add',
              folderId: 30475854,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215944',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 155215944,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizSpPfxn/update',
              folderId: 30475854,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215945',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 155215945,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizSpPfxn/delete/{id}',
              folderId: 30475854,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215946',
            type: 'apiDetail',
            name: '根据条件获取工程排放计划分页列表',
            children: [],
            api: {
              id: 155215946,
              name: '根据条件获取工程排放计划分页列表',
              type: 'http',
              method: 'post',
              path: '/bizSpPfxn/discharge/plan/page',
              folderId: 30475854,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215947',
            type: 'apiDetail',
            name: '根据计划获取工程排放计划详情',
            children: [],
            api: {
              id: 155215947,
              name: '根据计划获取工程排放计划详情',
              type: 'http',
              method: 'post',
              path: '/bizSpPfxn/discharge/plan/{id}',
              folderId: 30475854,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215948',
            type: 'apiDetail',
            name: '根据条件获取回填工地消纳计划列表',
            children: [],
            api: {
              id: 155215948,
              name: '根据条件获取回填工地消纳计划列表',
              type: 'http',
              method: 'post',
              path: '/bizSpPfxn/htgd/plan/page',
              folderId: 30475854,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30475854,
          name: '排放消纳场信息表(BizSpPfxn)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30475862',
        type: 'apiDetailFolder',
        name: '施工许可证或主管部门同意开工的文件或拆除工程备案回执的扫描件信息表(BusiDischargeRecordAttach)表控制层',
        children: [
          {
            key: 'apiDetail.155215982',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 155215982,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/busiDischargeRecordAttach/page',
              folderId: 30475862,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215983',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 155215983,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/busiDischargeRecordAttach/selectList',
              folderId: 30475862,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215984',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 155215984,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/busiDischargeRecordAttach/getById/{id}',
              folderId: 30475862,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215985',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 155215985,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/busiDischargeRecordAttach/add',
              folderId: 30475862,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215986',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 155215986,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/busiDischargeRecordAttach/update',
              folderId: 30475862,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155215987',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 155215987,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/busiDischargeRecordAttach/delete/{id}',
              folderId: 30475862,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155220679',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 155220679,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'post',
              path: '/busiDischargeRecordAttach/manage/page',
              folderId: 30475862,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30475862,
          name: '施工许可证或主管部门同意开工的文件或拆除工程备案回执的扫描件信息表(BusiDischargeRecordAttach)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30595954',
        type: 'apiDetailFolder',
        name: 'APP签认帐号表(PubSignAccount)表控制层',
        children: [
          {
            key: 'apiDetail.155873762',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 155873762,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/pubSignAccount/page',
              folderId: 30595954,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873763',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 155873763,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/pubSignAccount/selectList',
              folderId: 30595954,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873764',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 155873764,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/pubSignAccount/getById',
              folderId: 30595954,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873765',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 155873765,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/pubSignAccount/add',
              folderId: 30595954,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873766',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 155873766,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/pubSignAccount/update',
              folderId: 30595954,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873767',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 155873767,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/pubSignAccount/delete}',
              folderId: 30595954,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159899404',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 159899404,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/pubSignAccount/delete',
              folderId: 30595954,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159899405',
            type: 'apiDetail',
            name: '批量更新状态',
            children: [],
            api: {
              id: 159899405,
              name: '批量更新状态',
              type: 'http',
              method: 'post',
              path: '/pubSignAccount/update-status',
              folderId: 30595954,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685968',
            type: 'apiDetail',
            name: '根据条件获取签认用户列表',
            children: [],
            api: {
              id: 156685968,
              name: '根据条件获取签认用户列表',
              type: 'http',
              method: 'post',
              path: '/pubSignAccount/manage/page',
              folderId: 30595954,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30595954,
          name: 'APP签认帐号表(PubSignAccount)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30595996',
        type: 'apiDetailFolder',
        name: '消纳证明信息表(BusiXnProve)表控制层',
        children: [
          {
            key: 'apiDetail.155873979',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 155873979,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/busiXnProve/page',
              folderId: 30595996,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873980',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 155873980,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/busiXnProve/list',
              folderId: 30595996,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873981',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 155873981,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/busiXnProve/detail',
              folderId: 30595996,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873982',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 155873982,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/busiXnProve/save',
              folderId: 30595996,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873983',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 155873983,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/busiXnProve/update',
              folderId: 30595996,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873984',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 155873984,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/busiXnProve/delete',
              folderId: 30595996,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155873985',
            type: 'apiDetail',
            name: '根据条件获取消纳证明数据',
            children: [],
            api: {
              id: 155873985,
              name: '根据条件获取消纳证明数据',
              type: 'http',
              method: 'post',
              path: '/busiXnProve/manage/page',
              folderId: 30595996,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30595996,
          name: '消纳证明信息表(BusiXnProve)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30596033',
        type: 'apiDetailFolder',
        name: '工程行政处罚信息表(BusiGcAdministrationPunish)表控制层',
        children: [
          {
            key: 'apiDetail.155874190',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 155874190,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/busiGcAdministrationPunish/page',
              folderId: 30596033,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874191',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 155874191,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/busiGcAdministrationPunish/list',
              folderId: 30596033,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874192',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 155874192,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/busiGcAdministrationPunish/detail',
              folderId: 30596033,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874193',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 155874193,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/busiGcAdministrationPunish/save',
              folderId: 30596033,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874194',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 155874194,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/busiGcAdministrationPunish/update',
              folderId: 30596033,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874195',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 155874195,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/busiGcAdministrationPunish/delete',
              folderId: 30596033,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874196',
            type: 'apiDetail',
            name: '根据条件获取工程行政处罚信息列表',
            children: [],
            api: {
              id: 155874196,
              name: '根据条件获取工程行政处罚信息列表',
              type: 'http',
              method: 'post',
              path: '/busiGcAdministrationPunish/manage/page',
              folderId: 30596033,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30596033,
          name: '工程行政处罚信息表(BusiGcAdministrationPunish)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30596075',
        type: 'apiDetailFolder',
        name: '工程排放信息表(BizSpGcpf)表控制层',
        children: [
          {
            key: 'apiDetail.155874441',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 155874441,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizSpGcpf/page',
              folderId: 30596075,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874442',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 155874442,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizSpGcpf/selectList',
              folderId: 30596075,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874443',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 155874443,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSpGcpf/getById/{id}',
              folderId: 30596075,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874444',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 155874444,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizSpGcpf/add',
              folderId: 30596075,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874445',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 155874445,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizSpGcpf/update',
              folderId: 30596075,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874446',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 155874446,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizSpGcpf/delete/{id}',
              folderId: 30596075,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.155874447',
            type: 'apiDetail',
            name: '根据条件获取工程排放数据',
            children: [],
            api: {
              id: 155874447,
              name: '根据条件获取工程排放数据',
              type: 'http',
              method: 'post',
              path: '/bizSpGcpf/manage/page',
              folderId: 30596075,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30596075,
          name: '工程排放信息表(BizSpGcpf)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30750258',
        type: 'apiDetailFolder',
        name: '运进运出再生材料、再生产品相关接口',
        children: [
          {
            key: 'apiDetail.157227894',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 157227894,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsYjyczscpcl/page',
              folderId: 30750258,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157227895',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 157227895,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/bizCsYjyczscpcl/list',
              folderId: 30750258,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685190',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 156685190,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsYjyczscpcl/detail',
              folderId: 30750258,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685191',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 156685191,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsYjyczscpcl/save',
              folderId: 30750258,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685192',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 156685192,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/bizCsYjyczscpcl/update',
              folderId: 30750258,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685193',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 156685193,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/bizCsYjyczscpcl/delete',
              folderId: 30750258,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685194',
            type: 'apiDetail',
            name: '根据再生产品、材料页面参数查询再生相关列表',
            children: [],
            api: {
              id: 156685194,
              name: '根据再生产品、材料页面参数查询再生相关列表',
              type: 'http',
              method: 'post',
              path: '/bizCsYjyczscpcl/getList',
              folderId: 30750258,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157227896',
            type: 'apiDetail',
            name: '导出”再生产品、材料页面参数查询再生相关列表“',
            children: [],
            api: {
              id: 157227896,
              name: '导出”再生产品、材料页面参数查询再生相关列表“',
              type: 'http',
              method: 'post',
              path: '/bizCsYjyczscpcl/exportList',
              folderId: 30750258,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159252301',
            type: 'apiDetail',
            name: '确认',
            children: [],
            api: {
              id: 159252301,
              name: '确认',
              type: 'http',
              method: 'patch',
              path: '/bizCsYjyczscpcl/confirm',
              folderId: 30750258,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30750258,
          name: '运进运出再生材料、再生产品相关接口',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30750434',
        type: 'apiDetailFolder',
        name: '项目表(BizCsXm)表控制层',
        children: [
          {
            key: 'apiDetail.154551511',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 154551511,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsXm/page',
              folderId: 30750434,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685975',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 156685975,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsXm/selectList',
              folderId: 30750434,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159063909',
            type: 'apiDetail',
            name: '按建设单位查询关联项目',
            children: [],
            api: {
              id: 159063909,
              name: '按建设单位查询关联项目',
              type: 'http',
              method: 'get',
              path: '/bizCsXm/selectByJsdw',
              folderId: 30750434,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159644725',
            type: 'apiDetail',
            name: '导出按建设单位查询关联项目',
            children: [],
            api: {
              id: 159644725,
              name: '导出按建设单位查询关联项目',
              type: 'http',
              method: 'post',
              path: '/bizCsXm/exportSelectByJsdw',
              folderId: 30750434,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685976',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 156685976,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsXm/getById/{id}',
              folderId: 30750434,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685977',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 156685977,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsXm/add',
              folderId: 30750434,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685978',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 156685978,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsXm/update',
              folderId: 30750434,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685979',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 156685979,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsXm/delete/{id}',
              folderId: 30750434,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160095079',
            type: 'apiDetail',
            name: '项目用户分页查询',
            children: [],
            api: {
              id: 160095079,
              name: '项目用户分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsXm/csxm-user-page',
              folderId: 30750434,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30750434,
          name: '项目表(BizCsXm)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30750435',
        type: 'apiDetailFolder',
        name: '再生产品、再生材料信息明细表(BizCsZscpclmx)表控制层',
        children: [
          {
            key: 'apiDetail.156685980',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 156685980,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsZscpclmx/page',
              folderId: 30750435,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685981',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 156685981,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/bizCsZscpclmx/list',
              folderId: 30750435,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685982',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 156685982,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsZscpclmx/detail',
              folderId: 30750435,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685983',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 156685983,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsZscpclmx/save',
              folderId: 30750435,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685984',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 156685984,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/bizCsZscpclmx/update',
              folderId: 30750435,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156685985',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 156685985,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/bizCsZscpclmx/delete',
              folderId: 30750435,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30750435,
          name: '再生产品、再生材料信息明细表(BizCsZscpclmx)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30712581',
        type: 'apiDetailFolder',
        name: '现场分类处置的装修或施工废弃物流向信息登记表(BizCsLxdj)表控制层',
        children: [
          {
            key: 'apiDetail.156484569',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 156484569,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsLxdj/page',
              folderId: 30712581,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156484570',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 156484570,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/bizCsLxdj/list',
              folderId: 30712581,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156484571',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 156484571,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsLxdj/detail',
              folderId: 30712581,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156484572',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 156484572,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsLxdj/save',
              folderId: 30712581,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156484573',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 156484573,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/bizCsLxdj/update',
              folderId: 30712581,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156484574',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 156484574,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/bizCsLxdj/delete',
              folderId: 30712581,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.156484575',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 156484575,
              name: '分页查询',
              type: 'http',
              method: 'post',
              path: '/bizCsLxdj/manage/page',
              folderId: 30712581,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30712581,
          name: '现场分类处置的装修或施工废弃物流向信息登记表(BizCsLxdj)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30885211',
        type: 'apiDetailFolder',
        name: '角色、角色组、场所角色信息管理',
        children: [
          {
            key: 'apiDetail.157414438',
            type: 'apiDetail',
            name: '下拉列表',
            children: [],
            api: {
              id: 157414438,
              name: '下拉列表',
              type: 'http',
              method: 'get',
              path: '/role/select',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166042246',
            type: 'apiDetail',
            name: '下拉列表',
            children: [],
            api: {
              id: 166042246,
              name: '下拉列表',
              type: 'http',
              method: 'post',
              path: '/role/select',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414439',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 157414439,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/role/page',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414440',
            type: 'apiDetail',
            name: '根据角色/组编号获取详细信息',
            children: [],
            api: {
              id: 157414440,
              name: '根据角色/组编号获取详细信息',
              type: 'http',
              method: 'get',
              path: '/role/detail',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414441',
            type: 'apiDetail',
            name: '新增角色/组',
            children: [],
            api: {
              id: 157414441,
              name: '新增角色/组',
              type: 'http',
              method: 'post',
              path: '/role/add',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414442',
            type: 'apiDetail',
            name: '更新角色/组',
            children: [],
            api: {
              id: 157414442,
              name: '更新角色/组',
              type: 'http',
              method: 'post',
              path: '/role/edit',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414443',
            type: 'apiDetail',
            name: '删除角色/组',
            children: [],
            api: {
              id: 157414443,
              name: '删除角色/组',
              type: 'http',
              method: 'post',
              path: '/role/del',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414444',
            type: 'apiDetail',
            name: '角色组新增角色',
            children: [],
            api: {
              id: 157414444,
              name: '角色组新增角色',
              type: 'http',
              method: 'post',
              path: '/role/add-role',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414445',
            type: 'apiDetail',
            name: '角色组删除角色',
            children: [],
            api: {
              id: 157414445,
              name: '角色组删除角色',
              type: 'http',
              method: 'post',
              path: '/role/del-role',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414446',
            type: 'apiDetail',
            name: '查看角色的权限',
            children: [],
            api: {
              id: 157414446,
              name: '查看角色的权限',
              type: 'http',
              method: 'get',
              path: '/role/query-grant',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414447',
            type: 'apiDetail',
            name: '角色的权限菜单授权',
            children: [],
            api: {
              id: 157414447,
              name: '角色的权限菜单授权',
              type: 'http',
              method: 'post',
              path: '/role/grant',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157414448',
            type: 'apiDetail',
            name: '根据用户ID查询用户所有有效的角色和角色组',
            children: [],
            api: {
              id: 157414448,
              name: '根据用户ID查询用户所有有效的角色和角色组',
              type: 'http',
              method: 'get',
              path: '/role/getRoleAndGroupByUserId',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.159463796',
            type: 'apiDetail',
            name: 'getEnabledRegisterRoles',
            children: [],
            api: {
              id: 159463796,
              name: 'getEnabledRegisterRoles',
              type: 'http',
              method: 'get',
              path: '/role/getEnabledRegisterRoles',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166762637',
            type: 'apiDetail',
            name: '判断角色、角色组是否被用户关联',
            children: [],
            api: {
              id: 166762637,
              name: '判断角色、角色组是否被用户关联',
              type: 'http',
              method: 'get',
              path: '/role/queryByUser',
              folderId: 30885211,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30885211,
          name: '角色、角色组、场所角色信息管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30894855',
        type: 'apiDetailFolder',
        name: '场所派送认领表(BizCsPsrl)表控制层',
        children: [
          {
            key: 'apiDetail.157572221',
            type: 'apiDetail',
            name: '建设工程派送认领 分页查询',
            children: [],
            api: {
              id: 157572221,
              name: '建设工程派送认领 分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsPsrl/jsgcpsPage',
              folderId: 30894855,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157572222',
            type: 'apiDetail',
            name: '消纳场所派送认领 分页查询',
            children: [],
            api: {
              id: 157572222,
              name: '消纳场所派送认领 分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsPsrl/xncspsPage',
              folderId: 30894855,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157788749',
            type: 'apiDetail',
            name: '工程/场所派送',
            children: [],
            api: {
              id: 157788749,
              name: '工程/场所派送',
              type: 'http',
              method: 'post',
              path: '/bizCsPsrl/ps',
              folderId: 30894855,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.157788750',
            type: 'apiDetail',
            name: '工程/场所-认领/拒拎',
            children: [],
            api: {
              id: 157788750,
              name: '工程/场所-认领/拒拎',
              type: 'http',
              method: 'post',
              path: '/bizCsPsrl/rljl',
              folderId: 30894855,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30894855,
          name: '场所派送认领表(BizCsPsrl)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31063040',
        type: 'apiDetailFolder',
        name: '单位信息表(BizCsQydw)表控制层',
        children: [
          {
            key: 'apiDetail.158329979',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 158329979,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsQydw/page',
              folderId: 31063040,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158329980',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 158329980,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsQydw/selectList',
              folderId: 31063040,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158329981',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 158329981,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsQydw/getById',
              folderId: 31063040,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158329982',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 158329982,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsQydw/add',
              folderId: 31063040,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158329983',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 158329983,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsQydw/update',
              folderId: 31063040,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158329984',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 158329984,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsQydw/delete',
              folderId: 31063040,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160086950',
            type: 'apiDetail',
            name: '企业用户分页查询',
            children: [],
            api: {
              id: 160086950,
              name: '企业用户分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsQydw/qydw-user-page',
              folderId: 31063040,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31063040,
          name: '单位信息表(BizCsQydw)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31134687',
        type: 'apiDetailFolder',
        name: '终端设备信息表 前端控制器',
        children: [
          {
            key: 'apiDetail.158668007',
            type: 'apiDetail',
            name: '终端设备列表查询',
            children: [],
            api: {
              id: 158668007,
              name: '终端设备列表查询',
              type: 'http',
              method: 'post',
              path: '/bizCsZdsb/list',
              folderId: 31134687,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158668008',
            type: 'apiDetail',
            name: '产看终端设备详情',
            children: [],
            api: {
              id: 158668008,
              name: '产看终端设备详情',
              type: 'http',
              method: 'post',
              path: '/bizCsZdsb/detail/{id}',
              folderId: 31134687,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158668009',
            type: 'apiDetail',
            name: '新增终端设备',
            children: [],
            api: {
              id: 158668009,
              name: '新增终端设备',
              type: 'http',
              method: 'post',
              path: '/bizCsZdsb/add',
              folderId: 31134687,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158668010',
            type: 'apiDetail',
            name: '修改终端设备',
            children: [],
            api: {
              id: 158668010,
              name: '修改终端设备',
              type: 'http',
              method: 'post',
              path: '/bizCsZdsb/update',
              folderId: 31134687,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158668011',
            type: 'apiDetail',
            name: '删除终端设备',
            children: [],
            api: {
              id: 158668011,
              name: '删除终端设备',
              type: 'http',
              method: 'post',
              path: '/bizCsZdsb/delete/{id}',
              folderId: 31134687,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31134687,
          name: '终端设备信息表 前端控制器',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31150317',
        type: 'apiDetailFolder',
        name: '工程监督检查信息表(BusiGcSuperviseInspect)表控制层',
        children: [
          {
            key: 'apiDetail.158741910',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 158741910,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/busiGcSuperviseInspect/page',
              folderId: 31150317,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158741911',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 158741911,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/busiGcSuperviseInspect/list',
              folderId: 31150317,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158741912',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 158741912,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/busiGcSuperviseInspect/detail',
              folderId: 31150317,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158741913',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 158741913,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/busiGcSuperviseInspect/save',
              folderId: 31150317,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158741914',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 158741914,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/busiGcSuperviseInspect/update',
              folderId: 31150317,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158741915',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 158741915,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/busiGcSuperviseInspect/delete',
              folderId: 31150317,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.158745898',
            type: 'apiDetail',
            name: '根据条件获取工程行政处罚信息列表',
            children: [],
            api: {
              id: 158745898,
              name: '根据条件获取工程行政处罚信息列表',
              type: 'http',
              method: 'post',
              path: '/busiGcSuperviseInspect/manage/page',
              folderId: 31150317,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31150317,
          name: '工程监督检查信息表(BusiGcSuperviseInspect)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31449515',
        type: 'apiDetailFolder',
        name: '卸船点表 前端控制器',
        children: [
          {
            key: 'apiDetail.160345676',
            type: 'apiDetail',
            name: '产看卸船点详情',
            children: [],
            api: {
              id: 160345676,
              name: '产看卸船点详情',
              type: 'http',
              method: 'post',
              path: '/bizCsXcd/detail/{id}',
              folderId: 31449515,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160345677',
            type: 'apiDetail',
            name: '修改卸船点信息',
            children: [],
            api: {
              id: 160345677,
              name: '修改卸船点信息',
              type: 'http',
              method: 'post',
              path: '/bizCsXcd/update',
              folderId: 31449515,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166185693',
            type: 'apiDetail',
            name: '根据卸船点主键id，查询其对应的电子围栏数据',
            children: [],
            api: {
              id: 166185693,
              name: '根据卸船点主键id，查询其对应的电子围栏数据',
              type: 'http',
              method: 'get',
              path: '/bizCsXcd/getDzwlByXcdId',
              folderId: 31449515,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31449515,
          name: '卸船点表 前端控制器',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31704492',
        type: 'apiDetailFolder',
        name: '源头减排信息表(BizCsYtjp)表控制层',
        children: [
          {
            key: 'apiDetail.161637613',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 161637613,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsYtjp/page',
              folderId: 31704492,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637614',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 161637614,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsYtjp/selectList',
              folderId: 31704492,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637615',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 161637615,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsYtjp/getById',
              folderId: 31704492,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637616',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 161637616,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'post',
              path: '/bizCsYtjp/detail/{id}',
              folderId: 31704492,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637617',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 161637617,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsYtjp/add',
              folderId: 31704492,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637618',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 161637618,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsYtjp/update',
              folderId: 31704492,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637619',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 161637619,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsYtjp/delete',
              folderId: 31704492,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637620',
            type: 'apiDetail',
            name: '根据条件获取源头减排信息数据',
            children: [],
            api: {
              id: 161637620,
              name: '根据条件获取源头减排信息数据',
              type: 'http',
              method: 'post',
              path: '/bizCsYtjp/manage/page',
              folderId: 31704492,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637621',
            type: 'apiDetail',
            name: '根据条件导出源头减排信息列表',
            children: [],
            api: {
              id: 161637621,
              name: '根据条件导出源头减排信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsYtjp/exportList',
              folderId: 31704492,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31704492,
          name: '源头减排信息表(BizCsYtjp)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31704524',
        type: 'apiDetailFolder',
        name: '建筑废弃物需求信息表(BizCsJzfqwxq)表控制层',
        children: [
          {
            key: 'apiDetail.161637739',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 161637739,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsJzfqwxq/page',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637740',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 161637740,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsJzfqwxq/selectList',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637741',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 161637741,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsJzfqwxq/getById',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637742',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 161637742,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsJzfqwxq/add',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637743',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 161637743,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsJzfqwxq/update',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637744',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 161637744,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsJzfqwxq/delete',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637745',
            type: 'apiDetail',
            name: '排放建筑废弃物需求信息详情',
            children: [],
            api: {
              id: 161637745,
              name: '排放建筑废弃物需求信息详情',
              type: 'http',
              method: 'get',
              path: '/bizCsJzfqwxq/pf/detail/{id}',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637746',
            type: 'apiDetail',
            name: '消纳建筑废弃物需求信息详情',
            children: [],
            api: {
              id: 161637746,
              name: '消纳建筑废弃物需求信息详情',
              type: 'http',
              method: 'get',
              path: '/bizCsJzfqwxq/xn/detail/{id}',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637747',
            type: 'apiDetail',
            name: '根据条件获取排放建筑废弃物需求信息列表',
            children: [],
            api: {
              id: 161637747,
              name: '根据条件获取排放建筑废弃物需求信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsJzfqwxq/pf/manage/page',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637748',
            type: 'apiDetail',
            name: '根据条件获取消纳建筑废弃物需求信息列表',
            children: [],
            api: {
              id: 161637748,
              name: '根据条件获取消纳建筑废弃物需求信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsJzfqwxq/xn/manage/page',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637749',
            type: 'apiDetail',
            name: '根据条件导出排放建筑废弃物需求信息列表',
            children: [],
            api: {
              id: 161637749,
              name: '根据条件导出排放建筑废弃物需求信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsJzfqwxq/pf/exportList',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.161637750',
            type: 'apiDetail',
            name: '根据条件导出消纳建筑废弃物需求信息列表',
            children: [],
            api: {
              id: 161637750,
              name: '根据条件导出消纳建筑废弃物需求信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsJzfqwxq/xn/exportList',
              folderId: 31704524,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31704524,
          name: '建筑废弃物需求信息表(BizCsJzfqwxq)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31794876',
        type: 'apiDetailFolder',
        name: '已删除工程管理',
        children: [
          {
            key: 'apiDetail.162073296',
            type: 'apiDetail',
            name: '已删除工程分页查询',
            children: [],
            api: {
              id: 162073296,
              name: '已删除工程分页查询',
              type: 'http',
              method: 'get',
              path: '/deletedGcgl/page',
              folderId: 31794876,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162073297',
            type: 'apiDetail',
            name: '还原用户',
            children: [],
            api: {
              id: 162073297,
              name: '还原用户',
              type: 'http',
              method: 'post',
              path: '/deletedGcgl/restoreUser',
              folderId: 31794876,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162073298',
            type: 'apiDetail',
            name: '关联建设工程查询详情',
            children: [],
            api: {
              id: 162073298,
              name: '关联建设工程查询详情',
              type: 'http',
              method: 'get',
              path: '/deletedGcgl/detailGc/{id}',
              folderId: 31794876,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31794876,
          name: '已删除工程管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31794885',
        type: 'apiDetailFolder',
        name: '工程备选库管理',
        children: [
          {
            key: 'apiDetail.162073335',
            type: 'apiDetail',
            name: '分页查询备选库工程',
            children: [],
            api: {
              id: 162073335,
              name: '分页查询备选库工程',
              type: 'http',
              method: 'get',
              path: '/gcBxkGl/page',
              folderId: 31794885,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162073336',
            type: 'apiDetail',
            name: '编辑备选库工程',
            children: [],
            api: {
              id: 162073336,
              name: '编辑备选库工程',
              type: 'http',
              method: 'post',
              path: '/gcBxkGl/editGc',
              folderId: 31794885,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162073337',
            type: 'apiDetail',
            name: '删除备选库工程用户',
            children: [],
            api: {
              id: 162073337,
              name: '删除备选库工程用户',
              type: 'http',
              method: 'post',
              path: '/gcBxkGl/deleteGcUser',
              folderId: 31794885,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162073338',
            type: 'apiDetail',
            name: '工程查询详情',
            children: [],
            api: {
              id: 162073338,
              name: '工程查询详情',
              type: 'http',
              method: 'get',
              path: '/gcBxkGl/detailGc/{id}',
              folderId: 31794885,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162073339',
            type: 'apiDetail',
            name: '重置密码',
            children: [],
            api: {
              id: 162073339,
              name: '重置密码',
              type: 'http',
              method: 'post',
              path: '/gcBxkGl/resetPwd',
              folderId: 31794885,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162802510',
            type: 'apiDetail',
            name: '创建账号',
            children: [],
            api: {
              id: 162802510,
              name: '创建账号',
              type: 'http',
              method: 'post',
              path: '/gcBxkGl/addGcBxkUser',
              folderId: 31794885,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31794885,
          name: '工程备选库管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31877448',
        type: 'apiDetailFolder',
        name: '施工现场综合利用信息表(BizCsSgxczhly)表控制层',
        children: [
          {
            key: 'apiDetail.162489284',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 162489284,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsSgxczhly/page',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489285',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 162489285,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsSgxczhly/selectList',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489286',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 162489286,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsSgxczhly/getById',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489287',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 162489287,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhly/add',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489288',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 162489288,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsSgxczhly/update',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489289',
            type: 'apiDetail',
            name: '新增施工现场开展综合利用APP账号',
            children: [],
            api: {
              id: 162489289,
              name: '新增施工现场开展综合利用APP账号',
              type: 'http',
              method: 'put',
              path: '/bizCsSgxczhly/add/account',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489290',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 162489290,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsSgxczhly/delete',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489291',
            type: 'apiDetail',
            name: '移除',
            children: [],
            api: {
              id: 162489291,
              name: '移除',
              type: 'http',
              method: 'delete',
              path: '/bizCsSgxczhly/remove/{id}',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489292',
            type: 'apiDetail',
            name: '查看上报材料',
            children: [],
            api: {
              id: 162489292,
              name: '查看上报材料',
              type: 'http',
              method: 'get',
              path: '/bizCsSgxczhly/view/{id}',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162954878',
            type: 'apiDetail',
            name: '阅知/查看详情',
            children: [],
            api: {
              id: 162954878,
              name: '阅知/查看详情',
              type: 'http',
              method: 'get',
              path: '/bizCsSgxczhly/view/{id}',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489293',
            type: 'apiDetail',
            name: '根据条件获取公众测施工单位施工现场综合利用信息列表',
            children: [],
            api: {
              id: 162489293,
              name: '根据条件获取公众测施工单位施工现场综合利用信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhly/sgdw/manage/page',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489294',
            type: 'apiDetail',
            name: '根据条件获取公众测综合利用厂施工现场综合利用信息列表',
            children: [],
            api: {
              id: 162489294,
              name: '根据条件获取公众测综合利用厂施工现场综合利用信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhly/zhly/manage/page',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489295',
            type: 'apiDetail',
            name: '根据条件获取政务测上报施工现场综合利用信息列表',
            children: [],
            api: {
              id: 162489295,
              name: '根据条件获取政务测上报施工现场综合利用信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhly/zhlyzwSb/manage/page',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489296',
            type: 'apiDetail',
            name: '根据条件获取政务测施工现场综合利用信息列表',
            children: [],
            api: {
              id: 162489296,
              name: '根据条件获取政务测施工现场综合利用信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhly/zhlyzw/manage/page',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489297',
            type: 'apiDetail',
            name: '根据条件导出政务测施工现场综合利用信息列表',
            children: [],
            api: {
              id: 162489297,
              name: '根据条件导出政务测施工现场综合利用信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhly/exportZhlyzwList',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489298',
            type: 'apiDetail',
            name: '根据条件导出政务测上报施工现场综合利用信息列表',
            children: [],
            api: {
              id: 162489298,
              name: '根据条件导出政务测上报施工现场综合利用信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhly/exportZhlyzwSbList',
              folderId: 31877448,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31877448,
          name: '施工现场综合利用信息表(BizCsSgxczhly)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31877465',
        type: 'apiDetailFolder',
        name: '施工现场综合利用信息阅读记录表(BizCsSgxczhlyYdjl)表控制层',
        children: [
          {
            key: 'apiDetail.162489438',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 162489438,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsSgxczhlyYdjl/page',
              folderId: 31877465,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489439',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 162489439,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/bizCsSgxczhlyYdjl/list',
              folderId: 31877465,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489440',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 162489440,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsSgxczhlyYdjl/detail',
              folderId: 31877465,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489441',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 162489441,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhlyYdjl/save',
              folderId: 31877465,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489442',
            type: 'apiDetail',
            name: '阅知',
            children: [],
            api: {
              id: 162489442,
              name: '阅知',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhlyYdjl/read',
              folderId: 31877465,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489443',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 162489443,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhlyYdjl/update',
              folderId: 31877465,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162489444',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 162489444,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/bizCsSgxczhlyYdjl/delete',
              folderId: 31877465,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31877465,
          name: '施工现场综合利用信息阅读记录表(BizCsSgxczhlyYdjl)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31961042',
        type: 'apiDetailFolder',
        name: '销售或应用再生材料、产品表(BizCsXsyyzs)表控制层',
        children: [
          {
            key: 'apiDetail.163128592',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 163128592,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsXsyyzs/page',
              folderId: 31961042,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163128593',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 163128593,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/bizCsXsyyzs/list',
              folderId: 31961042,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162940545',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 162940545,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsXsyyzs/detail',
              folderId: 31961042,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162940546',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 162940546,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsXsyyzs/save',
              folderId: 31961042,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162940547',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 162940547,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/bizCsXsyyzs/update',
              folderId: 31961042,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162940548',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 162940548,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/bizCsXsyyzs/delete',
              folderId: 31961042,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162971985',
            type: 'apiDetail',
            name: '分页查询应用或销售再生材料、再生产品信息管理',
            children: [],
            api: {
              id: 162971985,
              name: '分页查询应用或销售再生材料、再生产品信息管理',
              type: 'http',
              method: 'post',
              path: '/bizCsXsyyzs/getListByPage',
              folderId: 31961042,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163501621',
            type: 'apiDetail',
            name: '导出”应用或销售再生材料、再生产品信息“',
            children: [],
            api: {
              id: 163501621,
              name: '导出”应用或销售再生材料、再生产品信息“',
              type: 'http',
              method: 'post',
              path: '/bizCsXsyyzs/exportList',
              folderId: 31961042,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31961042,
          name: '销售或应用再生材料、产品表(BizCsXsyyzs)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31965112',
        type: 'apiDetailFolder',
        name: '建设项目工程管理',
        children: [
          {
            key: 'apiDetail.162963502',
            type: 'apiDetail',
            name: '项目用户分页查询',
            children: [],
            api: {
              id: 162963502,
              name: '项目用户分页查询',
              type: 'http',
              method: 'get',
              path: '/bizJsXmGl/csxm-user-page',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162963503',
            type: 'apiDetail',
            name: '新增建设项目',
            children: [],
            api: {
              id: 162963503,
              name: '新增建设项目',
              type: 'http',
              method: 'post',
              path: '/bizJsXmGl/add',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162963504',
            type: 'apiDetail',
            name: '修改建设项目',
            children: [],
            api: {
              id: 162963504,
              name: '修改建设项目',
              type: 'http',
              method: 'post',
              path: '/bizJsXmGl/update',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162963505',
            type: 'apiDetail',
            name: '关联建设工程查询',
            children: [],
            api: {
              id: 162963505,
              name: '关联建设工程查询',
              type: 'http',
              method: 'get',
              path: '/bizJsXmGl/linkage/{xmid}',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162963506',
            type: 'apiDetail',
            name: '关联建设工程查询详情',
            children: [],
            api: {
              id: 162963506,
              name: '关联建设工程查询详情',
              type: 'http',
              method: 'get',
              path: '/bizJsXmGl/linkage/detail/{id}',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162963507',
            type: 'apiDetail',
            name: '重置密码',
            children: [],
            api: {
              id: 162963507,
              name: '重置密码',
              type: 'http',
              method: 'post',
              path: '/bizJsXmGl/resetPwd',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163496111',
            type: 'apiDetail',
            name: '删除建设项目用户数据',
            children: [],
            api: {
              id: 163496111,
              name: '删除建设项目用户数据',
              type: 'http',
              method: 'delete',
              path: '/bizJsXmGl/deleteXmUser',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162963509',
            type: 'apiDetail',
            name: '查询建设单位数据list',
            children: [],
            api: {
              id: 162963509,
              name: '查询建设单位数据list',
              type: 'http',
              method: 'get',
              path: '/bizJsXmGl/selectJsdwList',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162963510',
            type: 'apiDetail',
            name: '根据项目id查询项目详情',
            children: [],
            api: {
              id: 162963510,
              name: '根据项目id查询项目详情',
              type: 'http',
              method: 'get',
              path: '/bizJsXmGl/selectXmUser/{id}',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162963511',
            type: 'apiDetail',
            name: '创建账号',
            children: [],
            api: {
              id: 162963511,
              name: '创建账号',
              type: 'http',
              method: 'post',
              path: '/bizJsXmGl/addXmUser',
              folderId: 31965112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31965112,
          name: '建设项目工程管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31971689',
        type: 'apiDetailFolder',
        name: '周边城市卸船点管理',
        children: [
          {
            key: 'apiDetail.162993858',
            type: 'apiDetail',
            name: '分页查询卸船点信息',
            children: [],
            api: {
              id: 162993858,
              name: '分页查询卸船点信息',
              type: 'http',
              method: 'get',
              path: '/zbcsCxd/page',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162993859',
            type: 'apiDetail',
            name: '查看卸船点详情',
            children: [],
            api: {
              id: 162993859,
              name: '查看卸船点详情',
              type: 'http',
              method: 'get',
              path: '/zbcsCxd/detail/{id}',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162993860',
            type: 'apiDetail',
            name: '重置密码',
            children: [],
            api: {
              id: 162993860,
              name: '重置密码',
              type: 'http',
              method: 'post',
              path: '/zbcsCxd/resetPwd',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162993861',
            type: 'apiDetail',
            name: '新增卸船点信息',
            children: [],
            api: {
              id: 162993861,
              name: '新增卸船点信息',
              type: 'http',
              method: 'post',
              path: '/zbcsCxd/addXcdUser',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.162993862',
            type: 'apiDetail',
            name: '修改卸船点信息',
            children: [],
            api: {
              id: 162993862,
              name: '修改卸船点信息',
              type: 'http',
              method: 'post',
              path: '/zbcsCxd/updateXcdUser',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163496098',
            type: 'apiDetail',
            name: '删除卸船点用户',
            children: [],
            api: {
              id: 163496098,
              name: '删除卸船点用户',
              type: 'http',
              method: 'delete',
              path: '/zbcsCxd/deleteXcdUser',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164193062',
            type: 'apiDetail',
            name: '根据场所类型 和 场所ID获取电子围栏',
            children: [],
            api: {
              id: 164193062,
              name: '根据场所类型 和 场所ID获取电子围栏',
              type: 'http',
              method: 'get',
              path: '/zbcsCxd/getDzwlByCs',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164193063',
            type: 'apiDetail',
            name: '新增电子围栏信息',
            children: [],
            api: {
              id: 164193063,
              name: '新增电子围栏信息',
              type: 'http',
              method: 'post',
              path: '/zbcsCxd/insertDzwl',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164193064',
            type: 'apiDetail',
            name: '根据id编辑电子围栏信息',
            children: [],
            api: {
              id: 164193064,
              name: '根据id编辑电子围栏信息',
              type: 'http',
              method: 'post',
              path: '/zbcsCxd/updateDzwl',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166279601',
            type: 'apiDetail',
            name: '根据卸船点主键id，查询其对应的电子围栏数据',
            children: [],
            api: {
              id: 166279601,
              name: '根据卸船点主键id，查询其对应的电子围栏数据',
              type: 'http',
              method: 'get',
              path: '/zbcsCxd/getDzwlByXcdId',
              folderId: 31971689,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31971689,
          name: '周边城市卸船点管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31982700',
        type: 'apiDetailFolder',
        name: '工程企业管理',
        children: [
          {
            key: 'apiDetail.163048082',
            type: 'apiDetail',
            name: '企业用户分页查询',
            children: [],
            api: {
              id: 163048082,
              name: '企业用户分页查询',
              type: 'http',
              method: 'get',
              path: '/bizQyGl/qydw-user-page',
              folderId: 31982700,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163048083',
            type: 'apiDetail',
            name: '根据项目id查询项目详情',
            children: [],
            api: {
              id: 163048083,
              name: '根据项目id查询项目详情',
              type: 'http',
              method: 'get',
              path: '/bizQyGl/selectQyUser/{id}',
              folderId: 31982700,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166811010',
            type: 'apiDetail',
            name: '根据建设/施工 单位查询关联建设工程',
            children: [],
            api: {
              id: 166811010,
              name: '根据建设/施工 单位查询关联建设工程',
              type: 'http',
              method: 'get',
              path: '/bizQyGl/getLinkageGcByUnit',
              folderId: 31982700,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163048084',
            type: 'apiDetail',
            name: '工程查询详情',
            children: [],
            api: {
              id: 163048084,
              name: '工程查询详情',
              type: 'http',
              method: 'get',
              path: '/bizQyGl/linkage/detail/{id}',
              folderId: 31982700,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31982700,
          name: '工程企业管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32032011',
        type: 'apiDetailFolder',
        name: '安全生产隐患排查信息模板表(BizCsAqscyhpcModel)表控制层',
        children: [
          {
            key: 'apiDetail.163319262',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 163319262,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcModel/page',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163319263',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 163319263,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcModel/selectList',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163319264',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 163319264,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcModel/getById',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163319265',
            type: 'apiDetail',
            name: '新增安全生产隐患排查信息模板',
            children: [],
            api: {
              id: 163319265,
              name: '新增安全生产隐患排查信息模板',
              type: 'http',
              method: 'post',
              path: '/bizCsAqscyhpcModel/add',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163319266',
            type: 'apiDetail',
            name: '编辑安全生产隐患排查信息模板',
            children: [],
            api: {
              id: 163319266,
              name: '编辑安全生产隐患排查信息模板',
              type: 'http',
              method: 'put',
              path: '/bizCsAqscyhpcModel/edit',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163319267',
            type: 'apiDetail',
            name: '删除安全生产隐患排查信息模板',
            children: [],
            api: {
              id: 163319267,
              name: '删除安全生产隐患排查信息模板',
              type: 'http',
              method: 'delete',
              path: '/bizCsAqscyhpcModel/del/{id}',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163319268',
            type: 'apiDetail',
            name: '安全生产隐患排查信息模板详情',
            children: [],
            api: {
              id: 163319268,
              name: '安全生产隐患排查信息模板详情',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcModel/detail/{id}',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163319269',
            type: 'apiDetail',
            name: '根据条件获取安全生产隐患排查信息模板列表',
            children: [],
            api: {
              id: 163319269,
              name: '根据条件获取安全生产隐患排查信息模板列表',
              type: 'http',
              method: 'post',
              path: '/bizCsAqscyhpcModel/manage/page',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163319270',
            type: 'apiDetail',
            name: '根据条件导出安全生产隐患排查信息模板列表',
            children: [],
            api: {
              id: 163319270,
              name: '根据条件导出安全生产隐患排查信息模板列表',
              type: 'http',
              method: 'post',
              path: '/bizCsAqscyhpcModel/exportList',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163319271',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 163319271,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsAqscyhpcModel/delete',
              folderId: 32032011,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32032011,
          name: '安全生产隐患排查信息模板表(BizCsAqscyhpcModel)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32063711',
        type: 'apiDetailFolder',
        name: '安全生产隐患排查信息表(BizCsAqscyhpc)表控制层',
        children: [
          {
            key: 'apiDetail.163488677',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 163488677,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpc/page',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488678',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 163488678,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpc/selectList',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488679',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 163488679,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpc/getById',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488680',
            type: 'apiDetail',
            name: '新增安全生产隐患排查信息',
            children: [],
            api: {
              id: 163488680,
              name: '新增安全生产隐患排查信息',
              type: 'http',
              method: 'post',
              path: '/bizCsAqscyhpc/add',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488681',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 163488681,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsAqscyhpc/update',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488682',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 163488682,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsAqscyhpc/delete',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488683',
            type: 'apiDetail',
            name: '根据场所类别获取场所列表',
            children: [],
            api: {
              id: 163488683,
              name: '根据场所类别获取场所列表',
              type: 'http',
              method: 'post',
              path: '/bizCsAqscyhpc/csList/{type}',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488684',
            type: 'apiDetail',
            name: '安全生产隐患排查信息详情',
            children: [],
            api: {
              id: 163488684,
              name: '安全生产隐患排查信息详情',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpc/detail/{id}',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488685',
            type: 'apiDetail',
            name: '根据条件获取安全生产隐患排查信息列表',
            children: [],
            api: {
              id: 163488685,
              name: '根据条件获取安全生产隐患排查信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsAqscyhpc/manage/page',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488686',
            type: 'apiDetail',
            name: '根据条件导出安全生产隐患排查信息列表',
            children: [],
            api: {
              id: 163488686,
              name: '根据条件导出安全生产隐患排查信息列表',
              type: 'http',
              method: 'post',
              path: '/bizCsAqscyhpc/exportList',
              folderId: 32063711,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32063711,
          name: '安全生产隐患排查信息表(BizCsAqscyhpc)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32063720',
        type: 'apiDetailFolder',
        name: '安全生产隐患排查信息模板内容表(BizCsAqscyhpcMbnr)表控制层',
        children: [
          {
            key: 'apiDetail.163488725',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 163488725,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcMbnr/page',
              folderId: 32063720,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488726',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 163488726,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcMbnr/selectList',
              folderId: 32063720,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488727',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 163488727,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcMbnr/getById',
              folderId: 32063720,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488728',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 163488728,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsAqscyhpcMbnr/add',
              folderId: 32063720,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488729',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 163488729,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsAqscyhpcMbnr/update',
              folderId: 32063720,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488730',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 163488730,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsAqscyhpcMbnr/delete',
              folderId: 32063720,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163488731',
            type: 'apiDetail',
            name: '根据场所类别获取安全生产隐患排查信息模板内容列表',
            children: [],
            api: {
              id: 163488731,
              name: '根据场所类别获取安全生产隐患排查信息模板内容列表',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcMbnr/listByPcmbcs/{pcmbcs}',
              folderId: 32063720,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32063720,
          name: '安全生产隐患排查信息模板内容表(BizCsAqscyhpcMbnr)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32157005',
        type: 'apiDetailFolder',
        name: '场所再生建材上报表(BizSbCszsjc)表控制层',
        children: [
          {
            key: 'apiDetail.163964810',
            type: 'apiDetail',
            name: '按条件分页查询上报明细数据',
            children: [],
            api: {
              id: 163964810,
              name: '按条件分页查询上报明细数据',
              type: 'http',
              method: 'get',
              path: '/bizSbCszsjc/page',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964811',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 163964811,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSbCszsjc/getById',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964812',
            type: 'apiDetail',
            name: '按条件查询场所下拉框数据',
            children: [],
            api: {
              id: 163964812,
              name: '按条件查询场所下拉框数据',
              type: 'http',
              method: 'get',
              path: '/bizSbCszsjc/getPlaceList',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964813',
            type: 'apiDetail',
            name: '新增上报数据',
            children: [],
            api: {
              id: 163964813,
              name: '新增上报数据',
              type: 'http',
              method: 'post',
              path: '/bizSbCszsjc/addReport',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964814',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 163964814,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizSbCszsjc/update',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964815',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 163964815,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizSbCszsjc/delete',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964816',
            type: 'apiDetail',
            name: '条件分页：按月份，认领单位 分组汇总',
            children: [],
            api: {
              id: 163964816,
              name: '条件分页：按月份，认领单位 分组汇总',
              type: 'http',
              method: 'get',
              path: '/bizSbCszsjc/pageGroupByMonthAndUnit',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964817',
            type: 'apiDetail',
            name: '条件分页：查询 按月份，认领单位 分组汇总的明细数据',
            children: [],
            api: {
              id: 163964817,
              name: '条件分页：查询 按月份，认领单位 分组汇总的明细数据',
              type: 'http',
              method: 'get',
              path: '/bizSbCszsjc/detailPageByMonthAndUnit',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964818',
            type: 'apiDetail',
            name: '认领或者驳回操作',
            children: [],
            api: {
              id: 163964818,
              name: '认领或者驳回操作',
              type: 'http',
              method: 'post',
              path: '/bizSbCszsjc/claim',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964819',
            type: 'apiDetail',
            name: '条件分页：按区域 分组汇总',
            children: [],
            api: {
              id: 163964819,
              name: '条件分页：按区域 分组汇总',
              type: 'http',
              method: 'get',
              path: '/bizSbCszsjc/pageGroupByArea',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.163964820',
            type: 'apiDetail',
            name: '条件分页：查询 按区域 分组汇总的明细数据（same as pageGroupByMonthAndUnit）',
            children: [],
            api: {
              id: 163964820,
              name: '条件分页：查询 按区域 分组汇总的明细数据（same as pageGroupByMonthAndUnit）',
              type: 'http',
              method: 'get',
              path: '/bizSbCszsjc/detailPageByArea',
              folderId: 32157005,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32157005,
          name: '场所再生建材上报表(BizSbCszsjc)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32237438',
        type: 'apiDetailFolder',
        name: '周边城市区域禁行区域管理',
        children: [
          {
            key: 'apiDetail.164381516',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 164381516,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizPzJxqy/page',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164381517',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 164381517,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizPzJxqy/selectList',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164381518',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 164381518,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizPzJxqy/getById',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164381519',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 164381519,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizPzJxqy/add',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164381520',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 164381520,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizPzJxqy/update',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164381521',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 164381521,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizPzJxqy/delete',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164381522',
            type: 'apiDetail',
            name: '新增电子围栏信息',
            children: [],
            api: {
              id: 164381522,
              name: '新增电子围栏信息',
              type: 'http',
              method: 'post',
              path: '/bizPzJxqy/insertDzwl',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164381523',
            type: 'apiDetail',
            name: '根据id编辑电子围栏信息',
            children: [],
            api: {
              id: 164381523,
              name: '根据id编辑电子围栏信息',
              type: 'http',
              method: 'post',
              path: '/bizPzJxqy/updateDzwl',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164381524',
            type: 'apiDetail',
            name: '根据电子围栏id查询电子围栏信息',
            children: [],
            api: {
              id: 164381524,
              name: '根据电子围栏id查询电子围栏信息',
              type: 'http',
              method: 'get',
              path: '/bizPzJxqy/getDetail',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.164381525',
            type: 'apiDetail',
            name: '根据id删除电子围栏信息',
            children: [],
            api: {
              id: 164381525,
              name: '根据id删除电子围栏信息',
              type: 'http',
              method: 'patch',
              path: '/bizPzJxqy/delete',
              folderId: 32237438,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32237438,
          name: '周边城市区域禁行区域管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32379488',
        type: 'apiDetailFolder',
        name: '街道办',
        children: [
          {
            key: 'apiDetail.165076993',
            type: 'apiDetail',
            name: '街道办排放分页',
            children: [],
            api: {
              id: 165076993,
              name: '街道办排放分页',
              type: 'http',
              method: 'get',
              path: '/SysBizSbJdB01/page',
              folderId: 32379488,
              tags: [],
              status: 'developing',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165099682',
            type: 'apiDetail',
            name: '根据id获取',
            children: [],
            api: {
              id: 165099682,
              name: '根据id获取',
              type: 'http',
              method: 'get',
              path: '/SysBizSbJdB01/getById',
              folderId: 32379488,
              tags: [],
              status: 'developing',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165166198',
            type: 'apiDetail',
            name: '根据id删除',
            children: [],
            api: {
              id: 165166198,
              name: '根据id删除',
              type: 'http',
              method: 'delete',
              path: '/SysBizSbJdB01/delete',
              folderId: 32379488,
              tags: [],
              status: 'developing',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165166438',
            type: 'apiDetail',
            name: '增加',
            children: [],
            api: {
              id: 165166438,
              name: '增加',
              type: 'http',
              method: 'post',
              path: '/SysBizSbJdB01/add',
              folderId: 32379488,
              tags: [],
              status: 'developing',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32379488,
          name: '街道办',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32453898',
        type: 'apiDetailFolder',
        name: '工程违规信息上报',
        children: [
          {
            key: 'apiDetail.165511744',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 165511744,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizJdbGcwgxx/page',
              folderId: 32453898,
              tags: [],
              status: 'developing',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165538206',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 165538206,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizJdbGcwgxx/add',
              folderId: 32453898,
              tags: [],
              status: 'developing',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165547591',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 165547591,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizJdbGcwgxx/getById',
              folderId: 32453898,
              tags: [],
              status: 'developing',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165577525',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 165577525,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizJdbGcwgxx/update',
              folderId: 32453898,
              tags: [],
              status: 'developing',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165578108',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 165578108,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizJdbGcwgxx/delete',
              folderId: 32453898,
              tags: [],
              status: 'developing',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32453898,
          name: '工程违规信息上报',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32492933',
        type: 'apiDetailFolder',
        name: '街道办信息管理',
        children: [
          {
            key: 'apiDetail.165686335',
            type: 'apiDetail',
            name: '获取当前用户街道办信息',
            children: [],
            api: {
              id: 165686335,
              name: '获取当前用户街道办信息',
              type: 'http',
              method: 'get',
              path: '/jdbXxGl/detail',
              folderId: 32492933,
              tags: [],
              status: 'released',
              responsibleId: 1729982,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165686336',
            type: 'apiDetail',
            name: '修改街道办信息',
            children: [],
            api: {
              id: 165686336,
              name: '修改街道办信息',
              type: 'http',
              method: 'put',
              path: '/jdbXxGl/update',
              folderId: 32492933,
              tags: [],
              status: 'released',
              responsibleId: 1729982,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32492933,
          name: '街道办信息管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32609883',
        type: 'apiDetailFolder',
        name: '街道办上报排放消纳信息表(BizSbJdbpfxn)表控制层',
        children: [
          {
            key: 'apiDetail.166298207',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 166298207,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizSbJdbpfxn/page',
              folderId: 32609883,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166298208',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 166298208,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizSbJdbpfxn/selectList',
              folderId: 32609883,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166298209',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 166298209,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSbJdbpfxn/getById',
              folderId: 32609883,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166298210',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 166298210,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizSbJdbpfxn/add',
              folderId: 32609883,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166298211',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 166298211,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizSbJdbpfxn/update',
              folderId: 32609883,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166298212',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 166298212,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizSbJdbpfxn/delete',
              folderId: 32609883,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168640589',
            type: 'apiDetail',
            name: '根据消纳场所的名称返回监管单位信息',
            children: [],
            api: {
              id: 168640589,
              name: '根据消纳场所的名称返回监管单位信息',
              type: 'http',
              method: 'get',
              path: '/bizSbJdbpfxn/getJgdwByXnpf',
              folderId: 32609883,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32609883,
          name: '街道办上报排放消纳信息表(BizSbJdbpfxn)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32610559',
        type: 'apiDetailFolder',
        name: '工程违规信息上报表(BizJdbGcwgxx)表控制层',
        children: [
          {
            key: 'apiDetail.166301417',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 166301417,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizJdbGcwgxx/selectList',
              folderId: 32610559,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166301418',
            type: 'apiDetail',
            name: '处置',
            children: [],
            api: {
              id: 166301418,
              name: '处置',
              type: 'http',
              method: 'put',
              path: '/bizJdbGcwgxx/dispose',
              folderId: 32610559,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32610559,
          name: '工程违规信息上报表(BizJdbGcwgxx)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32720069',
        type: 'apiDetailFolder',
        name: '场所数据变更记录管理',
        children: [
          {
            key: 'apiDetail.166901658',
            type: 'apiDetail',
            name: '根据消纳场Id查询消纳场状态变更历史记录',
            children: [],
            api: {
              id: 166901658,
              name: '根据消纳场Id查询消纳场状态变更历史记录',
              type: 'http',
              method: 'get',
              path: '/bizCsSjbgjl/listXncStatusChangeRecordById/{id}',
              folderId: 32720069,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.166901659',
            type: 'apiDetail',
            name: '根据工程Id分页查询工程排放状态变更记录',
            children: [],
            api: {
              id: 166901659,
              name: '根据工程Id分页查询工程排放状态变更记录',
              type: 'http',
              method: 'get',
              path: '/bizCsSjbgjl/listGcPfStatusChangeRecordById/{gcId}',
              folderId: 32720069,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32720069,
          name: '场所数据变更记录管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32798820',
        type: 'apiDetailFolder',
        name: '工程排放状态管理',
        children: [
          {
            key: 'apiDetail.167288072',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 167288072,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/gcPfztGl/page',
              folderId: 32798820,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167288073',
            type: 'apiDetail',
            name: '根据ID获取当前工程排放状态',
            children: [],
            api: {
              id: 167288073,
              name: '根据ID获取当前工程排放状态',
              type: 'http',
              method: 'get',
              path: '/gcPfztGl/detail/{id}',
              folderId: 32798820,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167288074',
            type: 'apiDetail',
            name: '新增工程排放状态变更记录',
            children: [],
            api: {
              id: 167288074,
              name: '新增工程排放状态变更记录',
              type: 'http',
              method: 'post',
              path: '/gcPfztGl/addStatusChangeRecord',
              folderId: 32798820,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32798820,
          name: '工程排放状态管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32821204',
        type: 'apiDetailFolder',
        name: '消纳场所消纳状态管理',
        children: [
          {
            key: 'apiDetail.167398843',
            type: 'apiDetail',
            name: '根据条件分页查询消纳场状态信息',
            children: [],
            api: {
              id: 167398843,
              name: '根据条件分页查询消纳场状态信息',
              type: 'http',
              method: 'get',
              path: '/xncsztgl/listBySearch',
              folderId: 32821204,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167398844',
            type: 'apiDetail',
            name: '根据消纳场所Id获取当前消纳状态',
            children: [],
            api: {
              id: 167398844,
              name: '根据消纳场所Id获取当前消纳状态',
              type: 'http',
              method: 'get',
              path: '/xncsztgl/getById/{id}',
              folderId: 32821204,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167398845',
            type: 'apiDetail',
            name: '新增消纳场状态变更记录',
            children: [],
            api: {
              id: 167398845,
              name: '新增消纳场状态变更记录',
              type: 'http',
              method: 'post',
              path: '/xncsztgl/addXncsStatusChangeRecord',
              folderId: 32821204,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32821204,
          name: '消纳场所消纳状态管理',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32857112',
        type: 'apiDetailFolder',
        name: '协同处置文书管理(BizSpWsgl)表控制层',
        children: [
          {
            key: 'apiDetail.167586271',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 167586271,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizSpWsgl/page',
              folderId: 32857112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586272',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 167586272,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizSpWsgl/selectList',
              folderId: 32857112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586273',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 167586273,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSpWsgl/getById',
              folderId: 32857112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586274',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 167586274,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizSpWsgl/add',
              folderId: 32857112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586275',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 167586275,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizSpWsgl/update',
              folderId: 32857112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586276',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 167586276,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizSpWsgl/delete',
              folderId: 32857112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586277',
            type: 'apiDetail',
            name: '修改状态',
            children: [],
            api: {
              id: 167586277,
              name: '修改状态',
              type: 'http',
              method: 'put',
              path: '/bizSpWsgl/update/wsStatus',
              folderId: 32857112,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32857112,
          name: '协同处置文书管理(BizSpWsgl)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32857116',
        type: 'apiDetailFolder',
        name: '任务协同处理(BizSpRwXtcl)表控制层',
        children: [
          {
            key: 'apiDetail.167586285',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 167586285,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizSpRwXtcl/page',
              folderId: 32857116,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586286',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 167586286,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizSpRwXtcl/selectList',
              folderId: 32857116,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586287',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 167586287,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSpRwXtcl/getById',
              folderId: 32857116,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586288',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 167586288,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizSpRwXtcl/add',
              folderId: 32857116,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586289',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 167586289,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizSpRwXtcl/update',
              folderId: 32857116,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586290',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 167586290,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizSpRwXtcl/delete',
              folderId: 32857116,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167586291',
            type: 'apiDetail',
            name: '修改状态',
            children: [],
            api: {
              id: 167586291,
              name: '修改状态',
              type: 'http',
              method: 'put',
              path: '/bizSpRwXtcl/update/wsStatus',
              folderId: 32857116,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32857116,
          name: '任务协同处理(BizSpRwXtcl)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32870533',
        type: 'apiDetailFolder',
        name: '排放计划表(BizSpPfjh)表控制层',
        children: [
          {
            key: 'apiDetail.167656307',
            type: 'apiDetail',
            name: '按条件分页查询所有概览',
            children: [],
            api: {
              id: 167656307,
              name: '按条件分页查询所有概览',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/page',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656308',
            type: 'apiDetail',
            name: '按条件查询概览list',
            children: [],
            api: {
              id: 167656308,
              name: '按条件查询概览list',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/selectList',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656309',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 167656309,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/getById',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656310',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 167656310,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizSpPfjh/add',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656311',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 167656311,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizSpPfjh/update',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656312',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 167656312,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizSpPfjh/delete',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656313',
            type: 'apiDetail',
            name: '根据区域和类型获取消纳场所名称的列表',
            children: [],
            api: {
              id: 167656313,
              name: '根据区域和类型获取消纳场所名称的列表',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/getXncs',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656314',
            type: 'apiDetail',
            name: '根据企业id获取企业下的车辆信息',
            children: [],
            api: {
              id: 167656314,
              name: '根据企业id获取企业下的车辆信息',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/getYsclByYsqyId',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656315',
            type: 'apiDetail',
            name: '根据企业id获取企业下的船舶信息',
            children: [],
            api: {
              id: 167656315,
              name: '根据企业id获取企业下的船舶信息',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/getYscbByYsqyId',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656316',
            type: 'apiDetail',
            name: '返回所有车辆运输公司的id与名称',
            children: [],
            api: {
              id: 167656316,
              name: '返回所有车辆运输公司的id与名称',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/getClYsgsList',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167656317',
            type: 'apiDetail',
            name: '返回所有船舶运输公司的id与名称',
            children: [],
            api: {
              id: 167656317,
              name: '返回所有船舶运输公司的id与名称',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/getCbYsgsList',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168565810',
            type: 'apiDetail',
            name: '获取当前操作用户最新数据的排放计划表',
            children: [],
            api: {
              id: 168565810,
              name: '获取当前操作用户最新数据的排放计划表',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/getPfjhTg',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168994425',
            type: 'apiDetail',
            name: '保存变更',
            children: [],
            api: {
              id: 168994425,
              name: '保存变更',
              type: 'http',
              method: 'put',
              path: '/bizSpPfjh/saveChange',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168994426',
            type: 'apiDetail',
            name: '获取变更前与变更后的数据',
            children: [],
            api: {
              id: 168994426,
              name: '获取变更前与变更后的数据',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/getNewAndHistory',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168994427',
            type: 'apiDetail',
            name: '在概览列表获取对应的详情信息',
            children: [],
            api: {
              id: 168994427,
              name: '在概览列表获取对应的详情信息',
              type: 'http',
              method: 'get',
              path: '/bizSpPfjh/getByGlPfjgId',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169078080',
            type: 'apiDetail',
            name: '删除概览列表',
            children: [],
            api: {
              id: 169078080,
              name: '删除概览列表',
              type: 'http',
              method: 'delete',
              path: '/bizSpPfjh/deleteGl',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169132325',
            type: 'apiDetail',
            name: '撤回提交',
            children: [],
            api: {
              id: 169132325,
              name: '撤回提交',
              type: 'http',
              method: 'put',
              path: '/bizSpPfjh/recall',
              folderId: 32870533,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32870533,
          name: '排放计划表(BizSpPfjh)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32890661',
        type: 'apiDetailFolder',
        name: '内部信息交流-信息审核(BizNbxxjlXxsh)表控制层',
        children: [
          {
            key: 'apiDetail.167758522',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 167758522,
              name: '分页查询',
              type: 'http',
              method: 'post',
              path: '/bizNbxxjlXxsh/getList',
              folderId: 32890661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167758523',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 167758523,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizNbxxjlXxsh/detail',
              folderId: 32890661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167758524',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 167758524,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizNbxxjlXxsh/save',
              folderId: 32890661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167758525',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 167758525,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/bizNbxxjlXxsh/update',
              folderId: 32890661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167758526',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 167758526,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/bizNbxxjlXxsh/delete',
              folderId: 32890661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168320163',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 168320163,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/bizNbxxjlXxsh/list',
              folderId: 32890661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32890661,
          name: '内部信息交流-信息审核(BizNbxxjlXxsh)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32893312',
        type: 'apiDetailFolder',
        name: '电子印章(BizCsDzyz)表控制层',
        children: [
          {
            key: 'apiDetail.167782475',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 167782475,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsDzyz/page',
              folderId: 32893312,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167782477',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 167782477,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsDzyz/getById',
              folderId: 32893312,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167782478',
            type: 'apiDetail',
            name: '修改印章状态',
            children: [],
            api: {
              id: 167782478,
              name: '修改印章状态',
              type: 'http',
              method: 'put',
              path: '/bizCsDzyz/update',
              folderId: 32893312,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32893312,
          name: '电子印章(BizCsDzyz)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32917802',
        type: 'apiDetailFolder',
        name: '排放接收地车辆处罚表(BizCsPfjsdclcf)表控制层',
        children: [
          {
            key: 'apiDetail.167922817',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 167922817,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsPfjsdclcf/page',
              folderId: 32917802,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167922818',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 167922818,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsPfjsdclcf/selectList',
              folderId: 32917802,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167922819',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 167922819,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsPfjsdclcf/getById',
              folderId: 32917802,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167922820',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 167922820,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsPfjsdclcf/add',
              folderId: 32917802,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167922821',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 167922821,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsPfjsdclcf/update',
              folderId: 32917802,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167922822',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 167922822,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsPfjsdclcf/delete',
              folderId: 32917802,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32917802,
          name: '排放接收地车辆处罚表(BizCsPfjsdclcf)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32941076',
        type: 'apiDetailFolder',
        name: '备案申请',
        children: [
          {
            key: 'apiDetail.167818615',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 167818615,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsXncsBa/page',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167818616',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 167818616,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsXncsBa/selectList',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167818617',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 167818617,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsXncsBa/getById',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167818618',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 167818618,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsXncsBa/add',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167818619',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 167818619,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsXncsBa/update',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167818620',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 167818620,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsXncsBa/delete',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168404949',
            type: 'apiDetail',
            name: '根据城市编码获取船舶运输企业列表',
            children: [],
            api: {
              id: 168404949,
              name: '根据城市编码获取船舶运输企业列表',
              type: 'http',
              method: 'get',
              path: '/bizCsXncsBa/getXcdByCs',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168404950',
            type: 'apiDetail',
            name: '根据运输企业id获取船舶名称列表',
            children: [],
            api: {
              id: 168404950,
              name: '根据运输企业id获取船舶名称列表',
              type: 'http',
              method: 'get',
              path: '/bizCsXncsBa/getCbByYsqyId',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168404951',
            type: 'apiDetail',
            name: '水运设施备案新增',
            children: [],
            api: {
              id: 168404951,
              name: '水运设施备案新增',
              type: 'http',
              method: 'post',
              path: '/bizCsXncsBa/addSyba',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168404952',
            type: 'apiDetail',
            name: '水运设施备案分页查询',
            children: [],
            api: {
              id: 168404952,
              name: '水运设施备案分页查询',
              type: 'http',
              method: 'get',
              path: '/bizCsXncsBa/sybaPage',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168404953',
            type: 'apiDetail',
            name: '水运设施备案通过主键查找单条数据',
            children: [],
            api: {
              id: 168404953,
              name: '水运设施备案通过主键查找单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsXncsBa/getSybaById',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168404954',
            type: 'apiDetail',
            name: '水运设施备案更新',
            children: [],
            api: {
              id: 168404954,
              name: '水运设施备案更新',
              type: 'http',
              method: 'put',
              path: '/bizCsXncsBa/updateSyba',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168404955',
            type: 'apiDetail',
            name: '水运设施备案批量删除',
            children: [],
            api: {
              id: 168404955,
              name: '水运设施备案批量删除',
              type: 'http',
              method: 'delete',
              path: '/bizCsXncsBa/deleteSyba',
              folderId: 32941076,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32941076,
          name: '备案申请',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32946725',
        type: 'apiDetailFolder',
        name: '排放地禁行时段车辆行驶查处表(BizCsPfdjhsdClxscc)表控制层',
        children: [
          {
            key: 'apiDetail.168063609',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 168063609,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsPfdjhsdClxscc/page',
              folderId: 32946725,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168063610',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 168063610,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsPfdjhsdClxscc/selectList',
              folderId: 32946725,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168063611',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 168063611,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsPfdjhsdClxscc/getById',
              folderId: 32946725,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168063612',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 168063612,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsPfdjhsdClxscc/add',
              folderId: 32946725,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168063613',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 168063613,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsPfdjhsdClxscc/update',
              folderId: 32946725,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168063614',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 168063614,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsPfdjhsdClxscc/delete',
              folderId: 32946725,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32946725,
          name: '排放地禁行时段车辆行驶查处表(BizCsPfdjhsdClxscc)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32985847',
        type: 'apiDetailFolder',
        name: '敏感词管理(BizSensitiveWords)表控制层',
        children: [
          {
            key: 'apiDetail.168261933',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 168261933,
              name: '分页查询',
              type: 'http',
              method: 'post',
              path: '/bizSensitiveWords/getList',
              folderId: 32985847,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168261935',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 168261935,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSensitiveWords/detail',
              folderId: 32985847,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168261936',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 168261936,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizSensitiveWords/save',
              folderId: 32985847,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168261937',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 168261937,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/bizSensitiveWords/update',
              folderId: 32985847,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168261938',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 168261938,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/bizSensitiveWords/delete',
              folderId: 32985847,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32985847,
          name: '敏感词管理(BizSensitiveWords)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.33044803',
        type: 'apiDetailFolder',
        name: '运输企业(BizYsYsqy)表控制层',
        children: [
          {
            key: 'apiDetail.168573585',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 168573585,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizYsYsqy/page',
              folderId: 33044803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168573586',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 168573586,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizYsYsqy/selectList',
              folderId: 33044803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168573587',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 168573587,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizYsYsqy/getById',
              folderId: 33044803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168573588',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 168573588,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizYsYsqy/add',
              folderId: 33044803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168573589',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 168573589,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizYsYsqy/update',
              folderId: 33044803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168573590',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 168573590,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizYsYsqy/delete',
              folderId: 33044803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 33044803,
          name: '运输企业(BizYsYsqy)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.33048109',
        type: 'apiDetailFolder',
        name: '公众咨询意见表(BizCsGzzxyj)表控制层',
        children: [
          {
            key: 'apiDetail.168591492',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 168591492,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsGzzxyj/page',
              folderId: 33048109,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168591493',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 168591493,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsGzzxyj/getById',
              folderId: 33048109,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168591494',
            type: 'apiDetail',
            name: '回复公众意见(id,isReply必传)',
            children: [],
            api: {
              id: 168591494,
              name: '回复公众意见(id,isReply必传)',
              type: 'http',
              method: 'put',
              path: '/bizCsGzzxyj/update',
              folderId: 33048109,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168612741',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 168612741,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsGzzxyj/delete',
              folderId: 33048109,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 33048109,
          name: '公众咨询意见表(BizCsGzzxyj)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.33058661',
        type: 'apiDetailFolder',
        name: '车辆信息表(BizYsCl)表控制层',
        children: [
          {
            key: 'apiDetail.168648687',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 168648687,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizYsCl/page',
              folderId: 33058661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168648688',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 168648688,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizYsCl/selectList',
              folderId: 33058661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168648689',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 168648689,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizYsCl/getById',
              folderId: 33058661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168648690',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 168648690,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizYsCl/add',
              folderId: 33058661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168648691',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 168648691,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizYsCl/update',
              folderId: 33058661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168648692',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 168648692,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizYsCl/delete',
              folderId: 33058661,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 33058661,
          name: '车辆信息表(BizYsCl)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.33061192',
        type: 'apiDetailFolder',
        name: '场所 通用接口Controller',
        children: [
          {
            key: 'apiDetail.168662401',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 168662401,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/commonPlace/list',
              folderId: 33061192,
              tags: [],
              status: 'released',
              responsibleId: 1729982,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 33061192,
          name: '场所 通用接口Controller',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.33082255',
        type: 'apiDetailFolder',
        name: '四方登记-系统核对流程(BizSfdjXthdlc)表控制层',
        children: [
          {
            key: 'apiDetail.168780343',
            type: 'apiDetail',
            name: '获取系统审查流程列表',
            children: [],
            api: {
              id: 168780343,
              name: '获取系统审查流程列表',
              type: 'http',
              method: 'post',
              path: '/busiAuditFlowInfo/getBusiAuditFlowList',
              folderId: 33082255,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168780344',
            type: 'apiDetail',
            name: '获取系统审查流程详情',
            children: [],
            api: {
              id: 168780344,
              name: '获取系统审查流程详情',
              type: 'http',
              method: 'post',
              path: '/busiAuditFlowInfo/getBusiAuditFlowDetail',
              folderId: 33082255,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168780345',
            type: 'apiDetail',
            name: '添加系统审查流程',
            children: [],
            api: {
              id: 168780345,
              name: '添加系统审查流程',
              type: 'http',
              method: 'post',
              path: '/busiAuditFlowInfo/addBusiAuditFlow',
              folderId: 33082255,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168780346',
            type: 'apiDetail',
            name: '修改系统审查流程',
            children: [],
            api: {
              id: 168780346,
              name: '修改系统审查流程',
              type: 'http',
              method: 'post',
              path: '/busiAuditFlowInfo/modifyBusiAuditFlow',
              folderId: 33082255,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168780347',
            type: 'apiDetail',
            name: '启/禁用系统审查流程',
            children: [],
            api: {
              id: 168780347,
              name: '启/禁用系统审查流程',
              type: 'http',
              method: 'post',
              path: '/busiAuditFlowInfo/ableBusiAuditFlow',
              folderId: 33082255,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168780348',
            type: 'apiDetail',
            name: '根据区域编码修改对应区域系统流程的部门流程',
            children: [],
            api: {
              id: 168780348,
              name: '根据区域编码修改对应区域系统流程的部门流程',
              type: 'http',
              method: 'post',
              path: '/busiAuditFlowInfo/updateDeptAuditFlow',
              folderId: 33082255,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 33082255,
          name: '四方登记-系统核对流程(BizSfdjXthdlc)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.33082322',
        type: 'apiDetailFolder',
        name: '四方登记-部门内审查流程(BizSfdjBmnsclc)表控制层',
        children: [
          {
            key: 'apiDetail.168780783',
            type: 'apiDetail',
            name: '获取部门内审查流程列表',
            children: [],
            api: {
              id: 168780783,
              name: '获取部门内审查流程列表',
              type: 'http',
              method: 'post',
              path: '/bizSfdjBmnsclc/getBusiDeptAuditFlowList',
              folderId: 33082322,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168780784',
            type: 'apiDetail',
            name: '获取部门内审查流程详情',
            children: [],
            api: {
              id: 168780784,
              name: '获取部门内审查流程详情',
              type: 'http',
              method: 'get',
              path: '/bizSfdjBmnsclc/getBusiDeptAuditFlowDetail/{id}',
              folderId: 33082322,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168780785',
            type: 'apiDetail',
            name: '修改部门内审查流程',
            children: [],
            api: {
              id: 168780785,
              name: '修改部门内审查流程',
              type: 'http',
              method: 'post',
              path: '/bizSfdjBmnsclc/modifyBusiDeptAuditFlow',
              folderId: 33082322,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168780786',
            type: 'apiDetail',
            name: '判断是否有在途的审核流程',
            children: [],
            api: {
              id: 168780786,
              name: '判断是否有在途的审核流程',
              type: 'http',
              method: 'post',
              path: '/bizSfdjBmnsclc/inReviewBusiDeptAuditFlow',
              folderId: 33082322,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168780787',
            type: 'apiDetail',
            name: '通过部门流程ID获取部门员工',
            children: [],
            api: {
              id: 168780787,
              name: '通过部门流程ID获取部门员工',
              type: 'http',
              method: 'post',
              path: '/bizSfdjBmnsclc/getBusiDeptUsers',
              folderId: 33082322,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 33082322,
          name: '四方登记-部门内审查流程(BizSfdjBmnsclc)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.33157971',
        type: 'apiDetailFolder',
        name: '安全生产隐患排查内容信息表(BizCsAqscyhpcContent)表控制层',
        children: [
          {
            key: 'apiDetail.169187798',
            type: 'apiDetail',
            name: '按条件分页查询所有数据',
            children: [],
            api: {
              id: 169187798,
              name: '按条件分页查询所有数据',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcContent/page',
              folderId: 33157971,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169187799',
            type: 'apiDetail',
            name: '按条件查询数据list',
            children: [],
            api: {
              id: 169187799,
              name: '按条件查询数据list',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcContent/selectList',
              folderId: 33157971,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169187800',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 169187800,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcContent/getById',
              folderId: 33157971,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169187801',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 169187801,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizCsAqscyhpcContent/add',
              folderId: 33157971,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169187802',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 169187802,
              name: '修改数据',
              type: 'http',
              method: 'put',
              path: '/bizCsAqscyhpcContent/update',
              folderId: 33157971,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169187803',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 169187803,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsAqscyhpcContent/delete',
              folderId: 33157971,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169187804',
            type: 'apiDetail',
            name: 'aaa',
            children: [],
            api: {
              id: 169187804,
              name: 'aaa',
              type: 'http',
              method: 'get',
              path: '/bizCsAqscyhpcContent/aaa',
              folderId: 33157971,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 33157971,
          name: '安全生产隐患排查内容信息表(BizCsAqscyhpcContent)表控制层',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.33158854',
        type: 'apiDetailFolder',
        name: '排放工程违法行为处罚接入展示',
        children: [
          {
            key: 'apiDetail.169192013',
            type: 'apiDetail',
            name: '按条件分页查询工程、消纳场所违法信息List',
            children: [],
            api: {
              id: 169192013,
              name: '按条件分页查询工程、消纳场所违法信息List',
              type: 'http',
              method: 'get',
              path: '/bizCsGcxncscf/page',
              folderId: 33158854,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169192014',
            type: 'apiDetail',
            name: '根据建设工程名称模糊查询 建设工程信息',
            children: [],
            api: {
              id: 169192014,
              name: '根据建设工程名称模糊查询 建设工程信息',
              type: 'http',
              method: 'get',
              path: '/bizCsGcxncscf/detailGc',
              folderId: 33158854,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169192015',
            type: 'apiDetail',
            name: '新增排放工程违法数据',
            children: [],
            api: {
              id: 169192015,
              name: '新增排放工程违法数据',
              type: 'http',
              method: 'post',
              path: '/bizCsGcxncscf/add',
              folderId: 33158854,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169192016',
            type: 'apiDetail',
            name: '通过主键查询单条工程排放违法数据',
            children: [],
            api: {
              id: 169192016,
              name: '通过主键查询单条工程排放违法数据',
              type: 'http',
              method: 'get',
              path: '/bizCsGcxncscf/getById',
              folderId: 33158854,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169192017',
            type: 'apiDetail',
            name: '编辑信息（查处状态变更）',
            children: [],
            api: {
              id: 169192017,
              name: '编辑信息（查处状态变更）',
              type: 'http',
              method: 'put',
              path: '/bizCsGcxncscf/update',
              folderId: 33158854,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.169192018',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 169192018,
              name: '删除数据',
              type: 'http',
              method: 'delete',
              path: '/bizCsGcxncscf/delete',
              folderId: 33158854,
              tags: [],
              status: 'released',
              responsibleId: 2241303,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 33158854,
          name: '排放工程违法行为处罚接入展示',
          docId: 0,
          parentId: 30348602,
          projectBranchId: 0,
          type: 'http'
        }
      }
    ],
    folder: {
      id: 30348602,
      name: 'city-platform',
      docId: 0,
      parentId: 30347963,
      projectBranchId: 0,
      type: 'http'
    }
  },
  {
    key: 'apiDetailFolder.30348616',
    type: 'apiDetailFolder',
    name: 'system',
    children: [
      {
        key: 'apiDetailFolder.31489956',
        type: 'apiDetailFolder',
        name: '文件请求处理',
        children: [
          {
            key: 'apiDetail.160558461',
            type: 'apiDetail',
            name: '文件上传请求',
            children: [],
            api: {
              id: 160558461,
              name: '文件上传请求',
              type: 'http',
              method: 'post',
              path: '/fileService/upload',
              folderId: 31489956,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558462',
            type: 'apiDetail',
            name: '文件上传请求',
            children: [],
            api: {
              id: 160558462,
              name: '文件上传请求',
              type: 'http',
              method: 'post',
              path: '/fileService/uploadForMore',
              folderId: 31489956,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558463',
            type: 'apiDetail',
            name: '文件下载请求',
            children: [
              {
                key: 'apiCase.151972358',
                type: 'apiCase',
                name: '成功',
                children: [],
                case: {
                  id: 151972358,
                  name: '成功',
                  apiId: 160558463,
                  type: 'http'
                }
              }
            ],
            api: {
              id: 160558463,
              name: '文件下载请求',
              type: 'http',
              method: 'post',
              path: '/fileService/download',
              folderId: 31489956,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558464',
            type: 'apiDetail',
            name: '查询附件信息',
            children: [],
            api: {
              id: 160558464,
              name: '查询附件信息',
              type: 'http',
              method: 'post',
              path: '/fileService/selectFile',
              folderId: 31489956,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558465',
            type: 'apiDetail',
            name: '获取url链接',
            children: [],
            api: {
              id: 160558465,
              name: '获取url链接',
              type: 'http',
              method: 'get',
              path: '/fileService/getUrl',
              folderId: 31489956,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.168371600',
            type: 'apiDetail',
            name: '根据文件id获取文件详情信息',
            children: [],
            api: {
              id: 168371600,
              name: '根据文件id获取文件详情信息',
              type: 'http',
              method: 'get',
              path: '/fileService/getDetail',
              folderId: 31489956,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31489956,
          name: '文件请求处理',
          docId: 0,
          parentId: 30348616,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31489955',
        type: 'apiDetailFolder',
        name: '调度任务信息操作处理',
        children: [
          {
            key: 'apiDetail.160558453',
            type: 'apiDetail',
            name: '查询定时任务列表',
            children: [],
            api: {
              id: 160558453,
              name: '查询定时任务列表',
              type: 'http',
              method: 'get',
              path: '/job/list',
              folderId: 31489955,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558454',
            type: 'apiDetail',
            name: '导出定时任务列表',
            children: [],
            api: {
              id: 160558454,
              name: '导出定时任务列表',
              type: 'http',
              method: 'post',
              path: '/job/export',
              folderId: 31489955,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558455',
            type: 'apiDetail',
            name: '获取定时任务详细信息',
            children: [],
            api: {
              id: 160558455,
              name: '获取定时任务详细信息',
              type: 'http',
              method: 'get',
              path: '/job/{jobId}',
              folderId: 31489955,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558456',
            type: 'apiDetail',
            name: '新增定时任务',
            children: [],
            api: {
              id: 160558456,
              name: '新增定时任务',
              type: 'http',
              method: 'post',
              path: '/job',
              folderId: 31489955,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558457',
            type: 'apiDetail',
            name: '修改定时任务',
            children: [],
            api: {
              id: 160558457,
              name: '修改定时任务',
              type: 'http',
              method: 'put',
              path: '/job',
              folderId: 31489955,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558458',
            type: 'apiDetail',
            name: '定时任务状态修改',
            children: [],
            api: {
              id: 160558458,
              name: '定时任务状态修改',
              type: 'http',
              method: 'put',
              path: '/job/changeStatus',
              folderId: 31489955,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558459',
            type: 'apiDetail',
            name: '定时任务立即执行一次',
            children: [],
            api: {
              id: 160558459,
              name: '定时任务立即执行一次',
              type: 'http',
              method: 'put',
              path: '/job/run',
              folderId: 31489955,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558460',
            type: 'apiDetail',
            name: '删除定时任务',
            children: [],
            api: {
              id: 160558460,
              name: '删除定时任务',
              type: 'http',
              method: 'delete',
              path: '/job/{jobIds}',
              folderId: 31489955,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31489955,
          name: '调度任务信息操作处理',
          docId: 0,
          parentId: 30348616,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.31489957',
        type: 'apiDetailFolder',
        name: '调度日志操作处理',
        children: [
          {
            key: 'apiDetail.160558466',
            type: 'apiDetail',
            name: '查询定时任务调度日志列表',
            children: [],
            api: {
              id: 160558466,
              name: '查询定时任务调度日志列表',
              type: 'http',
              method: 'get',
              path: '/job/log/list',
              folderId: 31489957,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558467',
            type: 'apiDetail',
            name: '导出定时任务调度日志列表',
            children: [],
            api: {
              id: 160558467,
              name: '导出定时任务调度日志列表',
              type: 'http',
              method: 'post',
              path: '/job/log/export',
              folderId: 31489957,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558468',
            type: 'apiDetail',
            name: '根据调度编号获取详细信息',
            children: [],
            api: {
              id: 160558468,
              name: '根据调度编号获取详细信息',
              type: 'http',
              method: 'get',
              path: '/job/log/{configId}',
              folderId: 31489957,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558469',
            type: 'apiDetail',
            name: '删除定时任务调度日志',
            children: [],
            api: {
              id: 160558469,
              name: '删除定时任务调度日志',
              type: 'http',
              method: 'delete',
              path: '/job/log/{jobLogIds}',
              folderId: 31489957,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.160558470',
            type: 'apiDetail',
            name: '清空定时任务调度日志',
            children: [],
            api: {
              id: 160558470,
              name: '清空定时任务调度日志',
              type: 'http',
              method: 'delete',
              path: '/job/log/clean',
              folderId: 31489957,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 31489957,
          name: '调度日志操作处理',
          docId: 0,
          parentId: 30348616,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.30348780',
        type: 'apiDetailFolder',
        name: 'ThirdApiController',
        children: [
          {
            key: 'apiDetail.154551543',
            type: 'apiDetail',
            name: 'iipToken',
            children: [],
            api: {
              id: 154551543,
              name: 'iipToken',
              type: 'http',
              method: 'get',
              path: '/third-api/iip/getToken',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551544',
            type: 'apiDetail',
            name: 'iipGeneralApi',
            children: [],
            api: {
              id: 154551544,
              name: 'iipGeneralApi',
              type: 'http',
              method: 'post',
              path: '/third-api/iip/generalApi',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551545',
            type: 'apiDetail',
            name: '我们系统访问统一用户中心的 authorize 的接口， 待选择各种核验方式进行身份核验，登录成功后， 用户中心认证平台发起重定向 302',
            children: [],
            api: {
              id: 154551545,
              name: '我们系统访问统一用户中心的 authorize 的接口， 待选择各种核验方式进行身份核验，登录成功后， 用户中心认证平台发起重定向 302',
              type: 'http',
              method: 'get',
              path: '/third-api/zjUuc/authorize',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551546',
            type: 'apiDetail',
            name: 'zjUucGetToken',
            children: [],
            api: {
              id: 154551546,
              name: 'zjUucGetToken',
              type: 'http',
              method: 'get',
              path: '/third-api/zjUuc/getToken',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551547',
            type: 'apiDetail',
            name: 'zjUucGetUserInfo',
            children: [],
            api: {
              id: 154551547,
              name: 'zjUucGetUserInfo',
              type: 'http',
              method: 'get',
              path: '/third-api/zjUuc/getUserInfo',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551548',
            type: 'apiDetail',
            name: 'zjUucUserHtmlResources',
            children: [],
            api: {
              id: 154551548,
              name: 'zjUucUserHtmlResources',
              type: 'http',
              method: 'get',
              path: '/third-api/zjUuc/userHtmlResources',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551549',
            type: 'apiDetail',
            name: 'zjUucUserPermissions',
            children: [],
            api: {
              id: 154551549,
              name: 'zjUucUserPermissions',
              type: 'http',
              method: 'get',
              path: '/third-api/zjUuc/userPermissions',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551550',
            type: 'apiDetail',
            name: '实名认证 获取临时授权码，',
            children: [],
            api: {
              id: 154551550,
              name: '实名认证 获取临时授权码，',
              type: 'http',
              method: 'get',
              path: '/third-api/rna/temporaryCode',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551551',
            type: 'apiDetail',
            name: 'getVerifyResult',
            children: [],
            api: {
              id: 154551551,
              name: 'getVerifyResult',
              type: 'http',
              method: 'get',
              path: '/third-api/rna/getVerifyResult',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551552',
            type: 'apiDetail',
            name: '资产管理平台，获取项目信息',
            children: [],
            api: {
              id: 154551552,
              name: '资产管理平台，获取项目信息',
              type: 'http',
              method: 'get',
              path: '/third-api/amp/getXmInfo',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551553',
            type: 'apiDetail',
            name: 'getGcInfo',
            children: [],
            api: {
              id: 154551553,
              name: 'getGcInfo',
              type: 'http',
              method: 'get',
              path: '/third-api/amp/getGcInfo',
              folderId: 30348780,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348780,
          name: 'ThirdApiController',
          docId: 0,
          parentId: 30348616,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32492101',
        type: 'apiDetailFolder',
        name: '业务报表SQL配置信息备份表(BizSqlConfigBackup)表控制层',
        children: [
          {
            key: 'apiDetail.165680930',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 165680930,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/bizSqlConfigBackup/page',
              folderId: 32492101,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165680931',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 165680931,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/bizSqlConfigBackup/list',
              folderId: 32492101,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165680932',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 165680932,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizSqlConfigBackup/detail',
              folderId: 32492101,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165680933',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 165680933,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizSqlConfigBackup/save',
              folderId: 32492101,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165680934',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 165680934,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/bizSqlConfigBackup/update',
              folderId: 32492101,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165680935',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 165680935,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/bizSqlConfigBackup/delete',
              folderId: 32492101,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32492101,
          name: '业务报表SQL配置信息备份表(BizSqlConfigBackup)表控制层',
          docId: 0,
          parentId: 30348616,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32492182',
        type: 'apiDetailFolder',
        name: 'sql配置表 控制器',
        children: [
          {
            key: 'apiDetail.165681646',
            type: 'apiDetail',
            name: 'sql配置表 根据SQL文本获取参数列表',
            children: [],
            api: {
              id: 165681646,
              name: 'sql配置表 根据SQL文本获取参数列表',
              type: 'http',
              method: 'post',
              path: '/sqlConfig/getSqlParams',
              folderId: 32492182,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165681647',
            type: 'apiDetail',
            name: 'sql配置表 根据SQL文本获取返回结果字段列表',
            children: [],
            api: {
              id: 165681647,
              name: 'sql配置表 根据SQL文本获取返回结果字段列表',
              type: 'http',
              method: 'post',
              path: '/sqlConfig/getSqlReuslts',
              folderId: 32492182,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165681648',
            type: 'apiDetail',
            name: 'sql配置表 详情',
            children: [],
            api: {
              id: 165681648,
              name: 'sql配置表 详情',
              type: 'http',
              method: 'get',
              path: '/sqlConfig/detail',
              folderId: 32492182,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165681649',
            type: 'apiDetail',
            name: 'sql配置表 自定义分页',
            children: [],
            api: {
              id: 165681649,
              name: 'sql配置表 自定义分页',
              type: 'http',
              method: 'get',
              path: '/sqlConfig/page',
              folderId: 32492182,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165681650',
            type: 'apiDetail',
            name: 'sql配置表 新增或修改',
            children: [],
            api: {
              id: 165681650,
              name: 'sql配置表 新增或修改',
              type: 'http',
              method: 'post',
              path: '/sqlConfig/submit',
              folderId: 32492182,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165681651',
            type: 'apiDetail',
            name: 'sql配置表 删除',
            children: [],
            api: {
              id: 165681651,
              name: 'sql配置表 删除',
              type: 'http',
              method: 'post',
              path: '/sqlConfig/remove',
              folderId: 32492182,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.165681652',
            type: 'apiDetail',
            name: '指定回退版本',
            children: [],
            api: {
              id: 165681652,
              name: '指定回退版本',
              type: 'http',
              method: 'post',
              path: '/sqlConfig/revert/{id}',
              folderId: 32492182,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32492182,
          name: 'sql配置表 控制器',
          docId: 0,
          parentId: 30348616,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32559091',
        type: 'apiDetailFolder',
        name: 'BusiReportExecuteController',
        children: [
          {
            key: 'apiDetail.166036636',
            type: 'apiDetail',
            name: 'getInterfaceData',
            children: [],
            api: {
              id: 166036636,
              name: 'getInterfaceData',
              type: 'http',
              method: 'post',
              path: '/busiReportExecute/{configCode}',
              folderId: 32559091,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32559091,
          name: 'BusiReportExecuteController',
          docId: 0,
          parentId: 30348616,
          projectBranchId: 0,
          type: 'http'
        }
      },
      {
        key: 'apiDetailFolder.32901729',
        type: 'apiDetailFolder',
        name: 'PDF模版表(BizPdfTemplate)表控制层',
        children: [
          {
            key: 'apiDetail.167830367',
            type: 'apiDetail',
            name: '分页查询',
            children: [],
            api: {
              id: 167830367,
              name: '分页查询',
              type: 'http',
              method: 'get',
              path: '/bizPdfTemplate/page',
              folderId: 32901729,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167830368',
            type: 'apiDetail',
            name: '列表查询',
            children: [],
            api: {
              id: 167830368,
              name: '列表查询',
              type: 'http',
              method: 'get',
              path: '/bizPdfTemplate/list',
              folderId: 32901729,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167830369',
            type: 'apiDetail',
            name: '通过主键查询单条数据',
            children: [],
            api: {
              id: 167830369,
              name: '通过主键查询单条数据',
              type: 'http',
              method: 'get',
              path: '/bizPdfTemplate/detail',
              folderId: 32901729,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167830370',
            type: 'apiDetail',
            name: '新增数据',
            children: [],
            api: {
              id: 167830370,
              name: '新增数据',
              type: 'http',
              method: 'post',
              path: '/bizPdfTemplate/save',
              folderId: 32901729,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167830371',
            type: 'apiDetail',
            name: '修改数据',
            children: [],
            api: {
              id: 167830371,
              name: '修改数据',
              type: 'http',
              method: 'post',
              path: '/bizPdfTemplate/update',
              folderId: 32901729,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.167830372',
            type: 'apiDetail',
            name: '删除数据',
            children: [],
            api: {
              id: 167830372,
              name: '删除数据',
              type: 'http',
              method: 'post',
              path: '/bizPdfTemplate/delete',
              folderId: 32901729,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 32901729,
          name: 'PDF模版表(BizPdfTemplate)表控制层',
          docId: 0,
          parentId: 30348616,
          projectBranchId: 0,
          type: 'http'
        }
      }
    ],
    folder: {
      id: 30348616,
      name: 'system',
      docId: 0,
      parentId: 30347963,
      projectBranchId: 0,
      type: 'http'
    }
  },
  {
    key: 'apiDetailFolder.30348754',
    type: 'apiDetailFolder',
    name: 'auth',
    children: [
      {
        key: 'apiDetailFolder.30348803',
        type: 'apiDetailFolder',
        name: 'token 控制',
        children: [
          {
            key: 'apiDetail.154551695',
            type: 'apiDetail',
            name: 'login',
            children: [],
            api: {
              id: 154551695,
              name: 'login',
              type: 'http',
              method: 'post',
              path: '/auth/login',
              folderId: 30348803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551696',
            type: 'apiDetail',
            name: 'logout',
            children: [],
            api: {
              id: 154551696,
              name: 'logout',
              type: 'http',
              method: 'delete',
              path: '/logout',
              folderId: 30348803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551697',
            type: 'apiDetail',
            name: 'refresh',
            children: [],
            api: {
              id: 154551697,
              name: 'refresh',
              type: 'http',
              method: 'post',
              path: '/refresh',
              folderId: 30348803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          },
          {
            key: 'apiDetail.154551698',
            type: 'apiDetail',
            name: 'register',
            children: [],
            api: {
              id: 154551698,
              name: 'register',
              type: 'http',
              method: 'post',
              path: '/register',
              folderId: 30348803,
              tags: [],
              status: 'released',
              responsibleId: 0,
              customApiFields: {}
            }
          }
        ],
        folder: {
          id: 30348803,
          name: 'token 控制',
          docId: 0,
          parentId: 30348754,
          projectBranchId: 0,
          type: 'http'
        }
      }
    ],
    folder: {
      id: 30348754,
      name: 'auth',
      docId: 0,
      parentId: 30347963,
      projectBranchId: 0,
      type: 'http'
    }
  }
]

function urlChange(data, item) {
    console.log('data:', data)
    let info = data[data.length-1]
    item.url = info.path
    item.method = info.method
    item.id = info.id
    item.folderId = info.folderId
}
const dynamicValidateForm = ref({
  domains: [
    {
      list: [
        {
          label: '功能名称',
          value: '新增'
        },
        {
          label: '接口名称',
          value: 'addData'
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '编辑'
        },
        {
          label: '接口名称',
          value: 'editData'
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '查询'
        },
        {
          label: '接口名称',
          value: 'getData'
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '删除'
        },
        {
          label: '接口名称',
          value: 'deleteData'
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    },
    {
      list: [
        {
          label: '功能名称',
          value: '更新'
        },
        {
          label: '接口名称',
          value: 'updateData'
        },
        {
          label: '接口url',
          value: ''
        }
      ]
    }
  ]
})
function addDomain() {
  dynamicValidateForm.value.domains.push({
    list: [
      {
        label: '功能名称',
        value: ''
      },
      {
        label: '接口名称',
        value: ''
      },
      {
        label: '接口url',
        value: ''
      }
    ]
  })
}
</script>
<style lang="scss">
.popper-cascader {
  .el-cascader-node__label {
    max-width: 200px;
    line-height: 14px;
  }
}
</style>
