<template>
  <div>
    <audio 
      :src="curMusicUrl" 
      ref="player"
      class="player"
      @durationchange="setMusicDuration"
      @timeupdate="setMusicCurTime"  
      @ended="goSwitchSongs(curMusic)"
      @pause="switchPause"
      @play="switchPlay"
    >
    </audio>
  </div>
</template>

<script>
import getData from '../api/getData'
import { mapState } from 'vuex'

  export default {
    name: "Player",
    data(){
      return {

      }
    },


    computed: {
      ...mapState({
        curMusicUrl: state => state.music.musicUrl,
        playStatusFlag: state => state.player.playStatusFlag,
        curMusic: state => state.player.curMusic,
        musicCurTime: state => state.music.musicCurTime,
      })
    },

    mounted(){
      this.switchPause()
    },

    methods: {
      setMusicDuration(){
        this.$store.commit('setMusicDuration', this.$refs.player.duration)
      },
      switchPause(){
        this.$store.commit('setPlayStatusFlag', false)
      },
      switchPlay(){
        this.$store.commit('setPlayStatusFlag', true)
      },

      setMusicCurTime(){
        this.$store.commit('setMusicCurTime', this.$refs.player.currentTime) 
      },
      goSwitchSongs(musicId){
        this.$store.commit('setPlayStatusFlag', false)
        this.$store.dispatch('switchSongs', musicId)
      }
    },

    watch: {
      playStatusFlag(state){
        if(state){
          this.$refs.player.play()
        }else{
          this.$refs.player.pause()
        }
      },
      

      curMusicUrl(newVal, oldVal){
        // 首次载入时不自动播放
        if(oldVal != ''){
          this.$nextTick(()=>{
            this.$store.commit('setPlayStatusFlag', true)
            this.$refs.player.play()
          }) 
        }
      }
    }
  }
</script>

<style scoped>

</style>