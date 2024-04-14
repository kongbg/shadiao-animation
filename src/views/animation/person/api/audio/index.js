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
 * 新增音频
 * @param {*} data
 * @returns
 */
export const saveAudios = data => {
    return request2({
        url: '/saveAudios',
        method: 'post',
        headers: {
            'Content-Type':'multipart/form-data;',
        },
        data
    })
}
/**
 * 湖区音频
 * @param {*} data
 * @returns
 */
export const getAudios = params => {
    return request2({
        url: '/getAudios',
        method: 'get',
        params
    })
}

/**
 * 新增音频
 * @param {*} data
 * @returns
 */
export const upload = data => {
    return request2({
        url: '/upload',
        method: 'post',
        headers: {
            'Content-Type':'multipart/form-data;',
        },
        data
    })
}

/**
 * 获取音频地址，时间信息接口
 * @param {*} data
 * @returns
 */
export const getAudiosConf = params => {
    return request2({
        url: '/getAudiosConf',
        method: 'get',
        params
    })
}