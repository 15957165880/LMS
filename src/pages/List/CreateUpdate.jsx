import { Form, Modal, Input, Button,message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import nameSpace from './nameSpace';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect ,useCallback} from 'react';
import styles from './index.module.less'


const ModalFrom = () => {
    const { list, success, open, book={} } = useSelector(state => state.list);
   
   
    
    const dispatch = useDispatch();

    const onFinish=values=>{
        if(values.inventory<values.lended) return message.error('图书数量不能小于已借出数量')
        dispatch({
            type:`${nameSpace}/update`,
            payload:{
                ...values,
                inventory:Number(values.inventory),
                id:book?.id,
                action: book?.id?'update':'create'
            }
        })
    }
    const onCancel=() => {
        dispatch({
            type: `${nameSpace}/changeOpen`,
            payload: {
                open: false,
                book:null
            }
        })
    }
    return <Modal
        open={open}
        footer={null}
        destroyOnClose
        title={!book?.id ? '新增书籍' : '修改书籍'}
        onCancel={onCancel}
    >
        <Form

            labelCol={{
                span: 5,
            }}
            initialValues={{
            
                name: book?.name,
                id: book?.id,
                inventory: book?.inventory,
                author: book?.author,
                lended: book?.lended||0,
            }}
            onFinish={onFinish}
           
            autoComplete="off"
        >
            <Form.Item
                label="书籍名"
                name="name"
                rules={[
                    {
                        required: true,
                        message: '请输入！',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="作者"
                name="author"
                rules={[
                    {
                        required: true,
                        message: '请输入！',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="书籍数量"
                name="inventory"
                rules={[
                
                    {
                        required: true,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: '请输入正确的数字!',
                      },
                    //   {min:book?.lended||0,message:'不能小于已借出数量'}
     
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="已借出"
                name="lended"
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 5,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                &nbsp;
                <Button onClick={onCancel}>
                    取消
                </Button>
            </Form.Item>
        </Form>

    </Modal>
}

export default ModalFrom