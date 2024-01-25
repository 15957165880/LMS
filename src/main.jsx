import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import { Layout, Flex } from 'antd';
import { Provider } from 'react-redux';
import styles from './main.module.less'
import { store } from './store';


const { Header, Footer, Content } = Layout;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Flex gap="middle" wrap="wrap">
      <Layout className={styles.layout}>
        <Header className={styles.header}>欢迎来到xx图书馆</Header>
        <Content className={styles.content}>
          <Provider store={store}>
            <RouterProvider router={router} />

          </Provider>
        </Content>
        <Footer className={styles.footer}>Author: Jack Song</Footer>
      </Layout>
    </Flex>
  </React.StrictMode>,
)
