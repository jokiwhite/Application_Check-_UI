import request from '@/utils/request'


export function  updateStatusAll(id) {
  return request({
    url:`/system/feedbackprojectinformation/statusAll/${id}`,
    method: 'post',
    
})
}
export function  updateStatus(id) {
  return request({
    url:`/system/feedbackprojectinformation/status/${id}`,
    method: 'post',
    
})
}

// 查询
export function listFeedbackprojectinformation(query) {
  return request({
    url: '/system/feedbackprojectinformation/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getFeedbackprojectinformation(id) {
  return request({
    url: '/system/feedbackprojectinformation/' + id,
    method: 'get'
  })
}

// 新增
export function addFeedbackprojectinformation(data) {
  return request({
    url: '/system/feedbackprojectinformation',
    method: 'post',
    data: data
  })
}

// 修改
export function updateFeedbackprojectinformation(data) {
  return request({
    url: '/system/feedbackprojectinformation',
    method: 'put',
    data: data
  })
}

// 删除
export function delFeedbackprojectinformation(id) {
  return request({
    url: '/system/feedbackprojectinformation/' + id,
    method: 'delete'
  })
}

// 导出
export function exportFeedbackprojectinformation(query) {
  return request({
    url: '/system/feedbackprojectinformation/export',
    method: 'get',
    params: query
  })
}