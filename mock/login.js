export default [
    {
        url: '/api/login',
        method: 'get',
        response: ({ query }) => {
            const { username, password } = query
            switch (username) {
                case 'Alice': {
                    if(password==1){
                        return {
                            code:200,
                            success:true,
                            role:'Admin',
                            username:'Alice'
                        }
                    }else{
                        return {
                            code:200,
                            success:false,
                            message:'密码错误' 
                        }
                    }
                }
                case 'Bob': {
                    if(password==2){
                        return {
                            code:200,
                            success:true,
                            role:'User',
                            username:'Bob'
                        }
                    }else{
                        return {
                            code:200,
                            success:false,
                            message:'密码错误' 
                        }
                    }
                }
                default:
                    return {
                        code: 200,
                        message: '用户不存在',
                        success: false
                    }

            }
           
        },
    },
];
