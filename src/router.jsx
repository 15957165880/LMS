import { createHashRouter, Navigate, } from 'react-router-dom'
import Login from './pages/Login'
import List from './pages/List'
import Test from './pages/Test'

// 是否在登陆状态
const isLogin = sessionStorage.getItem('isLogin')
// 登陆角色
const role = sessionStorage.getItem('role')

const router = createHashRouter([
  { path: '/', exact: true, element: <Login /> },
  { path: '/AdminBookList', element: <List role="Admin" /> },
  { path: '/UserBookList', element: <List role="User" /> },
  { path: '/Test', element: <Test /> },
  { path: '*', element: <Navigate to={isLogin=='true' ? (role == 'Admin' ? '/AdminBookList' : '/UserBookList') : '/'} /> }

])

export default router