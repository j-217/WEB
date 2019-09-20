import VueRouter from 'vue-router'

import homePage from './components/homePage.vue'
import memberPage from './components/memberPage.vue'
import cartPage from './components/cartPage.vue'
import searchPage from './components/searchPage.vue'

var routerObj = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: homePage},
        {path: '/member', component: memberPage},
        {path: '/cart', component: cartPage},
        {path: '/search', component: searchPage},
    ],
    linkActiveClass: 'mui-active',
})

export default routerObj