import { useState } from 'react'
import { Card, Button, Input,message } from 'antd';
import axios from 'axios'
import CryptoJS from 'crypto-js'
fetch
const KEY = "QXPsXG9VRcdZNeRBRxXKRb7ALHcHctzk1O1kOXbiTvwfFtbJEeiYNgzEZ4sfnzuT"

const SECRET = "C4ZQc1m5mUVwwWoEwvWmW1J8s10ouxwsChlBsQfO7RVWN9xH9GQau6fHIV8iUqhM"


// Binance API 和密钥
const API_KEY = "QXPsXG9VRcdZNeRBRxXKRb7ALHcHctzk1O1kOXbiTvwfFtbJEeiYNgzEZ4sfnzuT";
const SECRET_KEY = "C4ZQc1m5mUVwwWoEwvWmW1J8s10ouxwsChlBsQfO7RVWN9xH9GQau6fHIV8iUqhM";
const BASE_URL = 'https://api.binance.com';


function buildQueryString(query) {
    return Object.keys(query)
        .map(key => `${key}=${encodeURIComponent(query[key])}`)
        .join('&');
}

// 签名请求
function signRequest(query) {
    const queryString = buildQueryString(query);
    return CryptoJS.HmacSHA256(queryString, SECRET_KEY).toString(CryptoJS.enc.Hex);
}

// 创建订单
async function placeOrder(symbol, quantity, price) {
    const timestamp = Date.now();
    const orderData = {
        symbol: symbol,
        side: 'BUY',
        type: 'LIMIT',
        timeInForce: 'GTC',
        quantity: quantity,
        price: price,
        timestamp: timestamp,
    };

    const signature = signRequest(orderData);
    const config = {
        headers: { 'X-MBX-APIKEY': API_KEY },
    };
    message.info('go')
    try {
        const response = await axios.post(`${BASE_URL}/api/v3/order`, null, {
            params: { ...orderData, signature },
            headers: config.headers,
        });
        console.log(response.data);
        message.success(response.data)
    } catch (error) {
        console.error('Error:', error.response.data);
        message.error(error.response.data)
    }
}


const Test = () => {
    const [price, setPrice] = useState('待获取')

    const fetchPrice = () => {
        // axios.get('/api/api/v3/ticker/price?symbol=BTCUSDT').then(data=>{
        //     setPrice(data.price)
        // }).catch(err=>{
        //     console.log(err)
        //     setPrice('失败！')
        // })
        // fetch('/api/api/v3/ticker/price?symbol=BTCUSDT')
        //     .then(response => response.json())
        //     .then(data => console.log('BTC Price:', data.price))
        //     .catch(error => console.error('Error:', error));
        //     // .then(response=>{
        //     //     console.log(response)
        //     // })

        axios.get('/api/api/v3/ticker/price?symbol=BTCUSDT')
            .then(response => {
                console.log('BTC Price:', response.data.price);
                setPrice(response.data.price)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    const buyBTC = () => {
        placeOrder('BTCUSDT', 0.001, 39000);
    }
    return (
        <Card

            headStyle={{
                textAlign: "center"
            }}
        >
            <Button onClick={fetchPrice}>获取BTC价格</Button>
            <Input value={price} disabled />


            <Button onClick={buyBTC}>购买10$BTC</Button>



        </Card>

    )
}

export default Test