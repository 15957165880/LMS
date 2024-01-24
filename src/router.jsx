import { createHashRouter, Navigate } from 'react-router-dom'

// 是否在登陆状态
const isLogin = sessionStorage.getItem('isLogin')
// 登陆角色
const role = sessionStorage.getItem('role')

const router = createHashRouter([
  { path: '/', element: 'Login' },
  { path: '/AdminBookList', element: 'AdminBookList' },
  { path: '/UserBookList', element: 'UserBookList' },
  { path: '*', element: <Navigate to={isLogin ? (role == 'Admin' ? '/AdminBookList' : '/UserBookList') : '/'} /> }

])

export default router