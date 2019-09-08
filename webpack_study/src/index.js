import './js/main.js'
import './css/main.css' 

import Vue from '../node_modules/vue/dist/vue.js'
import VueRouter from 'vue-router'

// 手动安装vueRouter
Vue.use(VueRouter)

// 导入组件
import app from './components/app.vue'
import account from './components/account.vue'
import list from './components/list.vue'
import login from './components/login.vue'
import register from './components/register.vue'

var routerObj = new VueRouter({
    routes: [
        {
            path: '/account', component: account,
            children: [
                {path: 'login', component: login},
                {path: 'register', component: register}
            ],
        },
        {path: '/list', component: list},
    ]
})

var mv = new Vue({
    el: '#app',
    render: function(createElement){
        return createElement(app)
    },
    router: routerObj
})


