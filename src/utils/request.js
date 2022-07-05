//1. 先引入axios依赖包
import axios from "axios";
import Vue from 'vue';
import { showFullScreenLoading, tryHideFullScreenLoading } from './loading'
const CANCEL_TOKEN = axios.CancelToken;
const MAX_CANCEL_TOKEN_NUM = 2000;
Vue.prototype.$httpRequestList = [];

//2. axios创建对象
const Server = axios.create({
    baseURL: process.env.VUE_APP_MODE,
    timeout: 3000, // request timeout
    headers: {
        'Content-Type': 'application/json;'
    },
})

//3. 定义前置拦截器，请求拦截器，请求发送出去之前触发的
Server.interceptors.request.use((config) => {

    // config.headers.token="123456"  //taken
    //config 接口请求的配置信息
    showFullScreenLoading()
    config.cancelToken = new CANCEL_TOKEN(function executor(c) {
        if (Vue.prototype.$httpRequestList.length == MAX_CANCEL_TOKEN_NUM) {
            Vue.prototype.$httpRequestList.pop();
        }
        Vue.prototype.$httpRequestList.unshift(c);
    })
    return config;
}, (error) => {
    //报错的是时候抛出一个报错的信息
    tryHideFullScreenLoading()
    return Promise.reject(error);
})

//4. 定义后置拦截器,响应拦截器, 服务器响应回来数据之前触发，
Server.interceptors.response.use((response) => {
    //响应回来的数据操作 拦截器
    tryHideFullScreenLoading()
    return response.data;
}, (error) => {


    tryHideFullScreenLoading()
        //报错的是时候抛出一个报错的信息
    return Promise.reject(error);
})

//5. 抛出对象的信息
export default Server;