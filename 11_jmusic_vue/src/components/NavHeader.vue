<template>
  <div>
    <!--    头部导航栏    -->
    <div class="my-nav-bar-wrap">
      <div class="my-nav-bar">
        <div class="left-btn" @click="showMaskFlag = true">
          <van-icon
                  name="wap-nav"
                  size="2.3rem"
          ></van-icon>
        </div>
        <div class="context">
          <ul>
            <li :class="{'current-list': currentListFlag === 'myZone'}" @click="currentListFlag = 'myZone'">我的</li>
            <li :class="{'current-list': currentListFlag === 'discover'}" @click="currentListFlag = 'discover'">发现</li>
            <li :class="{'current-list': currentListFlag === 'recommend'}" @click="currentListFlag = 'recommend'">推荐</li>
          </ul>
        </div>
        <div class="right-btn" @click="goSearchPage">
          <van-icon
                  name="search"
                  size="1.6rem"
          ></van-icon>
        </div>
      </div>
    </div>

    <transition name="slide-right">
      <!--   左侧滑出边栏     -->
      <div class="left-slide-box-wrap" v-if="showMaskFlag">
        <div class="left-slide-box">
          <div class="has-login" v-if="nickName !== ''">
            <div class="user-info-box">
              <div class="user-profile-round">
                <img :src="userImgUrl" alt="">
              </div>
              <div class="user-name-box">
                <div class="user-name">{{ nickName }}</div>
                <div class="sign-in-box">
                  <van-icon name="points" size="1.2rem"/>
                  <span>签到</span>
                </div>
              </div>
            </div>
            <div class="user-footer">
              <div class="user-footer-item">
                <van-icon name="closed-eye" size="1.3rem"/>
                <span>夜间模式</span>
              </div>
              <div class="user-footer-item">
                <van-icon name="setting-o" size="1.3rem"/>
                <span>设置</span>
              </div>
              <div class="user-footer-item" @click="queryLogout">
                <van-icon name="share" size="1.3rem"/>
                <span>退出</span>
              </div>
            </div>
          </div>
          <div class="has-logout" v-if="nickName === ''">
            <div class="confirm-login-box">
              <div class="confirm-login-btn">
                <van-button plain hairline type="info" to="login">请登录</van-button>
                <van-button plain hairline type="primary">注册</van-button>
              </div>
            </div>
          </div>          
        </div>
      </div>
    </transition>
    <!--    遮盖层    -->
    <div class="mask" :class="{'mask-show': showMaskFlag}" @click="showMaskFlag = false"></div>
  </div>
</template>

<script>
import getData from '../api/getData'
import { mapState } from 'vuex'

  export default {
    name: "NavHeader",
    data(){
        return {
            showMaskFlag: false,
            currentListFlag: 'discover',
        }
    },

    computed: {
      ...mapState({
        nickName: state => state.user.nickName,
        userImgUrl: state => state.user.avatarUrl
      })
    },
    
    methods:{
      queryLogout(){
        getData('queryLogout')
          .then((result)=>{
            console.log("登出")
            // vuex 数据重置
            window.sessionStorage.removeItem('store')
            window.removeEventListener('beforeunload', ()=>{})
            window.location.reload()
            // this.$router.push({
            //   name: 'login'
            // })
          })
      },

      goSearchPage(){
        this.$router.push({
          path: '/search/'
          // name: 'search'
        })
      },
    }
  }
</script>

<style scoped lang="less">
@import '../assets/css/base.less';

  .my-nav-bar-wrap{
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #ffffff;
    z-index: 10;
    .my-nav-bar{
      height: 3rem;
      display: flex;
      justify-content: space-between;
      .left-btn{
        width: 5rem;
        color: #1f6377;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .right-btn{
        width: 5rem;
        color: #101010;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .context{
        width: 100%;
        height: 100%;
        ul{
          height: 100%;
          display: flex;
          justify-content: space-around;
          font-size: medium;
          color: @lightFontColor;
          align-items: center;
        }
        .current-list{
          color: @darkFontColor;
          font-size: large;
        }
      }
    }
  }
  .left-slide-box-wrap{
    position: fixed;
    width: 80%;
    height: 100%;
    z-index: 101;
    background-color: #fff;
    .left-slide-box{
      height: 100%;
      width: 100%;
      .has-login{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        .user-info-box{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .user-profile-round{
            margin-top: 2rem;
            margin-bottom: 1rem;
            height: 7rem;
            width: 7rem;
            border-radius: 50%;
            overflow: hidden;
            >img{
              width: 100%;
              height: 100%;
            }
          }
          .user-name-box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: large;
            .sign-in-box{
              background-color: @activeFontColor;
              padding: 0.3rem 1rem;
              border-radius: 1rem;
              font-size: small;
              color: #ffffff;
              display: flex;
              text-align: center;
              >span{
                margin-left: 0.2rem;
              }
            }
          }
        }
        .user-footer{
          display: flex;
          justify-content: space-between;
          color: #0f0f0f;
          .user-footer-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            >span{
              margin-left: 0.5rem;
            }
          }
        }
      }
      .has-logout{
        height: 100%;
        width: 100%;
        .confirm-login-box{
          position: relative;
          top: 30%;
          .confirm-login-btn{
            width: 100%;
            display: flex;
            flex-direction: column;        
          }
        }
      }
    }
  }
  
  /* 左侧边栏滑动动画 */
  .slide-right-enter,
  .slide-right-leave-to{
    transform: translateX(-100%);
  }

  .slide-right-enter-active,
  .slide-right-leave-active{
    transition: transform 0.6s ease-in-out;
  }

</style>