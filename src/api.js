import axios from './utils/axiosInstance'

/**
 * 登录接口
 */
function login(payload=null){
   return axios.get('/login',{params:payload})
}


 function update(payload){
    const {action,...params} = payload
    return axios.post(`/list/${action}`,{params})
 }


export default {
    login,
    update
}