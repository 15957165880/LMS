import { Button, Table, Popconfirm,message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import nameSpace from './nameSpace';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './index.module.less'
import CreateUpdate from './CreateUpdate';


const List = ({ role }) => {

    const { list, success } = useSelector(state => state.list);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {
        if (localStorage.getItem('isLogin') == 'true') {
            navigate(localStorage.getItem('role') == 'Admin' ? '/AdminBookList' : '/UserBookList')
        } else {
            navigate('/')
        }
    }, [location.pathname])

    useEffect(() => {
        dispatch({
            type: `${nameSpace}/update`,
            payload: {
                action: 'getList'
            }
        })
    }, [])


    const onCreateUpdate=book=>{
        dispatch({
            type:`${nameSpace}/changeOpen`,
            payload:{
                open:true,
                book
            }
        })
    }

    const onLend = id => {
        dispatch({
            type:`${nameSpace}/update`,
            payload:{
                id,
                action:'lend'
            }
        })
        
    }

    const onReturn = id => {
        dispatch({
            type:`${nameSpace}/update`,
            payload:{
                id,
                action:'return'
            }
        })
    }

    const onDel = id => {
        dispatch({
            type:`${nameSpace}/update`,
            payload:{
                id,
                action:'delete'
            }
        })
    }


    const columns = [
        {
            title: '书籍',
            dataIndex: 'name',
            render: title => `《${title}》`
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '总量',
            dataIndex: 'inventory',
        },
        {
            title: '库存',
            render: book=> book.inventory-book.lended
        },
        {
            title: '已借出',
            dataIndex: 'lended',
        },
        {
            title: '操作',

            render: book => {
                const { id, lended, allowDel } = book
                return (
                    <>
                        {role=='Admin'?(<Button type='primary' onClick={onCreateUpdate.bind(null,book)}>修改信息</Button>):null}
                        &nbsp;
                        {role=='Admin'?(<Button type='primary' disabled={!allowDel || lended > 0} onClick={onDel.bind(null, id)}>删除</Button>):null}
                        
                        &nbsp;
                        {role=='User'?(<Button type='primary' onClick={onLend.bind(null, id)}>借阅</Button>):null}
                        &nbsp;
                        {role=='User'?(<Button type='primary' onClick={onReturn.bind(null, id)}>归还</Button>):null}
                        
                        

                    </>
                )
            }
        }
    ];

    /**
     * 退出
     */
    const logout = () => {
        const remember = localStorage.getItem('remember')
        if (remember !== 'true') localStorage.clear()
        else localStorage.setItem('isLogin', 'false')
        navigate('/')
    }


 


    const tableOptions = {
        rowKey: 'id',
        
        dataSource: list,
        columns,
        pagination:false,
        title: () => (
            <div className={styles.title_part}>
                {`图书${role == 'Admin' ? '管理' : '借阅'}列表`}
                {role=='Admin'?<CreateUpdate/>:null}
                
                <span>

                    {role == 'Admin' ? <Button onClick={onCreateUpdate.bind(null,null)} type='primary' style={{ marginRight: 10 }}>
                        新增书籍
                    </Button> : null}
                    <Popconfirm
                        title='确认退出？'
                        onConfirm={logout}
                        okText='确认'
                        cancelText='取消'
                    >
                        <Button type='primary'>
                            退出
                        </Button>
                    </Popconfirm>
                </span>

            </div>
        ),
        style: {
            width: 800
        }
    }

    return (
        <div>


            <Table {...tableOptions} />
        </div>


    )
}

export default List
