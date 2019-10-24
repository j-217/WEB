<template>
  <div class="home">
    <nav-header></nav-header>
    <div class="my-home-wrap">
      <!--   轮播图   -->
      <div class="my-banner-box">
        <van-swipe :autoplay="3000"
                   indicator-color="white"
        >
          <div v-for="(item, index) in bannerList" :key="index">
            <van-swipe-item>
              <a :href="item.url?item.url:'javasript:void(0);'">
                <img class="banner-img" :src="item.imageUrl" alt="">
                <div class="banner-tag" :style="{'backgroundColor': item.titleColor}">{{ item.typeTitle }}</div>
              </a>
            </van-swipe-item>
          </div>
        </van-swipe>
      </div>
      <!--   Tab bar   -->
      <ul class="my-tabbar">
        <li class="my-tabbar-item">
          <div class="item-box">
            <van-icon name="bar-chart-o" />
          </div>
          <span>排行榜</span>
        </li>
        <li class="my-tabbar-item">
          <div class="item-box">
            <van-icon name="orders-o" />
          </div>
          <span>歌单</span>
        </li>
        <li class="my-tabbar-item">
          <div class="item-box">
            <van-icon name="service-o" />
          </div>
          <span>电台</span>
        </li>
        <li class="my-tabbar-item">
          <div class="item-box">
            <van-icon name="tv-o" />
          </div>
          <span>直播</span>
        </li>
      </ul>
      <!--  推荐歌单    -->
      <content-box :item-list="recommendSongsList">
      </content-box>
      <!-- 最新专辑 -->
      <content-box :item-list="newAlbumsList"></content-box>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader.vue'
import NavFooter from '../components/NavFooter'
import ContentBox from '../components/ContentBox'
import getData from '../api/getData'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    NavHeader,
    NavFooter,
    ContentBox,
  },
  data(){
    return{
      bannerList: [],
    }
  },

  computed: {
    ...mapState({
      
    }),
    ...mapGetters({
      recommendSongsList: 'getRecommendSongsList_6',
      newAlbumsList: 'getNewAlbums_3'
    })
  },

  mounted(){
    this.initPlaylist()
    this.queryBannerList()
    this.$store.dispatch('getRecommendSongsList')
    this.$store.dispatch('getNewAlbums')
  },

  methods: {
    // 歌单为空初始化navFooter歌单，默认当前音乐为私人FM第一首
    initPlaylist(){
      if(this.$store.state.player.playlist.length !== 0){
        return
      }
      getData('queryPersonalFM')
      .then((result)=>{
        if(result.code === 200){
          this.$store.commit('setPlaylist', result.data)
          this.$store.commit('setCurMusic', result.data[0].id)
          // 异步请求
          // if(this.$store.state.player.curMusic !== ''){
          //   this.$store.dispatch('getCurMusicTotalInfos', this.$store.state.player.curMusic)
          // }

          // 同步请求getCurMusicTotalInfos
          let id = this.$store.state.player.curMusic
          getData('queryMusicUrl', {id})
          .then((result)=>{
            if(result.code === 200){
              this.$store.commit('setMusicUrl', result.data[0].url)
              console.log('init music url done')
            }
          })
          getData('queryMusicDetail', {ids: id})
          .then((result)=>{
            if(result.code === 200){
              let params = {
                  songs: [
                    {
                      name: result.songs[0].name,
                      ar: result.songs[0].ar,
                      al: result.songs[0].al
                    }
                  ]
                }
              this.$store.commit('setMusicDetails', params)
              console.log('init music details done')
            }
          })
          getData('queryLyric', {id})
          .then((result)=>{
            if(result.code === 200){
              this.$store.commit('setLyric', result.lrc.lyric)
            }
          })
        }
      })
    },

    queryBannerList(){
      getData('queryBanner')
        .then((result)=> {
            this.bannerList = result.banners
        })
    },

  },

}
</script>

<style lang="less">
.my-home-wrap{
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  .my-banner-box{
    // 防止轮播图播放导致下方页面闪烁
    transform:translateZ(0);
    padding: 1rem 0;
    border-radius: 12%;
    overflow: hidden;
    .banner-img{
      width: 100%;
      vertical-align: top;
    }
    .banner-tag{
      transform:translateZ(100);
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 15% 0 0 0;
      text-align: center;
      line-height: 1.5rem;
      color: #FFFFFF;
      font-size: small;
      padding: 0 0.5rem;
      height: 1.5rem;
      opacity: 0.9;
    }
  }
  .my-tabbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.8rem;
    border-bottom: 0.02rem solid #eee;
    .my-tabbar-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      .item-box{
        // 防止轮播图播放时内容元素闪动
        // transform:translateZ(0);
        width: 2.7rem;
        height: 2.7rem;
        background-color: #2b542c;
        border-radius: 50%;
        text-align: center;
        line-height: 3rem;
        color: #FFFFFF;
        font-size: large;
        background-image: radial-gradient(circle at -15% 50%, rgba(180, 180, 180, 0.9) 20%, #2b542c);
      }
      >span{
        padding-top: 0.5rem;
      }
    }
  }
}
</style>

