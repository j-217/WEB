<template>
  <div class="search-result-box">
    <div class="title">
      <span>共{{ searchResultList.songCount }}首</span>
    </div>
    <ul class="search-result-list">
      <li class="list-items" v-for="(item, index) in searchResultList.songs" :key="index" @click="goSwitchSongs(item.id)">
        <div class="item-left">
          <span class="name">{{ item.name }}</span>
          <span class="singer">{{ item.artists[0].name }} - {{ item.album.name }}</span>
        </div>
        <div class="item-right">
          <van-icon name="ellipsis" />
        </div>
      </li>
      <div class="loading" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <van-loading type="spinner" />
      </div>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data(){
    return{
      offset: 0,
      busy: false,
    }
  },

  computed: {
    ...mapState({
      searchResultList: state => state.music.searchResultList
    }) 
  },

  methods: {
    goSwitchSongs(musicId){
      console.log(musicId)
      this.$store.dispatch('switchSongs', musicId)
    },

    loadMore(){
      this.busy = true
      if(this.$store.state.music.researchFlag){
        this.offset = 0
      }
      if(this.offset < this.$store.state.music.searchResultList.songCount){
        setTimeout(()=>{
          this.offset += 30
          this.$store.dispatch('getSearchResultList', {
            keywords: this.$route.query.keywords,
            offset: this.offset
          })
          this.busy = false
        }, 1000)
      }
    }
  }
}
</script>
<style scoped lang="less">
.search-result-box{
  .title{
    padding: 0.5rem 0;
    font-size: 1.2rem;
  }
  .search-result-list{
    .list-items{
      padding: 0.5rem 0;
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      .item-left{
        max-width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name{
          white-space: nowrap;
          overflow: hidden;
        }
        .singer{
          white-space: nowrap;
          overflow: hidden;
          font-size: 0.9rem;
          color: #888;
        }
      }
      .item-right{
        color: #888;
      }
    }
    .loading{
      display: flex;
      justify-content: center;
    }
  }
}
</style>