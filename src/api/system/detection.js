import request from '@/utils/request'
export default{
    //1根据ID获取数据
    findById(id1){
        return request({
            url:`/system/project-result/findById/${id1}`,
            method: 'get',
        })
    },
    //2根据ID获取数据
    findByIdSurvey(id1){
        return request({
            url:`/system/project-result/findByIdSurvey/${id1}`,
            method: 'get',
        })
    }
}