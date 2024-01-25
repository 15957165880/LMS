import { createSlice } from '@reduxjs/toolkit';
import nameSpace from './nameSpace';
import {message} from 'antd'

export const model = createSlice({
  name: nameSpace,
  initialState: {
    loading: false,
    remember:false,
    password:''
  },
  reducers: {
    startLoading: (state,{payload={}}) => {
      state.loading = true
      state.password = payload.password
      state.remember = payload.remember
    },
    endLoading: (state,{payload={}}) => {
      const {success,role,username} = payload
     
      if(success){
        localStorage.setItem('username',username);
        localStorage.setItem('role',role);
        localStorage.setItem('isLogin','true');
        localStorage.setItem('remember',state.remember);
        localStorage.setItem('password',state.password);
        message.success(`欢迎${username}进入图书管理系统！`)
    
      }else{
        message.error(payload.message)

      }
      state.loading = false
    }

  }

});



export const actions = model.actions
export default model.reducer;



 

