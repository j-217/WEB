<template>
  <div class="login-box">
    <div class="login-box-item">
      <van-cell-group>
        <van-field
                required
                clearable
                label="用户手机号"
                placeholder="请输入手机号"
                v-model="phone"
        />

        <van-field
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                v-model="password"
        />
      </van-cell-group>
      <van-button plain type="primary" size="large" @click="queryPhoneLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import getData from '../api/getData'

    export default {
        name: "Login",
        data(){
          return{
            phone:'',
            password: ''
          }
        },

        created(){
          // 刷新页面，重置vuex数据
          if(this.$store.state.user.nickName !== ''){
            window.location.reload()
          }
        },

        methods:{
          queryPhoneLogin(){
            let params = {
              phone: this.phone,
              password: this.password
            }
            // 异步请求方式
            // this.$store.dispatch('getLogin', params)

            // 同步请求方式
            getData('queryPhoneLogin', params)
            .then((result)=>{
              if(result.code === 200){
                this.$store.commit('setUserId', result.account.id)
                this.$store.commit('setNickName', result.profile.nickname)
                this.$store.commit('setAvatarUrl', result.profile.avatarUrl)
                this.phone = ''
                this.password = ''
                this.$router.push({
                  name: 'home'
                })
              }
            })
          }
        }
    }
</script>

<style scoped lang="less">
.login-box{
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  .login-box-item{
    display: flex;
    flex-direction: column;
  }
}
</style>