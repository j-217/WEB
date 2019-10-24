<template>
  <div id="app">
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>  
import getData from './api/getData'

import Player from './components/Player'

  export default {
    name: 'App',
    components: {
      Player,
    },

    created(){
      // 确认登录状态
      let cookies = document.cookie.split(';')
      if(cookies.includes(" __remember_me=true")){
        console.log("logged in") 
      }else{
        sessionStorage.removeItem('store')
        console.log('logged out')
      }
      
      //在页面加载时读取sessionStorage里的状态信息
      if(sessionStorage.getItem("store")){
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
    },
  }


</script>

<style lang="less">
  @import "./assets/css/base.less";
</style>