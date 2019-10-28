import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import getData from "../api/getData"

// fix bug(vue-router.esm.js?8c4f:2051 Uncaught (in promise))
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return routerPush.call(this, location).catch( error => error)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/musicDetail',
    name: 'musicDetail',
    component: () => import('../views/MusicDetail.vue')
  },
  {
    path: '/albumDetail',
    name: 'albumDetail',
    component: () => import('../views/AlbumDetail.vue')
  },
  {
    path: '/songsListDetail',
    name: 'songsListDetail',
    component: () => import('../views/SongsListDetail.vue')
  },
  {
    path: '/search',
    component: () => import('../views/Search/Search.vue'),
    children: [
      {path: '/', component: () => import('../views/Search/Hot.vue')},
      {path: 'result', component: () => import('../views/Search/SearchResult.vue')}
    ]
  }
]

const router = new VueRouter({
  routes
})

// 用户登录验证（废除）
// router.beforeEach((to, from, next)=>{
//   console.log(this)
//   getData('queryLoginStatus')
//       .then((result)=>{
//         if(result.code === 200){
//           next()
//         }else{
//           if(to.fullPath === '/login'){
//             next()
//           }else{
//             next('/login')
//           }
//         }
//       })
//       .catch((reason => {
//         if(to.fullPath === '/login'){
//           next()
//         }else{
//           next('/login')
//         }
//       }))
// })

export default router
