import request from '@/util/request'

export function userRegisterByPwd(data) {
    return request({
      url: '/register',
      method: 'post',
      data
    })
  }
  
  
export function getCode(data) {
	console.log(data)
    return request({
      url: '/sms/'+data.phone,
      method: 'post'
    })
  }