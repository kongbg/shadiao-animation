

/**
 * 获取查询条件
 * @param {Object} params - 查询参数对象
 * @returns {string} - 查询条件字符串
 */
export const getCondition = (params) => {
    let condition = '';

    // 复制查询参数对象
    const querys = { ...params }

    // 删除分页参数
    delete querys.page
    delete querys.pageSize
    
    // 遍历查询参数对象
    for (const key in querys) {
        // 拼接查询条件字符串
        condition += ` ${key} = ${querys[key]} AND`
    }

    // 获取最后一个AND的索引
    let lastIndex = condition.lastIndexOf('AND')
    if (lastIndex !== -1) {
        // 去除最后一个AND及其后面的空格
        condition = condition.substring(0, lastIndex).trim()
    }
    return condition || ''
}