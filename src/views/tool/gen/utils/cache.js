let caches = {}
let tasks = {}
export const setCache = (key, data) => {
  caches[key] = data
}
export const getCache = (key) => {
  return caches[key]
}

export const setTask = (key, data) => {
  if (!tasks[key]) {
    tasks[key] = [data]
  } else {
    tasks[key].push(data)
  }
}
export const getTask = (key) => {
  return tasks[key]
}
export const clearTask = (key) => {
  delete tasks[key]
}

// export const useCache = async (api, key) => {
//   let res = await api()
//   return res
// }
