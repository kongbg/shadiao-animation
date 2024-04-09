import request from '@/utils/request'
/**
 * 新增视频分类
 * @param {*} data
 * @returns
 */
export const addVideoType = data => {
    return request({
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
    return request({
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
    return request({
        url: '/deleteVideoType',
        method: 'post',
        data
    })
}