import { Card, Button, Checkbox, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import nameSpace from './nameSpace';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Login = () => {
    const {loading} = useSelector(state=>state.login);

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch({
            type:`${nameSpace}/login`,
            payload:values
        })
    };

    /**
     * 登录成功跳转对应页面
     */
    useEffect(()=>{
        if(localStorage.getItem('isLogin')=='true'){
            navigate(localStorage.getItem('role')=='Admin'?'/AdminBookList':'/UserBookList')
        }
    },[loading])



    const onFinishFailed = (errorInfo) => {
        
    };

    return (
        <Card
            title="登录"
            style={{
                width: 400,
            }}
            headStyle={{
                textAlign: "center"
            }}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 5,
                }}
                initialValues={{
                    remember:localStorage.getItem('remember'),
                    username:localStorage.getItem('username'),
                    password:localStorage.getItem('password'),

                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名！',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>记住账号密码</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button loading={loading} type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Card>

    )
}

export default Login
