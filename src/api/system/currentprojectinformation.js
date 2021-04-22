import request from '@/utils/request'


export function  submitTimeline() {
  return request({
    url:`/system/currentprojectinformation/submitTimeline/`,
    method: 'post',
    
})
}

export function  collegePie() {
  return request({
    url:`/system/currentprojectinformation/collegePie/`,
    method: 'post',
    
})
}

export function  applyCodePie() {
  return request({
    url:`/system/currentprojectinformation/applyCodePie/`,
    method: 'post',
    
})
}

export function  fundingTypePie() {
  return request({
    url:`/system/currentprojectinformation/fundingTypePie/`,
    method: 'post',
    
})
}

export function  updateStatusAll(id) {
  return request({
    url:`/system/currentprojectinformation/statusAll/${id}`,
    method: 'post',
    
})
}
export function  updateStatus(id) {
  return request({
    url:`/system/currentprojectinformation/status/${id}`,
    method: 'post',
    
})
}

export function listCurrentprojectinformationAfter(query) {
  return request({
    url: '/system/currentprojectinformation/listAfter',
    method: 'get',
    params: query
  })
}

// 查询本年度项目书列表
export function listCurrentprojectinformation(query) {
  return request({
    url: '/system/currentprojectinformation/listCurrent',
    method: 'get',
    params: query
  })
}

export function listFeedBack(query) {
  return request({
    url: '/system/currentprojectinformation/listFeedBack',
    method: 'get',
    params: query
  })
}

// 查询本年度项目书详细
export function getCurrentprojectinformation(id) {
  return request({
    url: '/system/currentprojectinformation/' + id,
    method: 'get'
  })
}

// 新增本年度项目书
export function addCurrentprojectinformation(data) {
  return request({
    url: '/system/currentprojectinformation',
    method: 'post',
    data: data
  })
}

// 修改本年度项目书
export function updateCurrentprojectinformation(data) {
  return request({
    url: '/system/currentprojectinformation',
    method: 'put',
    data: data
  })
}

// 删除本年度项目书
export function delCurrentprojectinformation(id) {
  return request({
    url: '/system/currentprojectinformation/' + id,
    method: 'delete'
  })
}

// 导出本年度项目书
export function exportCurrentprojectinformation(query) {
  return request({
    url: '/system/currentprojectinformation/export',
    method: 'get',
    params: query
  })
}