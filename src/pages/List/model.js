import { createSlice } from '@reduxjs/toolkit';
import nameSpace from './nameSpace';
import { message } from 'antd'

export const model = createSlice({
  name: nameSpace,
  initialState: {
    list: [],
    success: true,
    open: false,
    book:{}
  },
  reducers: {

    updateList: (state, { payload }) => {
      const {data,success,action} = payload
      console.log(action)
      state.list = data || []
      state.success = success
      switch(action){
        case 'update':{
          message.success('修改成功')
          state.open=false
          state.book={}
          break
        }
        case 'create':{
          message.success('创建成功')
          state.open=false
          state.book={}
          break
        }
        case 'delete':{
          message.success('删除成功')
          break
        }
        case 'lend':{
          message.success('借阅成功')
          break
        }
        case 'return':{
          message.success('归还成功')
          break
        }
   
        default:
          break
      }
      
    },
    changeOpen: (state, { payload }) => {
      const { open, book } = payload
     
      state.open = open
      state.book = book
    }
  }

});



export const actions = model.actions
export default model.reducer;





