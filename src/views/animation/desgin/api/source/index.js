import request from '@/utils/request'

// 上传
export function upload(data) {
    return request({
        url: '/uploadV2',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data;',
        },
        data
    })
}

// 查询文件
export function getFiles(params) {
    return request({
        url: '/getFiles',
        method: 'get',
        params
    })
}