import axios from 'axios';

import api from './apiList'

// 修改axios默认配置，在跨域请求时携带cookies
axios.defaults.withCredentials = true

// 通过axios向api发送请求
export default async (queryName, queryData) => {
    let baseUrl = 'http://localhost:3000';
    let url = baseUrl.concat(api[queryName]);
    console.log(url)
    let result;
    if(queryData){
        result = await axios.get(url, {params: queryData});
    }else{
        result = await axios.get(url)
    }
    return new Promise((resolve, reject)=>{
        // 返回axios.response.data数据内容
        resolve(result.data);
    })
}