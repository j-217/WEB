<template>
  <div class="album-detail-box" :style="`background-image: url(${albumDetail.album.picUrl})`">
    <!-- header -->
    <common-header :title='title'></common-header>
    <!-- body -->
    <div class="body-box">
      <div class="info-box">
        <div class="pic-box">
          <img :src="albumDetail.album.picUrl" alt="" class="pic">
        </div>
        <div class="info">
          <div class="flex-top">
            <div class="album-name">
              <span>{{ albumDetail.album.name }}</span>
            </div>
            <div class="album-art">
              <span>歌手：{{ albumDetail.album.artists[0].name }}</span>
            </div>
          </div>
          <div class="description">{{ albumDetail.album.description }}</div>
        </div>
      </div>
      <div class="tab-bar-box">
        <div class="tab-bar-item">
          <van-icon name="chat-o" />
          <span>{{ albumDetail.album.info.commentCount || 0 }}</span>
        </div>
        <div class="tab-bar-item">
          <van-icon name="cluster-o" />
          <span>{{ albumDetail.album.info.shareCount || 0 }}</span>
        </div>
        <div class="tab-bar-item">
          <van-icon name="down" />
          <span>下载</span>
        </div>
        <div class="tab-bar-item">
          <van-icon name="certificate" />
          <span>多选</span>
        </div>
      </div>
      <div class="songslist-box">
        <div class="title-box">
          <div class="play-all" @click="playAll(albumDetail.songs)">
            <van-icon name="play-circle-o" />
            <div class="song-counts">
              <span>播放全部</span>
              <span>(共{{ albumDetail.album.size || 0 }}首)</span>
            </div>
          </div>
          <div class="subsribed-counts">
            <span>收藏({{ albumDetail.album.info.commentThread.hotCount || 0 }})</span>
          </div>
        </div>
        <div class="list-box">
          <ul class="songslist-items">
            <li class="item" v-for="(item, index) in albumDetail.songs" :key="index" @click="goSwichSongs(item.id)">
              <div class="song-info" :class="{'active': item.id === curMusic}">
                <span class="play-icon"><van-icon name="volume-o" /></span>
                <span class="song-name">{{ item.name }}</span>
                <span>-</span>
                <span class="singer">{{ item.ar[0].name }}</span>
              </div>
              <span><van-icon name="ellipsis" /></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- footer -->
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import CommonHeader from '../components/CommonHeader'
import NavFooter from '../components/NavFooter'
import { mapState } from 'vuex'

export default {
  data(){
    return {
      title: '专辑',
    }
  },

  components: {
    CommonHeader,
    NavFooter,
  },

  computed: {
    ...mapState({
      albumDetail: state => state.music.albumDetail,
      curMusic: state => state.player.curMusic,
    })
  },

  methods: {
    goSwichSongs(musicId){
      this.$store.dispatch('switchSongs', musicId)
    },
    // 将专辑内歌曲替换至当前播放列表并播放第一首
    playAll(newList){
      this.$store.commit('setPlaylist', newList)
      this.$store.dispatch('switchSongs', newList[0].id)
    }
  }
}
</script>
<style scoped lang="less">
@import '../assets/css/base.less';

.album-detail-box{
  background-color: #eee;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -2;
  &::after{
    content: '';
    height: 200%;
    width: 150%;
    position: absolute;
    top: -20%;
    left: -30%;
    background: inherit;
    background-size: cover;
    filter: blur(1rem);
    z-index: -1;
  }
  .body-box{
    width: 100%;
    height: 100%;
    padding-top: 3rem;
    .info-box{
      padding: 2rem 1.5rem 1rem;
      display: flex;
      justify-content: flex-start;
      .pic-box{
        border-radius: 8%;
        margin-right: 1rem;
        width: 8rem;
        height: 8rem;
        overflow: hidden;
        .pic{
          width: 100%;
        }
      }
      .info{
        max-width: 50%;
        // padding-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .flex-top{
          .album-name{
            font-size: large;
            margin-bottom: 0.5rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            // text-overflow: ellipsis;
            overflow: hidden;
          }
          .album-art{
            font-size: small;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        .description{
          font-size: small;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
    .tab-bar-box{
      padding:1rem 2rem;
      width: 100%;
      display: flex;
      color:#fff;
      font-size: 2rem;
      justify-content: space-between;
      align-items: center;
      .tab-bar-item{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        >span{
          padding-top: 0.3rem;
          font-size: 1rem;
        }
      }
    }
    .songslist-box{
      position: relative;
      background-color: #fff;
      width: 100%;
      height: 80%;
      overflow: hidden;
      border-radius: 2rem 2rem 0 0;
      .title-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        color: @darkFontColor;
        .play-all{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 2rem;
          .song-counts{
            padding-left: 0.5rem;
            font-size: 1rem;
            >span:nth-of-type(2){
              font-size: small;
              color: @lightFontColor;
            }
          }
        }
        .subsribed-counts{
          position: relative;
          padding: 0.5rem 1rem 0.5rem 1.5rem;
          border-radius: 1.5rem;
          background: @activeFontColor;
          color: #fff;
          &::before{
            content: '+';
            position: absolute;
            font-size: 1.5rem;
            top: 0%;
            left: 0.5rem;
          }
        }
      }
      .list-box{
        position: absolute;
        bottom: 0;
        height: calc(100% - 4.375rem);
        width: 100%;
        padding: 0rem 1rem;
        padding-bottom: 10rem;
        overflow-y: scroll;
        .songslist-items{
          .item{
            display: flex;
            justify-content: space-between;
            padding-top: 0.5rem;
            align-items: center;
            >span{
              color: @lightFontColor;
              font-size: x-large;
            }
            .song-info{
              display: flex;
              width: 90%;
              align-items: flex-end;
              >span:nth-of-type(3){
                padding: 0 0.3rem;
              }
              .play-icon{
                display: none;
              }
              .song-name{
                display: inline-block;
                max-width: 50%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .singer{
                display: inline-block;
                font-size: small;
                max-width: 30%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              &.active{
                color: @activeFontColor;
                .play-icon{
                  display: inline-block;
                  padding-right: 0.5rem;
                }
              }
            }
					}
        }
      }
    }
  }
}
</style>