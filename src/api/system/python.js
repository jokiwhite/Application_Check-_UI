import request from '@/utils/request'

export function   start(pythonName,pythonPassword){
    return request({
        url:`/system/python/start/${pythonName}/${pythonPassword}`,
        method: 'post'
      })
}