<template>
   <div>
       <el-button type="primary" @click="submit">上传</el-button>
       <el-upload class="upload-demo"
           drag 
           multiple
           :auto-upload="false"
           :on-change="handleChange"
           list-type="picture-card"
           :http-request="uploadFiles">
           <el-icon class="el-icon--upload"><upload-filled /></el-icon>
           <div class="el-upload__text">
               Drop file here or <em>click to upload</em>
           </div>
           <template #tip>
               <div class="el-upload__tip">
                   jpg/png files with a size less than 500kb
               </div>
           </template>
       </el-upload>

       <el-table :data="tableData" border height="500px" style="width: 100%">
           <el-table-column prop="url" label="图片">
               <template #default="scope">
                   <el-image
                       style="width: 60px; height: 60px"
                       :src="`http://127.0.0.1:3006${scope.row.path}`"
                       :zoom-rate="1.2"
                       :max-scale="7"
                       :min-scale="0.2"
                       :preview-src-list="srcList"
                       :preview-teleported="true"
                       :initial-index="4"
                       fit="cover"
                   />
               </template>
           </el-table-column>

           <el-table-column prop="id" label="id" />
           <el-table-column prop="fileName" label="名称" width="180" />
           <el-table-column prop="type" label="类型" width="180" />
           <el-table-column prop="size" label="大小" />
           <el-table-column prop="path" label="链接" />
           <el-table-column prop="userName" label="上传者" />
           <el-table-column prop="status" label="状态" />
       </el-table>
   </div>
</template>
<script setup>
import { ref } from 'vue'
import { upload, getFiles } from '@/api/source/index.js'
const tableData = ref([])
const fileLists = ref([])
const srcList = ref([])

function uploadFiles (options) {
}
async function submit () {
   let fileData = new FormData();
   fileLists.value.forEach(item => {
       fileData.append('file', item.raw);
   })
   fileData.append('userId', '001');
   fileData.append('userName', 'admin');
   fileData.append('type', '1');
   let res = await upload(fileData);
}
function handleChange(file, list) {
   fileLists.value = list
}
async function getList () {
   let params = {
       page: 1,
       pageSize: 20,
       type: 1
   }
   let res = await getFiles(params);
   console.log(res)
   let { code, data, msg} = res;
   if (code == 200) {
       tableData.value = data.data || [];
       tableData.value.forEach(item=>{
           srcList.value.push(`http://127.0.0.1:3006${item.path}`)
       })
   }
}
getList()

</script>
