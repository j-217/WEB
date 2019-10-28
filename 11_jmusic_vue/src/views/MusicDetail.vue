<template>
  <div class="music-detail-page" :style="`background-image: url(${musicPicUrl})`">
    <!-- header -->
    <common-header :title='musicName' :info="musicArtist"></common-header>
    <!-- body -->
    <div class="body" @click="switchLyricFlag(showLyricFlag)">
      <div class="record-player" v-if="!showLyricFlag">
        <img src="@/assets/images/play-controler.png" alt="" class="niddle" :class="{'active': playStatusFlag}">
        <div class="cd-wrap" :class="{'active': playStatusFlag}">
          <div class="img-wrap">
            <img :src="musicPicUrl" alt="" class="cd-img">
          </div>
        </div>
      </div>
      <div class="lyric" v-if="showLyricFlag">
        <div class="wrap">
          <ul class="lyric-box" ref="lyricBoxElement">
            <li class="lyric-line-box" 
                v-for="(item, index) in lyricList" :key="index"
                :class="{'active': index === curLyricLine}"
            >
              <span class="line ">{{ item.line }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
      
    <!-- footer -->
    <div class="footer">
      <div class="progress-box">
        <div class="cur-time">{{ musicCurTime | formatTime }}</div>
        <div class="progress-bar" @click="jumpToPosition">
          <van-progress
            pivot-text=""
            color="#ee0a24"
            :percentage="(parseInt(musicCurTime)/parseInt(musicDuration)*100)"
          />
        </div>
        <div class="total-time">{{ musicDuration | formatTime }}</div>
      </div>
      <div class="footer-flex">
        <div class="play-mode" @click="goSwitchPlayMode()">
          <van-icon name="replay" v-if="playMode === 'order'"/>
          <van-icon name="like-o" v-if="playMode === 'single'"/>
          <van-icon name="exchange" v-if="playMode === 'random'"/>
        </div>
        <div class="play-control">
          <van-icon name="arrow-left" @click="goSwitchSongs('pre', curMusic)"/>
          <van-icon :name="playStatusFlag?'pause':'play'" @click="playOrPause(playStatusFlag)"/>
          <van-icon name="arrow" @click="goSwitchSongs('next', curMusic)"/>
        </div>
        <div class="playlist" @click="showList = true">
          <van-icon name="wap-nav" />
        </div>
      </div>     
    </div>
    <!-- 上拉列表 -->
    <transition name="slide-up">	
			<div class="my-songs-list-fixed" v-if="showList">
				<div class="my-songs-list-wrap">
					<div class="songs-list-header">
						<span>歌曲数量({{ playlist.length }})</span>
						<span><van-icon name="delete" /></span>
					</div>
          <div class="overflow-wrap">
            <ul class="songs-list">
              <li class="songs-list-item" v-for="(item, index) in playlist" :key="index" @click="goSwitchSongs('noChange', item.id)">
                <div class="song-info" :class="{'active': item.id === curMusic}">
                  <span class="play-icon"><van-icon name="volume-o" /></span>
                  <span class="song-name">{{ item.name }}</span>
                  <span>-</span>
                  <span class="singer">{{ item.artists ? item.artists[0].name : item.ar[0].name }}</span>
                </div>
                <span><van-icon name="cross" /></span>
              </li>
            </ul>
          </div>
				</div>
			</div>
		</transition>
    <!-- 遮罩层 -->
    <van-overlay :show="showList" @click="showList = false" z-index="100"/>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { formatTime } from '../utils/utils'

import CommonHeader from '../components/CommonHeader'

export default {
  data(){
    return{
      showList: false,
    }
  },

  filters: {
    formatTime,
  },

  components: {
    CommonHeader,
  },

  computed: {
    ...mapState({
      playStatusFlag: state => state.player.playStatusFlag,
      curMusic: state => state.player.curMusic,
      musicName: state => state.music.musicDetails.songs[0].name,
      musicArtist: state => state.music.musicDetails.songs[0].ar[0].name,
      musicPicUrl: state => state.music.musicDetails.songs[0].al.picUrl,
      musicCurTime: state => state.music.musicCurTime,
      musicDuration: state => state.music.musicDuration,
      playMode: state => state.player.playMode,
      showLyricFlag: state => state.player.showLyricFlag,
      curLyricLine: state => state.player.curLyricLine,
    }),
    ...mapGetters({
      playlist: 'playlistFilteDuplicate',
      lyricList: 'getFormatLyric'
    })
  },

  methods: {
    switchLyricFlag(flag){
      let newFlag = !flag
      this.$store.commit('setShowLyricFlag', newFlag)
    },

    playOrPause(flag){
      let newFlag = !flag
      this.$store.commit('setPlayStatusFlag', newFlag)
    },

    jumpToPosition(e){
      let newX = e.offsetX,
       progressBar = document.getElementsByClassName("van-progress__portion")[0],
       player = document.getElementsByClassName("player")[0],
       progressBarTotalWidth = progressBar.parentElement.clientWidth,
       musicDuration = this.$store.state.music.musicDuration,
       newPositionRatio = parseFloat((newX / progressBarTotalWidth).toFixed(2))
      progressBar.style.setProperty("width", newX)
      player.currentTime = (newPositionRatio * musicDuration).toFixed(3)
    },

    goSwitchPlayMode(){
      let playModeList = ['order', 'random', 'single'],
        playModeIndex = playModeList.indexOf(this.$store.state.player.playMode),
        newPlayModeIndex = (playModeIndex + 1) % 3
      // logging the current index of playmode
      console.log(playModeIndex)
      this.$store.commit('setPlayMode', playModeList[newPlayModeIndex])
    },

    goSwitchSongs(switchMode, musicId){
      if(switchMode !== 'noChange'){
        this.$store.commit('setSwitchMode', switchMode)
      }
      this.$store.dispatch('switchSongs', musicId)
    }
  },

  watch: {
    musicCurTime(newVal, oldVal){
      let lyricList = this.$store.getters.getFormatLyric,
        musicDuration = this.$store.state.music.musicDuration,
        lyricBoxElement = this.$refs.lyricBoxElement
      // 开启歌词显示才计算
      if(this.$store.state.player.showLyricFlag){
        for(let i = 0;i < lyricList.length - 2; i++ ){
          if(newVal >= lyricList[i].time && newVal < lyricList[i+1].time){
            this.$store.commit('setCurLyricLine', i)
            let curLineElement = document.getElementsByClassName("lyric-line-box active")[0]
            if(curLineElement.offsetTop > 120){
              lyricBoxElement.style.top = `${10 - (curLineElement.offsetTop / 16)}rem`
            }
            return
          }
        }
      }
      // 播放完成重置歌词位置
      if(newVal === musicDuration ){
        lyricBoxElement.style.top = '10rem'
      } 
    }
  }
}
</script>
<style scoped lang="less">
@import '../assets/css/base.less';

.music-detail-page{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -2;
  &::after{
    content: '';
    height: 150%;
    width: 150%;
    position: absolute;
    top: -5%;
    left: -5%;
    background: inherit;
    background-size: cover;
    filter: blur(1rem);
    z-index: -1;
  }
  .body{
    z-index: 10;
    height: 100%;
    padding: 0 1rem;
    .record-player{
      z-index: 15;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 5rem;
      .niddle{
        height: 8rem;
        z-index: 15;
        transform-origin: 10% 10%;
        transform: translateX(30%) rotateZ(-30deg);
        transition: transform 1s ease-in-out;
        &.active{
          transform: translateX(30%) rotateZ(-3deg);
        }
      }
      .cd-wrap{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -4rem;
        width: 18rem;
        height: 18rem;
        border-radius: 50%;
        background-color: grey;
        background-image: url(../assets/images/cd-wrapper.png);
        background-size: 18rem;
        .img-wrap{
          width: 12rem;
          height: 12rem;
          overflow: hidden;
          border-radius: 50%;
          >img{
            width: 100%;
          }
        }
        &.active{
          animation: rotating 10s linear infinite forwards;
        }
      }
    }
    .lyric{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 5rem 1rem;
      overflow: hidden;
      .wrap{
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
        .lyric-box{
          transition: top 1s linear;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 10rem;
          text-align: center;
          font-size: large;
          color: #eee;
          .lyric-line-box{
            transform: translateZ(0);
            padding: 0.5rem 0;
            &.active{
              color: #c7210C;
            }
          }
        }
      }
     
    }
  }
  .footer{
    transform: translateZ(0);
    position: fixed;
    bottom: 0;
    height: 5rem;
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: xx-large;
    color: #fff;
    z-index: 15;
    .footer-flex{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .play-control{
        width: 80%;
        display: flex;
        justify-content: space-evenly;
      }
    }
    .progress-box{
      font-size: x-small;
      padding: 0.5rem 0 0.3rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .progress-bar{
        width: 80%;
        overflow: hidden;
      }
    }
  }
}

.my-songs-list-fixed{
  position:fixed;
  background-color: #fff;
  height: 50%;
  width: 100%;
  bottom: 0;
  z-index: 101;
  border-radius: 8% 8% 0 0;
  padding: 1.5rem 1rem 0 1rem;
  .my-songs-list-wrap{
    display: flex;
    flex-direction: column;
    height:100%;
    .songs-list-header{
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.5rem;
      border-bottom: 0.02rem solid #eee;
      >span:nth-child(2){
        font-size: large;
      }
    }
    .overflow-wrap{
      height:100%;
      overflow-y:scroll;
       .songs-list{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .songs-list-item{
          display: flex;
          justify-content: space-between;
          padding-top: 0.5rem;
          >span{
            color: @lightFontColor;
            font-size: large;
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

// 音乐列表滑出动画
.slide-up-enter,
.slide-up-leave-to{
  transform: translateY(100%);
}

.slide-up-enter-active,
.slide-up-leave-active{
  transition: transform 0.6s ease-in-out;
}

// 播放器动画
@keyframes rotating{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}

</style>