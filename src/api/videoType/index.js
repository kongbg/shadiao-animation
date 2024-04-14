import request from '@/utils/request'
async function request2 (options) {
    let res = await request(options);
    if (res.code == 200) {
        return [null, {data: res.data&&res.data.data||null, message: res.message}];
    } else {
        return [true, {data: null, message: res.message}];
    } 
}
/**
 * 新增视频分类
 * @param {*} data
 * @returns
 */
export const addVideoType = data => {
    return request2({
        url: '/addVideoType',
        method: 'post',
        data
    })
}
/**
 * 获取视频分类
 * @param {*} data
 * @returns
 */
export const getVideoType = params => {
    return request2({
        url: '/getVideoType',
        method: 'get',
        params
    })
}

/**
 * 删除视频分类
 * @param {*} data
 * @returns
 */
export const deleteVideoType = data => {
    return request2({
        url: '/deleteVideoType',
        method: 'post',
        data
    })
}