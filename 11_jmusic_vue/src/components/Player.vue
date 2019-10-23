<template>
  <div>
    <audio 
      :src="curMusicUrl" 
      ref="player"
      @durationchange="setMusicDuration"
      @timeupdate="setMusicCurTime"  
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
        playStatusFlag: state => state.player.playStatusFlag
      })
    },

    methods: {
      setMusicDuration(){
        this.$store.commit('setMusicDuration', this.$refs.player.duration)
      },
      setMusicCurTime(){
        this.$store.commit('setMusicCurTime', this.$refs.player.currentTime)
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
        if(oldVal != '' && newVal != ''){
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